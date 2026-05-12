import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/LenisProvider"
import ColorBends from "@/components/ColorBends"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Haptic Presentation — Scroll Sequence Demo",
  description:
    "Immersive Apple-style scroll sequence built with Next.js, GSAP ScrollTrigger, and Canvas API.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased">
        {/* ── Fixed background shader ── */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "#ffffff",   /* blanco base bajo el shader */
          }}
        >
          <ColorBends
            colors={["#c8d8ff", "#e8d0ff", "#d0f0ff", "#ffd6f0", "#fffbe0"]}
            rotation={110}
            autoRotate={1.5}
            speed={0.12}
            scale={1.2}
            frequency={0.9}
            warpStrength={0.6}
            mouseInfluence={0.4}
            parallax={0.3}
            noise={0.06}
            iterations={2}
            intensity={1.1}
            bandWidth={5}
            transparent={true}
          />
        </div>

        {/* ── Page content above the shader ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <LenisProvider>{children}</LenisProvider>
        </div>
      </body>
    </html>
  )
}
