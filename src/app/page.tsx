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
    title: "Diseñado para percibir lo que no puede verse.",
    description:
      "Sistema de sustitución sensorial activa para personas con discapacidad visual, inspirado en los principios de la ecolocalización.",
    specs: [
      { icon: "👁️", text: "Campo de percepción horizontal de 90°" },
      { icon: "⚡", text: "Respuesta en tiempo real" },
      { icon: "📳", text: "Retroalimentación háptica intuitiva" },
    ],
  },
  {
    from: 0.09,
    eyebrow: "Matriz Háptica",
    title: "6 motores. Una frente. Un mapa.",
    description:
      "Arreglo lineal de 4 motores vibratorios tipo moneda integrados en la diadema. Cada motor representa una región del entorno y su intensidad de vibración varía según la distancia al obstáculo.",
    specs: [
      { icon: "🖐️", text: "4 × Motores vibratorios tipo moneda (ERM)" },
      { icon: "🎛️", text: "Control mediante PCA9685" },
      { icon: "📶", text: "Modulación PWM de 12 bits" },
    ],
  },
  {
    from: 0.17,
    eyebrow: "Percepción Activa",
    title: "Un pan & tilt que escanea el entorno.",
    description:
      "El sensor ToF VL53L0X está montado sobre un mecanismo pan & tilt. Realiza un barrido horizontal de 90° para generar un mapa polar del entorno y determinar la dirección y distancia de los obstáculos.",
    specs: [
      { icon: "📡", text: "Sensor ToF VL53L0X" },
      { icon: "🎯", text: "Medición precisa de distancia" },
      { icon: "🔄", text: "Mecanismo pan & tilt — barrido horizontal de 90°" },
    ],
  },
  {
    from: 0.25,
    eyebrow: "Estabilización Inercial",
    title: "Estabilización inercial del sistema de percepción.",
    description:
      "La unidad de medición inercial (IMU) MPU-6050 detecta la inclinación de la cabeza del usuario. Un controlador PID ajusta automáticamente el eje vertical del mecanismo pan & tilt para mantener el sensor alineado con el horizonte. Esto evita mediciones erróneas cuando el usuario inclina la cabeza hacia arriba o hacia abajo.",
    specs: [
      { icon: "🧭", text: "IMU MPU-6050" },
      { icon: "🎯", text: "Control PID en lazo cerrado" },
      { icon: "📐", text: "Compensación automática de inclinación" },
    ],
  },
  {
    from: 0.33,
    eyebrow: "Capa de Control",
    title: "Control en tiempo real con Arduino Nano.",
    description:
      "El Arduino Nano adquiere las mediciones del sensor ToF y de la IMU, ejecuta el controlador PID y genera las señales de control para el sistema háptico y el mecanismo pan & tilt. Su operación sin sistema operativo garantiza una respuesta determinística y de baja latencia.",
    specs: [
      { icon: "⚙️", text: "Bus I²C: PCA9685 + VL53L0X + MPU-6050" },
      { icon: "🔗", text: "Comunicación serial con Raspberry Pi 4" },
      { icon: "⏱️", text: "Procesamiento en tiempo real" },
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
    eyebrow: "Procesamiento de Visión",
    title: "Procesamiento local de visión por computadora.",
    description:
      "La Raspberry Pi 4 adquiere y procesa las imágenes de la cámara para detectar obstáculos y riesgos que no pueden identificarse únicamente con el sensor de distancia. El procesamiento se realiza localmente, sin dependencia de servicios en la nube.",
    specs: [
      { icon: "🧠", text: "Raspberry Pi 4 Model B (4 GB)" },
      { icon: "📷", text: "Raspberry Pi Camera Module" },
      { icon: "👁️", text: "Detección de obstáculos mediante visión por computadora" },
    ],
  },
  {
    from: 0.58,
    eyebrow: "Visión Computacional",
    title: "Clasificación de objetos relevantes para la navegación.",
    description:
      "YOLOv8 Tiny complementa al sensor ToF al identificar objetos como personas, bicicletas, motocicletas, vehículos, bancas y señales de tránsito.",
    specs: [
      { icon: "⚠️", text: "Personas · bicicletas · motocicletas · vehículos · bancas · señales" },
      { icon: "🎯", text: "YOLOv8 Tiny" },
      { icon: "🖥️", text: "Inferencia local en Raspberry Pi 4" },
    ],
  },
  {
    from: 0.66,
    eyebrow: "Entrenamiento del Modelo",
    title: "Ajuste fino del modelo sobre clases de interés.",
    description:
      "Se realizó un fine-tuning de YOLOv8 a partir del modelo preentrenado en COCO, conservando únicamente las clases relevantes para la navegación de personas con discapacidad visual.",
    specs: [
      { icon: "🏷️", text: "Fine-tuning de YOLOv8 sobre COCO" },
      { icon: "🎯", text: "Clases de interés para navegación" },
      { icon: "🧪", text: "Validación experimental en campo" },
    ],
  },
  {
    from: 0.74,
    eyebrow: "Fusión Sensorial",
    title: "Priorización de objetos detectados por visión.",
    description:
      "Cuando la cámara identifica un objeto relevante, el sistema interrumpe temporalmente el barrido y orienta el sensor hacia la región detectada para obtener una medición de distancia más precisa.",
    specs: [
      { icon: "🚨", text: "Priorización automática de objetos" },
      { icon: "🎯", text: "Reorientación del sensor" },
      { icon: "📏", text: "Medición puntual de distancia" },
    ],
  },

  {
    from: 0.91,
    eyebrow: "Ecosistema del Sistema",
    title: "Dispositivo portátil de asistencia para percepción del entorno.",
    description:
      "Integración de percepción háptica, visión por computadora y sensado de profundidad para apoyar la navegación de personas con discapacidad visual. Todo el procesamiento se realiza de forma local en el dispositivo.",
    specs: [
      { icon: "🔋", text: "Alimentación: Power bank 10 000 mAh" },
      { icon: "🌐", text: "Procesamiento 100% en el borde (Edge), sin dependencia de red" },
      { icon: "📡", text: "Sistema integrado de sensores y retroalimentación háptica" },
    ],
  },
]

