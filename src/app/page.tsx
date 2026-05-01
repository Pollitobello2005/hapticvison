import ScrollSequence, { type Chapter, type Sequence } from "@/components/ScrollSequence"
import ASCIIText from "@/components/ASCIIText"
import DecryptedText from "@/components/DecryptedText"
import CircularGallery from "@/components/CircularGallery"

const SEQUENCES: Sequence[] = [
  { folder: "lentes", frameCount: 240, label: "Dispositivo" },
  { folder: "cables", frameCount: 240, label: "Sistema" },
]

const CHAPTERS: Chapter[] = [
  /* ── SECUENCIA 1 — El dispositivo (lentes) ── */
  {
    from: 0,
    eyebrow: "HapticVision AI",
    title: "Diseñado para ver lo invisible.",
    description:
      "Sustitución sensorial activa para personas con discapacidad visual. Bio-inspirado en la ecolocalización.",
    specs: [
      { icon: "👁️", text: "Campo de percepción: 180°" },
      { icon: "⚡", text: "Respuesta en tiempo real" },
    ],
  },
  {
    from: 0.09,
    eyebrow: "Matriz Háptica",
    title: "6 motores. Una frente. Un mapa.",
    description:
      "Arreglo lineal de 6 motores ERM en el armazón. Cada vibración es un obstáculo. Tu frente aprende a ver.",
    specs: [
      { icon: "🖐️", text: "6× Coin ERM — driver PCA9685" },
      { icon: "📶", text: "Modulación PWM de 12 bits" },
    ],
  },
  {
    from: 0.17,
    eyebrow: "Percepción Activa",
    title: "Un pan & tilt que escanea el mundo.",
    description:
      "El sensor ToF VL53L1X va montado sobre un mecanismo pan & tilt. Barre 180° de forma continua generando coordenadas polares del entorno.",
    specs: [
      { icon: "📡", text: "ToF VL53L1X — precisión milimétrica" },
      { icon: "🔄", text: "Mecanismo pan & tilt — barrido 180°" },
    ],
  },
  {
    from: 0.25,
    eyebrow: "Estabilización Inercial",
    title: "La cabeza se mueve. La percepción no.",
    description:
      "La IMU MPU-6050 detecta cada giro de cabeza. Un controlador PID corrige el servo en tiempo real para mantener el plano de escaneo estable.",
    specs: [
      { icon: "🧭", text: "IMU MPU-6050 — ángulos de Euler" },
      { icon: "🎯", text: "PID digital de lazo cerrado" },
    ],
  },
  {
    from: 0.33,
    eyebrow: "Capa de Control",
    title: "Arduino: reflejos de microsegundos.",
    description:
      "El Arduino Nano cierra los lazos de control PID y gestiona el PWM. Ningún sistema operativo entre el sensor y la respuesta.",
    specs: [
      { icon: "⚙️", text: "Bus I²C: PCA9685 + ToF + IMU" },
      { icon: "🔗", text: "Serial → Raspberry Pi 4" },
    ],
  },
  {
    from: 0.41,
    eyebrow: "Navegación",
    title: "Campos de fuerza que dibujan el camino.",
    description:
      "Cada obstáculo genera un vector de repulsión. La resultante de todo el semicírculo frontal señala la ruta libre y la traduce a vibración direccional.",
    specs: [
      { icon: "🗺️", text: "Algoritmo APF expandido" },
      { icon: "↔️", text: "Corrección háptica izquierda/derecha" },
    ],
  },

  /* ── SECUENCIA 2 — El sistema de IA (cables) ── */
  {
    from: 0.5,
    eyebrow: "Cerebro de IA",
    title: "Raspberry Pi 4. Edge AI en tu bolsillo.",
    description:
      "Toda la inteligencia vive en una RPi 4 de 4 GB. Inferencia local, sin nube, sin latencia de red.",
    specs: [
      { icon: "🧠", text: "Raspberry Pi 4 — 4 GB RAM" },
      { icon: "📷", text: "1× Cámara RPi v2 (8 MP)" },
    ],
  },
  {
    from: 0.58,
    eyebrow: "Visión Computacional",
    title: "Lo que el sensor no puede ver.",
    description:
      "El ToF detecta geometría, no semántica. YOLOv8 Tiny cubre los peligros críticos para ciegos: ramas, escaleras en declive, pozos, coches en movimiento.",
    specs: [
      { icon: "⚠️", text: "Peligros: ramas · pozos · escaleras · coches" },
      { icon: "🎯", text: "YOLOv8 Tiny — inferencia en RPi" },
    ],
  },
  {
    from: 0.66,
    eyebrow: "Dataset Propio",
    title: "Entrenado para los peligros que nadie etiquetó.",
    description:
      "Construimos nuestro propio dataset en Roboflow con los obstáculos más peligrosos para ciegos. Validado en campo con una persona invidente real.",
    specs: [
      { icon: "🏷️", text: "Dataset custom — Roboflow + transfer learning" },
      { icon: "👤", text: "Validación con usuario invidente real" },
    ],
  },
  {
    from: 0.74,
    eyebrow: "Visual Servoing",
    title: "La cámara le da prioridad al peligro.",
    description:
      "Si la visión detecta una escalera descendente, el servo interrumpe el barrido y apunta directo al riesgo para medición exacta de distancia.",
    specs: [
      { icon: "🚨", text: "Interrupción por riesgo crítico" },
      { icon: "📏", text: "Fusión cámara + ToF" },
    ],
  },

  {
    from: 0.91,
    eyebrow: "Ecosistema Completo",
    title: "Un dispositivo. Una nueva libertad.",
    description:
      "Percepción háptica + visión semántica + navegación autónoma. HapticVision AI no reemplaza los sentidos — los amplifica.",
    specs: [
      { icon: "🔋", text: "Power Bank 10 000 mAh" },
      { icon: "🌐", text: "100% Edge — sin dependencia de red" },
    ],
  },
]

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
        <div className="relative w-full" style={{ height: "55vh" }}>
          <ASCIIText
            text="HAPTIC VISION"
            enableWaves={true}
            asciiFontSize={7}
            textFontSize={180}
            textColor="#1e1b4b"
            planeBaseHeight={9}
          />
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          {/* Line 1 — tagline */}
          <p className="text-gray-800 text-2xl font-medium tracking-wide">
            <DecryptedText
              text="Dispositivo de asistencia visual para personas invidentes"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={15}
              className="text-gray-800"
              encryptedClassName="text-indigo-500 font-bold"
            />
          </p>

          {/* Line 2 — keywords */}
          <p className="text-base tracking-[0.15em] uppercase">
            <DecryptedText
              text="Percepción háptica · Visión semántica · Edge AI"
              animateOn="view"
              sequential
              revealDirection="center"
              speed={10}
              className="text-gray-500"
              encryptedClassName="text-violet-500 font-semibold"
            />
          </p>

          <p className="mt-6 text-gray-400 text-sm animate-bounce">↓ scroll</p>
        </div>
      </section>

      {/* ── Scroll sequence ── */}
      <ScrollSequence
        sequences={SEQUENCES}
        chapters={CHAPTERS}
        scrollLength={12000}
        scrub={0.5}
        width={1920}
        height={1080}
      />

      {/* ── Galería circular ── */}
      <section className="bg-transparent">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pt-24 pb-10">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-indigo-500 mb-3">
            Hardware del Sistema
          </p>
          <h2 className="text-5xl font-bold text-gray-900 text-center">
            Cada pieza importa.
          </h2>
          <p className="text-gray-400 mt-4 text-base">Arrastra para explorar los componentes</p>
        </div>

        {/* Gallery */}
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#1e1b4b"
            borderRadius={0.05}
            scrollSpeed={3}
            scrollEase={0.03}
            items={[
              { image: "https://picsum.photos/seed/tof/800/600",     text: "ToF VL53L1X" },
              { image: "https://picsum.photos/seed/pantilt/800/600", text: "Pan & Tilt" },
              { image: "https://picsum.photos/seed/haptic/800/600",  text: "Matriz Háptica" },
              { image: "https://picsum.photos/seed/imu6050/800/600", text: "IMU MPU-6050" },
              { image: "https://picsum.photos/seed/arduino/800/600", text: "Arduino Nano" },
              { image: "https://picsum.photos/seed/rpi4/800/600",    text: "Raspberry Pi 4" },
              { image: "https://picsum.photos/seed/yolo8/800/600",   text: "YOLOv8 Tiny" },
              { image: "https://picsum.photos/seed/roboflow/800/600",text: "Dataset Propio" },
              { image: "https://picsum.photos/seed/lentes1/800/600", text: "Lentes Hápticos" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
