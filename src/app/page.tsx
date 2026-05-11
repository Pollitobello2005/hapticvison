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

        {/* Gallery — extra bottom padding to show the info panel */}
        <div style={{ height: "720px", position: "relative" }}>
          <CircularGallery
            bend={3}
            textColor="#1e1b4b"
            borderRadius={0.05}
            scrollSpeed={3}
            scrollEase={0.03}
            items={[
              {
                image: "/gallery/tof.png",
                text: "ToF VL53L1X",
                description:
                  "Sensor de tiempo de vuelo con precisión milimétrica y rango de 4 m. Genera el mapa de distancias del entorno en tiempo real para calcular la ruta libre.",
              },
              {
                image: "/gallery/pan_tilt.png",
                text: "Pan & Tilt",
                description:
                  "Mecanismo de dos ejes (pan 180° + tilt) que orienta el sensor ToF. Un controlador PID corrige el servo en tiempo real para mantener el plano de escaneo estable mientras la cabeza se mueve.",
              },
              {
                image: "/gallery/haptic_matrix.png",
                text: "Matriz Háptica",
                description:
                  "Arreglo de 6 motores ERM Coin en el armazón, controlados por un driver PCA9685 vía I²C. Cada motor representa una zona del entorno: intensidad = proximidad del obstáculo.",
              },
              {
                image: "/gallery/imu.png",
                text: "IMU MPU-6050",
                description:
                  "Unidad de medición inercial de 6 DOF (acelerómetro + giroscopio). Detecta giros de cabeza y corrige el ángulo del servo mediante un controlador PID para mantener el escaneo estable.",
              },
              {
                image: "/gallery/arduino.png",
                text: "Arduino Nano",
                description:
                  "Controlador embebido que cierra los lazos de control PID y gestiona el PWM. Sin sistema operativo entre el sensor y la respuesta. Se comunica vía Bus I²C con el PCA9685, el ToF y la IMU, envía datos por Serial a la Raspberry Pi y controla directamente el mecanismo pan & tilt de servomotores.",
              },
              {
                image: "/gallery/rpi4.png",
                text: "Raspberry Pi 4",
                description:
                  "Cerebro central con 4 GB de RAM. Ejecuta YOLOv8 Tiny, el algoritmo APF de navegación y la fusión sensorial, todo de forma local sin dependencia de red.",
              },
              {
                image: "/gallery/yolov8.png",
                text: "YOLOv8 Tiny",
                description:
                  "Red neuronal de detección de objetos optimizada para edge. Identifica peligros críticos para personas invidentes: ramas, escaleras descendentes, pozos y vehículos en movimiento.",
              },
              {
                image: "/gallery/dataset.png",
                text: "Dataset Propio",
                description:
                  "Dataset curado en Roboflow con imágenes de los obstáculos más peligrosos para ciegos en entornos reales. Validado en campo con un usuario invidente para garantizar precisión clínica.",
              },
              {
                image: "/gallery/lentes.png",
                text: "Lentes Hápticos",
                description:
                  "Armazón ergonómico que integra el sensor ToF, el mecanismo pan & tilt y la matriz de motores en un único dispositivo portable alimentado por un power bank de 10 000 mAh.",
              },
            ]}
          />
        </div>
      </section>

      {/* ── Módulos del Sistema ── */}
      <section className="bg-transparent py-32 px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-indigo-500 mb-3">
            Arquitectura del Sistema
          </p>
          <h2 className="text-5xl font-bold text-gray-900">
            Tres módulos. Un solo propósito.
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl">
            HapticVision AI está organizado en tres capas especializadas que
            trabajan en sinergia para traducir el entorno en percepción háptica.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ── Módulo 1: Sistemas de Control ── */}
          <div className="module-card">
            <div className="module-card__icon-wrap" style={{ background: "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)" }}>
              <span style={{ fontSize: "2rem" }}>⚙️</span>
            </div>
            <p className="module-card__tag">Módulo 1</p>
            <h3 className="module-card__title">Sistemas de Control</h3>
            <p className="module-card__desc">
              Cierra los lazos de retroalimentación en tiempo real. El
              controlador PID lee la IMU MPU-6050, corrige el servo del
              mecanismo pan &amp; tilt y mantiene el plano de escaneo estable
              sin importar los movimientos de cabeza del usuario.
            </p>
            <ul className="module-card__list">
              <li><span className="module-card__bullet" />Arduino Nano — controlador de tiempo real</li>
              <li><span className="module-card__bullet" />PID digital de lazo cerrado</li>
              <li><span className="module-card__bullet" />Driver PCA9685 — PWM 12 bits</li>
              <li><span className="module-card__bullet" />Mecanismo pan &amp; tilt de servomotores</li>
              <li><span className="module-card__bullet" />Bus I²C multidispositivo</li>
            </ul>
          </div>

          {/* ── Módulo 2: Sistemas Inteligentes ── */}
          <div className="module-card module-card--featured">
            <div className="module-card__icon-wrap" style={{ background: "linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)" }}>
              <span style={{ fontSize: "2rem" }}>🧠</span>
            </div>
            <p className="module-card__tag" style={{ color: "#7c3aed" }}>Módulo 2</p>
            <h3 className="module-card__title">Sistemas Inteligentes</h3>
            <p className="module-card__desc">
              Aporta la capa semántica que el sensor ToF no puede dar. Ejecuta
              YOLOv8 Tiny localmente en la Raspberry Pi 4, detectando peligros
              críticos para personas invidentes y fusionando visión con
              distancia para generar alerts hápticas priorizadas.
            </p>
            <ul className="module-card__list">
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />Raspberry Pi 4 — 4 GB RAM, Edge AI</li>
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />YOLOv8 Tiny — inferencia local</li>
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />Dataset propio en Roboflow</li>
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />Algoritmo APF de navegación</li>
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />Visual servoing — fusión cámara + ToF</li>
            </ul>
          </div>

          {/* ── Módulo 3: Sistemas Electrónicos ── */}
          <div className="module-card">
            <div className="module-card__icon-wrap" style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#38bdf8 100%)" }}>
              <span style={{ fontSize: "2rem" }}>⚡</span>
            </div>
            <p className="module-card__tag" style={{ color: "#0ea5e9" }}>Módulo 3</p>
            <h3 className="module-card__title">Sistemas Electrónicos</h3>
            <p className="module-card__desc">
              La capa física del dispositivo. Integra los sensores, actuadores
              y la electrónica de potencia en un armazón portable. Cada
              componente fue seleccionado por su bajo consumo, tamaño compacto
              y fiabilidad en campo.
            </p>
            <ul className="module-card__list">
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />Sensor ToF VL53L1X — 4 m de rango</li>
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />IMU MPU-6050 — 6 DOF</li>
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />Matriz de 6 motores ERM Coin</li>
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />Cámara RPi v2 — 8 MP</li>
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />Power bank 10 000 mAh — 100% portátil</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECCIÓN: METODOLOGÍA DE INVESTIGACIÓN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-transparent py-32 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-24">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-indigo-500 mb-3">
              Metodología de Investigación
            </p>
            <h2 className="text-5xl font-bold text-gray-900">
              Del problema a la solución.
            </h2>
            <p className="text-gray-400 mt-4 text-base max-w-2xl">
              Un proceso iterativo de identificación, prototipado, validación
              en campo y mejora continua centrado en el usuario invidente.
            </p>
          </div>

          {/* ────────────────────────────────────────────────────────────
              BLOQUE 1 — PROBLEMÁTICA
          ──────────────────────────────────────────────────────────── */}
          <div className="research-block research-block--accent-indigo">
            <div className="research-block__label">
              <span className="research-dot research-dot--indigo" />
              Problemática detectada
            </div>
            <div className="research-block__body research-block__body--two-col">
              <div>
                <h3 className="research-block__title">
                  ¿Por qué los dispositivos actuales no son suficientes?
                </h3>
                <p className="research-block__desc">
                  Más de 2.2 billones de personas en el mundo viven con
                  discapacidad visual. Las soluciones dominantes —bastón
                  blanco y perro guía— sólo detectan obstáculos al nivel del
                  suelo y no ofrecen información semántica del entorno. Los
                  dispositivos electrónicos existentes (sonar, cámaras con
                  voz) tienen alta latencia, alto costo o requieren
                  conectividad constante a la nube.
                </p>
                <p className="research-block__desc" style={{ marginTop: "1rem" }}>
                  HapticVision AI nació de tres preguntas de investigación
                  concretas: ¿Cómo codificar el espacio en vibración
                  intuitiva? ¿Cómo detectar peligros invisibles al ToF?
                  ¿Cómo hacer todo esto portable, asequible y sin red?
                </p>
              </div>
              <div className="research-stat-grid">
                {[
                  { value: "2.2B", label: "Personas con discapacidad visual en el mundo" },
                  { value: "36M", label: "Personas totalmente ciegas según la OMS" },
                  { value: ">$3 000", label: "Costo promedio de soluciones existentes" },
                  { value: "0", label: "Soluciones edge-AI hápticas de bajo costo en mercado" },
                ].map((s) => (
                  <div key={s.value} className="research-stat">
                    <span className="research-stat__value">{s.value}</span>
                    <span className="research-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────
              BLOQUE 2 — USO REAL CON PERSONAS INVIDENTES
          ──────────────────────────────────────────────────────────── */}
          <div className="research-block research-block--accent-violet">
            <div className="research-block__label">
              <span className="research-dot research-dot--violet" />
              Validación en campo
            </div>
            <h3 className="research-block__title">
              Uso real con personas invidentes.
            </h3>
            <p className="research-block__desc">
              El prototipo fue probado en sesiones controladas con un usuario
              invidente real en entornos cotidianos: pasillos universitarios,
              escaleras y zonas con obstáculos dinámicos. Los resultados
              validaron la intuitividad de la codificación háptica y
              permitieron ajustar la intensidad de los motores ERM y el
              algoritmo APF.
            </p>
            <div className="research-timeline">
              {[
                {
                  phase: "Fase 1",
                  color: "#6366f1",
                  title: "Entrevista de necesidades",
                  desc: "Sesiones con usuarios invidentes para mapear los escenarios de mayor riesgo y las limitaciones de sus herramientas actuales.",
                },
                {
                  phase: "Fase 2",
                  color: "#7c3aed",
                  title: "Prototipado iterativo",
                  desc: "Construcción de 3 versiones del armazón, ajustando posición de motores, ángulo del sensor y ergonomía del mecanismo pan & tilt.",
                },
                {
                  phase: "Fase 3",
                  color: "#0ea5e9",
                  title: "Pruebas en campo",
                  desc: "El usuario navegó 15 minutos con el dispositivo en un entorno con obstáculos variados. Se registraron colisiones, tiempos de reacción y feedback subjetivo.",
                },
                {
                  phase: "Fase 4",
                  color: "#10b981",
                  title: "Ajuste y validación",
                  desc: "Con base en el feedback, se recalibró el umbral háptico, se reentrenó YOLOv8 con más imágenes de escaleras y se redujo la latencia del PID en 18 ms.",
                },
              ].map((item) => (
                <div key={item.phase} className="research-timeline__item">
                  <div className="research-timeline__dot" style={{ background: item.color }} />
                  <div className="research-timeline__content">
                    <span className="research-timeline__phase" style={{ color: item.color }}>
                      {item.phase}
                    </span>
                    <strong className="research-timeline__step">{item.title}</strong>
                    <p className="research-timeline__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────
              BLOQUE 3 — COMPARACIÓN CON SOLUCIONES SIMILARES
          ──────────────────────────────────────────────────────────── */}
          <div className="research-block research-block--accent-sky">
            <div className="research-block__label">
              <span className="research-dot research-dot--sky" />
              Análisis comparativo
            </div>
            <h3 className="research-block__title">
              HapticVision vs. soluciones similares.
            </h3>
            <p className="research-block__desc" style={{ marginBottom: "1.5rem" }}>
              Comparativa frente a los dispositivos de asistencia visual más
              representativos del mercado y la academia.
            </p>
            <div className="research-table-wrap">
              <table className="research-table">
                <thead>
                  <tr>
                    <th>Criterio</th>
                    <th className="research-table__highlight">HapticVision AI</th>
                    <th>Bastón blanco</th>
                    <th>OrCam MyEye</th>
                    <th>Microsoft Seeing AI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Detección de obstáculos aéreos", "✅", "❌", "✅", "✅"],
                    ["Detección semántica (IA)", "✅", "❌", "✅", "✅"],
                    ["Feedback háptico intuitivo", "✅", "❌", "❌", "❌"],
                    ["Funciona sin internet", "✅", "✅", "✅", "❌"],
                    ["Costo accesible (<$300)", "✅", "✅", "❌", "✅"],
                    ["Tiempo real (<100 ms)", "✅", "✅", "❌", "❌"],
                    ["Portátil y autónomo", "✅", "✅", "✅", "❌"],
                    ["Dataset personalizado", "✅", "N/A", "❌", "❌"],
                  ].map(([criterion, ...vals]) => (
                    <tr key={criterion}>
                      <td>{criterion}</td>
                      {vals.map((v, i) => (
                        <td
                          key={i}
                          className={i === 0 ? "research-table__highlight" : ""}
                          style={{ textAlign: "center", fontSize: "1.1rem" }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────
              BLOQUE 4 — PLAN DE MEJORA
          ──────────────────────────────────────────────────────────── */}
          <div className="research-block research-block--accent-emerald">
            <div className="research-block__label">
              <span className="research-dot research-dot--emerald" />
              Plan de mejora
            </div>
            <h3 className="research-block__title">
              Propuesta de evolución del sistema.
            </h3>
            <p className="research-block__desc" style={{ marginBottom: "2rem" }}>
              Identificadas las limitaciones del prototipo actual, proponemos
              una hoja de ruta de tres horizontes para llevar HapticVision
              del laboratorio al mercado.
            </p>
            <div className="research-roadmap">
              {[
                {
                  horizon: "Corto plazo",
                  period: "0 – 6 meses",
                  color: "#6366f1",
                  bg: "rgba(99,102,241,0.07)",
                  items: [
                    "Integrar una segunda cámara estéreo para percepción de profundidad más precisa.",
                    "Ampliar el dataset con 5 000 imágenes adicionales de entornos mexicanos.",
                    "Optimizar el modelo a TFLite FP16 para reducir latencia de inferencia a < 40 ms.",
                    "Rediseñar el armazón para mayor ergonomía (menor peso, diseño discreto).",
                  ],
                },
                {
                  horizon: "Mediano plazo",
                  period: "6 – 18 meses",
                  color: "#7c3aed",
                  bg: "rgba(124,58,237,0.07)",
                  items: [
                    "Añadir retroalimentación auditiva (earbuds) como canal complementario al háptico.",
                    "Implementar localización y mapeo simultáneo (SLAM) para navegación en interiores.",
                    "Desarrollar app móvil para configuración de perfiles de usuario y umbral de sensibilidad.",
                    "Iniciar ensayo clínico formal con 20 usuarios invidentes en tres instituciones.",
                  ],
                },
                {
                  horizon: "Largo plazo",
                  period: "18 – 36 meses",
                  color: "#0ea5e9",
                  bg: "rgba(14,165,233,0.07)",
                  items: [
                    "Miniaturizar electrónica en un ASIC personalizado para reducir tamaño y consumo.",
                    "Incorporar modelos de lenguaje (LLM edge) para descripción verbal del entorno.",
                    "Certificación médica y registro ante COFEPRIS/FDA para comercialización.",
                    "Explorar modelos de distribución social a costo cero en alianza con DIF e INEGI.",
                  ],
                },
              ].map((h) => (
                <div key={h.horizon} className="research-roadmap__lane" style={{ background: h.bg, borderColor: h.color + "30" }}>
                  <div className="research-roadmap__header">
                    <span className="research-roadmap__tag" style={{ color: h.color, background: h.color + "18" }}>
                      {h.horizon}
                    </span>
                    <span className="research-roadmap__period">{h.period}</span>
                  </div>
                  <ul className="research-roadmap__list">
                    {h.items.map((item) => (
                      <li key={item}>
                        <span className="research-roadmap__bullet" style={{ background: h.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
