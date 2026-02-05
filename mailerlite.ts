/**
 * MailerLite Integration Utility
 * This utility synchronizes leads with a MailerLite "Embedded Form".
 */

interface MailerLiteData {
  email: string;
  fields?: {
    name?: string;
    last_name?: string;
    company?: string;
    phone?: string;
    [key: string]: any;
  };
}

export const syncToMailerLite = async (data: MailerLiteData): Promise<boolean> => {
  const formId = (process.env as any).VITE_MAILERLITE_FORM_ID;
  const accountId = '1989508'; // Updated to user's Account ID from provided URL

  if (!formId || formId === "undefined" || formId === "") {
    console.warn("MailerLite: VITE_MAILERLITE_FORM_ID is not configured. Data stored in Firebase only.");
    return false;
  }

  try {
    // The standard endpoint for MailerLite Embedded Forms
    const url = `https://assets.mailerlite.com/forms/${accountId}/${formId}/subscribe`;

    const formData = new FormData();
    formData.append('fields[email]', data.email);
    
    // Map fields to MailerLite's expected array format
    if (data.fields?.name) {
      formData.append('fields[name]', data.fields.name);
    }
    if (data.fields?.company) {
      formData.append('fields[company]', data.fields.company);
    }
    if (data.fields?.last_name) {
      formData.append('fields[last_name]', data.fields.last_name);
    }
    if (data.fields?.phone) {
      formData.append('fields[phone]', data.fields.phone);
    }

    // Fire the request
    // We use 'no-cors' because MailerLite's form endpoint handles the submission 
    // but doesn't always return a JSON response that browsers can read cross-origin.
    await fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    console.log("MailerLite: Transmission sent to form", formId, "on account", accountId);
    return true;
  } catch (err) {
    console.error("MailerLite: Critical failure", err);
    return false;
  }
};
