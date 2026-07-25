import { ImageResponse } from "next/og";

export const alt = "RegForge: turn a sensor datasheet into a working, cited C driver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card — mirrors the in-app lab-instrument aesthetic.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", backgroundColor: "#0b0b0e", color: "#f3f3f6",
          padding: 72, fontFamily: "sans-serif",
          backgroundImage: "radial-gradient(circle at 78% 30%, rgba(108,99,255,0.18), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "#131316", border: "1px solid #313138", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            <span>Reg</span><span style={{ color: "#8a82ff" }}>Forge</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, color: "#8c8c96", fontFamily: "monospace", letterSpacing: 4 }}>
            DATASHEET → C DRIVER
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 18px", fontSize: 66, fontWeight: 700, lineHeight: 1.08, maxWidth: 1000 }}>
            <span>Turn a sensor datasheet</span>
            <span>into a</span>
            <span style={{ color: "#8a82ff" }}>working C driver.</span>
          </div>
          <div style={{ fontSize: 28, color: "#8c8c96", maxWidth: 900, lineHeight: 1.35 }}>
            Verify the extracted register map, then generate header, driver, and a cited init sequence.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#8c8c96", fontFamily: "monospace" }}>
          <span>schema-validated</span>
          <span style={{ color: "#313138" }}>·</span>
          <span>page-cited</span>
          <span style={{ color: "#313138" }}>·</span>
          <span>deterministic codegen</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
