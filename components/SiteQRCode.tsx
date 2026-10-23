"use client";

import { useSyncExternalStore } from "react";
import { QRCodeSVG } from "qrcode.react";

const subscribe = () => () => {};

export default function SiteQRCode({ size = 128 }: { size?: number }) {
  const origin = useSyncExternalStore(subscribe, () => window.location.origin, () => "");
  const url = "https://optima-technology.vercel.app";

  if (!url) return <div style={{ width: size, height: size }} className="bg-white rounded-xl" />;

  return (
    <a href={url} aria-label="Scan to visit Optima Technologies" className="inline-block p-3 bg-white rounded-xl">
      <QRCodeSVG
        value={url}
        size={size}
        level="H"
        fgColor="#0a1628"
        imageSettings={{ src: "/logo.svg", height: size * 0.22, width: size * 0.22, excavate: true }}
      />
    </a>
  );
}
