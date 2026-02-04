const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const MAILERLITE_API_KEY = functions.config().mailerlite?.apikey || process.env.MAILERLITE_API_KEY;

exports.syncToMailerLite = functions.firestore
  .document("leadMagnets/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    if (!data.email) {
      console.log("No email found, skipping");
      return null;
    }

    const subscriber = {
      email: data.email,
      fields: {
        name: data.name || "",
        lead_magnet: data.leadMagnet || ""
      }
    };

    try {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MAILERLITE_API_KEY}`
        },
        body: JSON.stringify(subscriber)
      });

      const result = await response.json();
      console.log("MailerLite response:", result);
      return result;
    } catch (error) {
      console.error("Error syncing to MailerLite:", error);
      return null;
    }
  });
