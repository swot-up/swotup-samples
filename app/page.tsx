"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("https://swot-up.com");
  }, []);

  return (
    <>
      <meta httpEquiv="refresh" content="0; url=https://swot-up.com" />
      <div style={{ display: "none" }}>Redirecting to swot-up.com...</div>
    </>
  );
}
