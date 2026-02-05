/**
 * MailerLite Integration Utility (JSONP Implementation)
 * This method is required to bypass CORS restrictions on static frontends.
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

export const syncToMailerLite = (data: MailerLiteData): Promise<boolean> => {
  const formId = (process.env as any).VITE_MAILERLITE_FORM_ID;
  const accountId = '1182372'; // LaunchPath Institutional Account ID

  if (!formId) {
    console.error("CRITICAL: MailerLite Sync Failed. VITE_MAILERLITE_FORM_ID is not defined in your environment variables.");
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    // Unique callback name for this request
    const callbackName = `ml_callback_${Math.round(Math.random() * 1000000)}`;
    
    // Create the script tag
    const script = document.createElement('script');
    
    // Construct the URL with parameters
    // Note: MailerLite's JSONP endpoint expects fields in a specific format
    let url = `https://assets.mailerlite.com/jsonp/${accountId}/forms/${formId}/subscribe?`;
    url += `fields[email]=${encodeURIComponent(data.email)}`;
    
    if (data.fields?.name) {
      url += `&fields[name]=${encodeURIComponent(data.fields.name)}`;
    }
    if (data.fields?.company) {
      url += `&fields[company]=${encodeURIComponent(data.fields.company)}`;
    }
    
    url += `&callback=${callbackName}`;

    // Define the global callback function
    (window as any)[callbackName] = (response: any) => {
      console.log("MailerLite Response:", response);
      cleanup();
      resolve(true);
    };

    const cleanup = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      delete (window as any)[callbackName];
    };

    // Handle network errors
    script.onerror = () => {
      console.warn("MailerLite: Script injection failed. Data might not have synced.");
      cleanup();
      resolve(false);
    };

    script.src = url;
    document.body.appendChild(script);

    // Timeout safety
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        console.warn("MailerLite: Sync timed out.");
        cleanup();
        resolve(false);
      }
    }, 5000);
  });
};
