
document.addEventListener("DOMContentLoaded", () => {
  const gradient = new Gradient()

  // Call `initGradient` with the selector to your canvas
  gradient.initGradient('#canvas1')
  
  // Seleccionamos el elemento canvas
const canvas = document.getElementById('canvas1');

// Establecemos dos configuraciones de colores como objetos
const gradient1 = {
  '--gradient-color-1': '#1F9EA3', // Morado oscuro
  '--gradient-color-2': '#F8BD97', // Morado claro
  '--gradient-color-3': '#9E5428', // Morado intermedio
  '--gradient-color-4': '#3B0102', // Morado muy oscuro
};

const gradient2 = {
  '--gradient-color-1': '#525252', // Verde oscuro
  '--gradient-color-2': '#66576c', // Verde claro
  '--gradient-color-3': '#d89df0', // Verde intermedio
  '--gradient-color-4': '#36dce7', // Verde muy oscuro
};

// Función para aplicar un gradiente al elemento
function applyGradient(element, gradient) {
  for (const [key, value] of Object.entries(gradient)) {
    element.style.setProperty(key, value);
  }
}

// Variable para alternar entre los gradientes
let toggle = true;

// Temporizador para cambiar los gradientes cada 5 segundos
setInterval(() => {
  toggle = !toggle;
  console.log("Cambio");
  applyGradient(canvas, toggle ? gradient1 : gradient2);
  gradient.refresh();
}, 5000);

// Aplicamos inicialmente el primer gradiente
applyGradient(canvas, gradient1);

  
  /*
  const frameContainer = document.createElement("div");
  frameContainer.id = "animation-container";
  document.body.appendChild(frameContainer);

  const totalFrames = 50; // Número total de frames
  const scrollSpeed = 100; // Velocidad de reproducción, más alto = más rápido
  const frames = [];

  // Carga dinámica de los SVGs
  for (let i = 1; i <= totalFrames; i++) {
    const img = document.createElement("img");
    img.src = `frames/frame (${i}).png`;
    img.classList.add("frame");
    img.style.opacity = 0; // Ocultamos los frames inicialmente
    frameContainer.appendChild(img);
    frames.push(img);
  }

  // Inicializa GSAP
  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#animation-container",
      start: "top top",
      end: `+=${(totalFrames / scrollSpeed) * 100}%`, // Ajusta la longitud del scroll según la velocidad
      scrub: 1,
      pin: true,
    },
  });

  frames.forEach((frame, index) => {
    const frameStart = (index * scrollSpeed) / totalFrames;
    const frameEnd = ((index + 1) * scrollSpeed) / totalFrames;

    timeline.to(frame, { opacity: 1, duration: 0, ease: "none" }, frameStart);
    timeline.to(frame, { opacity: 0, duration: 0, ease: "none" }, frameEnd);
  });*/
});
