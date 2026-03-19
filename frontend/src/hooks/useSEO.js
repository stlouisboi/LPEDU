import { useEffect } from "react";

/**
 * useSEO — sets document.title and meta description for each article/page.
 * No react-helmet required.
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    if (description) meta.content = description;
  }, [title, description]);
}
