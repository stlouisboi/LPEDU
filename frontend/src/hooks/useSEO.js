import { useEffect } from "react";

const DEFAULT_IMAGE = "https://www.launchpathedu.com/og-launchpath.png";
const SITE_NAME = "LaunchPath Transportation EDU";

function setMeta(selector, attr, attrVal, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * useSEO — sets document.title, meta description, and full OG / Twitter Card tags.
 * @param {string} title
 * @param {string} description
 * @param {string} [image]   — absolute URL for og:image (defaults to hero image)
 * @param {string} [type]    — og:type (default: "website")
 */
export default function useSEO({ title, description, image, type = "website" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | LaunchPath` : SITE_NAME;
    const ogImage = image || DEFAULT_IMAGE;
    const canonicalUrl = window.location.href;

    document.title = fullTitle;

    setMeta('meta[name="description"]',         "name",     "description",         description || "");
    setMeta('meta[property="og:title"]',        "property", "og:title",            fullTitle);
    setMeta('meta[property="og:description"]',  "property", "og:description",      description || "");
    setMeta('meta[property="og:image"]',        "property", "og:image",            ogImage);
    setMeta('meta[property="og:url"]',          "property", "og:url",              canonicalUrl);
    setMeta('meta[property="og:type"]',         "property", "og:type",             type);
    setMeta('meta[property="og:site_name"]',    "property", "og:site_name",        SITE_NAME);
    setMeta('meta[name="twitter:card"]',        "name",     "twitter:card",        "summary_large_image");
    setMeta('meta[name="twitter:title"]',       "name",     "twitter:title",       fullTitle);
    setMeta('meta[name="twitter:description"]', "name",     "twitter:description", description || "");
    setMeta('meta[name="twitter:image"]',       "name",     "twitter:image",       ogImage);
  }, [title, description, image, type]);
}
