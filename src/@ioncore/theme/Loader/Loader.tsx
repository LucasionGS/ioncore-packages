import React from "react";
import "./Loader.css";

export function Loader({
  centered = false,
  size,
  logoUrl,
}: {
  centered?: boolean;
  size?: number;
  logoUrl: string;
}) {
  return (
    <div className={"ic-loader" + (centered ? " ic-loader--centered" : "")} style={{
      width: size,
      height: size,
      borderWidth: size ? size / 25 : undefined,
    }}>
      <img src={logoUrl} alt="Ioncore" />
    </div>
  );
}
