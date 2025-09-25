import { useEffect } from "react";

export default function AdBottom() {
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
      style={{ display: "block", width: "95%", maxWidth: "728px", minHeight: "250px", padding: "10px" }}
      data-ad-client="ca-pub-9529288575559798"
      data-ad-slot="1725311174"  // 새 슬롯 ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
