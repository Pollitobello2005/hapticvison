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
      "IMU MPU-6050 detecta giros de cabeza. Controlador PID mantiene el escaneo estable.",
    specs: [
      { icon: "🧭", text: "IMU MPU-6050" },
      { icon: "🎯", text: "PID de lazo cerrado" },
    ],
  },
  {
    from: 0.33,
    eyebrow: "Capa de Control",
    title: "Arduino: reflejos de microsegundos.",
    description:
      "Arduino Nano cierra los lazos de control sin SO entre sensor y respuesta.",
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
      "Algoritmo APF: cada obstáculo repele, la resultante señala la ruta libre en vibración.",
    specs: [
      { icon: "🗺️", text: "Algoritmo APF" },
      { icon: "↔️", text: "Vibración izquierda/derecha" },
    ],
  },

  /* ── SECUENCIA 2 — El sistema de IA (cables) ── */
  {
    from: 0.5,
    eyebrow: "Cerebro de IA",
    title: "Raspberry Pi 4. Edge AI en tu bolsillo.",
    description:
      "RPi 4 con 4 GB: inferencia local, sin nube, sin latencia de red.",
    specs: [
      { icon: "🧠", text: "Raspberry Pi 4" },
      { icon: "📷", text: "Cámara RPi v2" },
    ],
  },
  {
    from: 0.58,
    eyebrow: "Visión Computacional",
    title: "Lo que el sensor no puede ver.",
    description:
      "ToF detecta geometría, no semántica. YOLOv8 Tiny cubre peligros críticos: ramas, escaleras, pozos, vehículos.",
    specs: [
      { icon: "⚠️", text: "Peligros: ramas · escaleras · pozos" },
      { icon: "🎯", text: "YOLOv8 Tiny" },
    ],
  },
  {
    from: 0.66,
    eyebrow: "Dataset Propio",
    title: "Entrenado para los peligros que nadie etiquetó.",
    description:
      "Dataset en Roboflow con obstáculos peligrosos para ciegos. Validado en campo.",
    specs: [
      { icon: "🏷️", text: "Dataset custom — Roboflow" },
      { icon: "👤", text: "Validación con usuario invidente" },
    ],
  },
  {
    from: 0.74,
    eyebrow: "Visual Servoing",
    title: "La cámara le da prioridad al peligro.",
    description:
      "El servo interrumpe el barrido ante escaleras descendentes para medición exacta.",
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
      <section className="bg-transparent pb-48">
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
        <div style={{ height: "720px", position: "relative", overflow: "hidden" }}>
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

      <div className="h-24 md:h-40" aria-hidden="true" />

      {/* ── Módulos del Sistema ── */}
      <section className="bg-transparent pt-56 pb-72 px-6 md:pt-80">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-64 pt-8 md:pt-16">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-indigo-500 mb-4">
              Arquitectura del Sistema
            </p>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">
              Tres módulos. Un solo propósito.
            </h2>
            <p className="text-gray-500 mt-2 text-lg max-w-2xl leading-relaxed">
              HapticVision AI está organizado en tres capas especializadas que
              trabajan en sinergia para traducir el entorno en percepción háptica.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-12 md:mt-20">

          {/* ── Módulo 1: Sistemas de Control ── */}
          <div className="module-card">
            <div className="module-card__icon-wrap" style={{ background: "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)" }}>
              <span style={{ fontSize: "2rem" }}>⚙️</span>
            </div>
            <p className="module-card__tag">Módulo 1</p>
            <h3 className="module-card__title">Sistemas de Control</h3>
            <p className="module-card__desc">
              PID en tiempo real. Arduino mantiene estable el escaneo independientemente de los movimientos.
            </p>
            <ul className="module-card__list">
              <li><span className="module-card__bullet" />Arduino Nano + PCA9685</li>
              <li><span className="module-card__bullet" />Pan &amp; tilt servo + I²C</li>
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
              YOLOv8 Tiny en Raspberry Pi detecta peligros críticos: escaleras, ramas, pozos. Sin nube.
            </p>
            <ul className="module-card__list">
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />Raspberry Pi 4 + YOLOv8</li>
              <li><span className="module-card__bullet" style={{ background: "#7c3aed" }} />Dataset personalizado en Roboflow</li>
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
              ToF + IMU + 6 motores hápticos en un armazón compacto y portable.
            </p>
            <ul className="module-card__list">
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />ToF VL53L1X + IMU + 6 motores ERM</li>
              <li><span className="module-card__bullet" style={{ background: "#0ea5e9" }} />Power bank 10 000 mAh</li>
            </ul>
          </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECCIÓN: METODOLOGÍA DE INVESTIGACIÓN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-transparent py-48 px-6">
        <div className="max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-36">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-indigo-500 mb-4">
              Metodología de Investigación
            </p>
            <h2 className="text-6xl font-bold text-gray-900 mb-6">
              Del problema a la solución.
            </h2>
            <p className="text-gray-500 mt-2 text-lg max-w-2xl leading-relaxed">
              Identificación, prototipado, validación en campo y mejora continua.
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
                  2.2 billones de personas con discapacidad visual viven con limitaciones. El bastón y el perro guía solo detectan el piso. Los dispositivos electrónicos existentes son caros, lentos y requieren conexión a la nube.
                </p>
                <p className="research-block__desc" style={{ marginTop: "1rem" }}>
                  HapticVision AI responde tres preguntas: ¿Codificar espacio en vibración? ¿Detectar peligros invisibles al ToF? ¿Hacerlo portable, asequible y sin red?
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
