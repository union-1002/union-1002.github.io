// src/components/AdDeath.jsx
import { useEffect } from "react";

export default function AdDeath() {
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
      data-ad-slot="7977237870"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
