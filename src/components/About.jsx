import React from "react";
import AboutPinnedScroll from "./AboutPinnedScroll";

export default function About() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 10,
          bottom: 10,
          zIndex: 999999,
          padding: "6px 10px",
          borderRadius: 999,
          background: "rgba(0,0,0,0.65)",
          color: "#00ff7f",
          fontSize: 12,
          border: "1px solid rgba(0,255,127,0.35)",
          pointerEvents: "none",
        }}
      >
        DEPLOY_CHECK_V15_9031
      </div>
      <AboutPinnedScroll />
    </>
  );
}