export default function Home() {
  return (
    <main style={{ width: "100%", overflowX: "hidden" }}>
      {/* ── Hero ── */}
      <section className="h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
        <div className="relative w-full" style={{ height: "clamp(28vh, 40vw, 55vh)" }}>
          <ASCIIText
            text="HAPTIC VISION"
            enableWaves={true}
            asciiFontSize={7}
            textFontSize={180}
            textColor="#1e1b4b"
            planeBaseHeight={9}
          />
        </div>
        <div className="flex flex-col items-center gap-3 mt-4 px-6 text-center">
          {/* Line 1 — tagline */}
          <p className="text-gray-800 font-medium tracking-wide" style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.5rem)" }}>
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
          <p style={{ fontSize: "clamp(0.65rem, 2vw, 1rem)", letterSpacing: "0.12em" }} className="uppercase">
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

          <p className="mt-4 text-gray-400 text-xs animate-bounce">↓ scroll</p>
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
      <section className="bg-transparent" style={{ paddingBottom: "clamp(32px, 8vw, 96px)" }}>
        {/* Header */}
        <div className="flex flex-col items-center justify-center px-6" style={{ paddingTop: "clamp(32px, 6vw, 80px)", paddingBottom: "clamp(20px, 4vw, 40px)" }}>
          <span className="section-eyebrow">Hardware del Sistema</span>
          <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", fontWeight: 800, color: "#0f0f14", textAlign: "center", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Cada pieza importa.
          </h2>
          <p className="text-gray-400 mt-3" style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>Arrastra para explorar los componentes</p>
        </div>

        {/* Gallery — height adapts to viewport */}
        <div style={{ height: "clamp(320px, 55vw, 720px)", position: "relative", overflow: "hidden" }}>
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

      <div className="h-8 md:h-16" aria-hidden="true" />

      {/* ── Módulos del Sistema ── */}
      <section style={{ width: "100%", padding: "clamp(40px,8vw,96px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          {/* Header */}
          <div className="flex flex-col items-center text-center" style={{ marginBottom: "clamp(32px,6vw,64px)" }}>
            <span className="section-eyebrow">Arquitectura del Sistema</span>
            <h2 className="section-title">Tres módulos. Un solo propósito.</h2>
            <p className="section-subtitle">
              HapticVision AI está organizado en tres capas especializadas que
              trabajan en sinergia para traducir el entorno en percepción háptica.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full items-stretch">

          {/* Módulo 1: Sistemas de Control */}
          <div className="module-card">
            <span className="module-card__number">01</span>
            <div className="module-card__icon-wrap" style={{ background: "#eef2ff", fontSize: "1.6rem" }}>
              ⚙️
            </div>
            <p className="module-card__tag">Módulo 1</p>
            <h3 className="module-card__title">Sistemas de Control</h3>
            <p className="module-card__desc">
              Estabilización del sistema mediante control en lazo cerrado. El MPU-6050 (IMU) mide la inclinación de la cabeza y un controlador PID ajusta el eje vertical del pan & tilt para mantener la orientación estable del sensor.
            </p>
            <div className="module-card__divider" />
            <ul className="module-card__list">
              <li><span className="module-card__bullet" />IMU MPU-6050</li>
              <li><span className="module-card__bullet" />Control PID en tiempo real</li>
              <li><span className="module-card__bullet" />Arduino Nano + control de servos SG90</li>
            </ul>
          </div>

          {/* Módulo 2: Sistemas Inteligentes */}
          <div className="module-card module-card--featured">
            <span className="module-card__number" style={{ color: "#ede9fe" }}>02</span>
            <div className="module-card__icon-wrap" style={{ background: "#f5f3ff", fontSize: "1.6rem" }}>
              🧠
            </div>
            <p className="module-card__tag" style={{ color: "#7c3aed" }}>Módulo 2</p>
            <h3 className="module-card__title">Sistemas Inteligentes</h3>
            <p className="module-card__desc">
              Procesamiento de visión en Raspberry Pi 4. Modelo YOLOv8 Tiny ajustado mediante fine-tuning desde COCO para detección de objetos relevantes en navegación.
            </p>
            <div className="module-card__divider" />
            <ul className="module-card__list">
              <li><span className="module-card__bullet" style={{ background: "#f5f3ff" }}>&#8203;</span>Raspberry Pi 4 + YOLOv8 Tiny</li>
              <li><span className="module-card__bullet" style={{ background: "#f5f3ff" }}>&#8203;</span>Fine-tuning con dataset en Roboflow</li>
              <li><span className="module-card__bullet" style={{ background: "#f5f3ff" }}>&#8203;</span>Detección de personas, vehículos, bicicletas, motocicletas, bancas y señales de tránsito</li>
            </ul>
          </div>

          {/* Módulo 3: Sistemas Electrónicos */}
          <div className="module-card">
            <span className="module-card__number">03</span>
            <div className="module-card__icon-wrap" style={{ background: "#e0f2fe", fontSize: "1.6rem" }}>
              ⚡
            </div>
            <p className="module-card__tag" style={{ color: "#0ea5e9" }}>Módulo 3</p>
            <h3 className="module-card__title">Sistemas Electrónicos</h3>
            <p className="module-card__desc">
              Integración de sensores, actuadores y alimentación del sistema háptico portátil.
            </p>
            <div className="module-card__divider" />
            <ul className="module-card__list">
              <li><span className="module-card__bullet" style={{ background: "#e0f2fe" }}>&#8203;</span>ToF VL53L0X + IMU MPU-6050</li>
              <li><span className="module-card__bullet" style={{ background: "#e0f2fe" }}>&#8203;</span>4 motores vibratorios ERM</li>
              <li><span className="module-card__bullet" style={{ background: "#e0f2fe" }}>&#8203;</span>Driver ULN2003A + PCA9685</li>
              <li><span className="module-card__bullet" style={{ background: "#e0f2fe" }}>&#8203;</span>Power bank 10 000 mAh</li>
            </ul>
          </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECCIÓN: METODOLOGÍA DE INVESTIGACIÓN
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ width: "100%", padding: "clamp(40px,8vw,96px) clamp(16px,4vw,24px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center" style={{ marginBottom: "clamp(28px,5vw,64px)" }}>
            <span className="section-eyebrow">Metodología de Investigación</span>
            <h2 className="section-title">Del problema a la solución.</h2>
            <p className="section-subtitle">
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
                <div key={h.horizon} className="research-roadmap__lane" style={{ borderTopColor: h.color }}>
                  <div className="research-roadmap__header">
                    <span className="research-roadmap__tag" style={{ color: h.color }}>
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
