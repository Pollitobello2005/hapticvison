import type { NextConfig } from "next";

// Forzar desactivación de telemetría en entornos de build (p. ej. Vercel)
process.env.NEXT_TELEMETRY_DISABLED = process.env.NEXT_TELEMETRY_DISABLED ?? "1";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Ajustes experimentales (sin relación con telemetría)
  },
};

export default nextConfig;
