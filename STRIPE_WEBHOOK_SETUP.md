# Stripe Webhook Setup for Admission Flow

## Overview
This document outlines the Stripe integration requirements for the LaunchPath admission checkout flow.

## Flow Summary
1. User completes Ground 0 with GO determination
2. User accesses `/admission-checkout` (route protected)
3. User fills form and submits payment via Stripe
4. Stripe processes $2,500 payment
5. Stripe webhook fires on `checkout.session.completed`
6. Backend updates user record
7. User redirected to `/admission-success`
8. User can access `/operator-portal`

---

## Required Stripe Products

### Product: LaunchPath Operating Standard
- **Price:** $2,500 USD
- **Type:** One-time payment
- **Description:** Lifetime access to the 90-Day Survival System

---

## Frontend Integration

### 1. Install Stripe SDK
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Update AdmissionCheckout.tsx

Replace the placeholder payment section with Stripe Elements:

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

// Create checkout session endpoint
const createCheckoutSession = async (userData: any) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userData.uid,
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone
    })
  });
  
  const { clientSecret } = await response.json();
  return clientSecret;
};
```

---

## Backend Integration

### 1. Create Checkout Session Endpoint

**File:** `functions/src/stripe/createCheckoutSession.ts`

```typescript
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import { admin } from '../admin';

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2023-10-16'
});

export const createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { userId, email, fullName, phone } = data;

  // Verify user has GO determination
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  const userData = userDoc.data();

  if (!userData?.ground0Completed || userData?.ground0Determination !== 'GO') {
    throw new functions.https.HttpsError('permission-denied', 'User does not have GO determination');
  }

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'LaunchPath Operating Standard',
            description: 'Lifetime access to the 90-Day Survival System',
          },
          unit_amount: 250000, // $2,500.00 in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${functions.config().app.url}/admission-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${functions.config().app.url}/admission-checkout`,
    customer_email: email,
    metadata: {
      userId,
      fullName,
      phone,
      product: 'launchpath_standard'
    }
  });

  return { sessionId: session.id, clientSecret: session.client_secret };
});
```

### 2. Create Webhook Handler

**File:** `functions/src/stripe/webhookHandler.ts`

```typescript
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import { admin } from '../admin';

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2023-10-16'
});

const endpointSecret = functions.config().stripe.webhook_secret;

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { userId, fullName, phone } = session.metadata!;

  try {
    // Update user record
    await admin.firestore().collection('users').doc(userId).update({
      admissionConfirmed: true,
      role: 'paid',
      paymentDate: admin.firestore.FieldValue.serverTimestamp(),
      stripeSessionId: session.id,
      stripePaymentIntent: session.payment_intent,
      phone: phone
    });

    // Create operator record
    await admin.firestore().collection('operators').doc(userId).set({
      userId,
      fullName,
      email: session.customer_email,
      phone,
      admissionDate: admin.firestore.FieldValue.serverTimestamp(),
      paymentAmount: 2500,
      status: 'active'
    }, { merge: true });

    // Send confirmation email
    await admin.firestore().collection('mail').add({
      to: session.customer_email,
      template: {
        name: 'admission-confirmation',
        data: {
          fullName,
          portalUrl: `${functions.config().app.url}/operator-portal`
        }
      }
    });

    console.log(`Admission confirmed for user ${userId}`);
  } catch (error) {
    console.error('Error processing checkout completion:', error);
    throw error;
  }
}
```

---

## Environment Variables

### Frontend (.env)
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (Firebase Functions Config)
```bash
firebase functions:config:set stripe.secret_key="sk_test_..."
firebase functions:config:set stripe.webhook_secret="whsec_..."
firebase functions:config:set app.url="https://launchpathedu.com"
```

---

## Webhook Setup in Stripe Dashboard

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://us-central1-YOUR_PROJECT.cloudfunctions.net/stripeWebhook`
4. Select events to listen to:
   - `checkout.session.completed`
5. Copy the webhook signing secret and add to Firebase config

---

## Testing

### Test Mode
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Webhook Testing
```bash
stripe listen --forward-to localhost:5001/YOUR_PROJECT/us-central1/stripeWebhook
```

---

## Security Checklist

- ✅ Verify user authentication before creating checkout session
- ✅ Verify GO determination before allowing checkout
- ✅ Validate webhook signatures
- ✅ Use HTTPS for all endpoints
- ✅ Store sensitive keys in environment variables
- ✅ Log all payment events for audit trail
- ✅ Handle webhook retries gracefully
- ✅ Implement idempotency for webhook processing

---

## Post-Payment User Experience

1. **Immediate Access:** User can access `/operator-portal`
2. **Sequential Unlocking:** Modules unlock in order (1 → 6)
3. **Email Confirmation:** Welcome email with login credentials
4. **Support Access:** Neural Advisor chatbot activated

---

## Firestore Schema Updates

### users/{userId}
```typescript
{
  // Existing fields...
  admissionConfirmed: boolean,
  role: 'free' | 'paid',
  paymentDate: Timestamp,
  stripeSessionId: string,
  stripePaymentIntent: string,
  phone: string
}
```

### operators/{userId}
```typescript
{
  userId: string,
  fullName: string,
  email: string,
  phone: string,
  admissionDate: Timestamp,
  paymentAmount: number,
  status: 'active' | 'suspended',
  currentModule: number,
  completedModules: number[]
}
```

---

## Error Handling

### Payment Declined
- Show user-friendly error message
- Suggest alternative payment methods
- Provide support contact

### Webhook Failure
- Stripe automatically retries failed webhooks
- Log errors to Firebase Functions logs
- Set up alerts for repeated failures

### Duplicate Payments
- Check if `admissionConfirmed` is already true
- Prevent double-charging
- Refund if duplicate detected

---

## Next Steps

1. [ ] Create Stripe account and get API keys
2. [ ] Set up product in Stripe Dashboard ($2,500)
3. [ ] Implement frontend Stripe Elements
4. [ ] Deploy webhook handler to Firebase Functions
5. [ ] Configure webhook endpoint in Stripe
6. [ ] Test with Stripe test mode
7. [ ] Set up email templates for confirmation
8. [ ] Go live with production keys
