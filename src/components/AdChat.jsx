// src/components/AdBanner.jsx
import { useEffect } from "react";

export default function AdChat() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-9529288575559798"
      data-ad-slot="1683422800"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
