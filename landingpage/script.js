
document.addEventListener("DOMContentLoaded", () => {
  const gradient = new Gradient()

  // Call `initGradient` with the selector to your canvas
  gradient.initGradient('#canvas1')
  
  // Seleccionamos el elemento canvas
const canvas = document.getElementById('canvas1');

canvas.style.transition = 'background 5s, color 5s, transform 5s';

// Establecemos dos configuraciones de colores como objetos
const gradient1 = {
  '--gradient-color-1': '#525252',
  '--gradient-color-2': '#66576c', 
  '--gradient-color-3': '#d89df0',
  '--gradient-color-4': '#36dce7',
};

const gradient2 = {
  // '--gradient-color-1': '#1F9EA3',
  // '--gradient-color-2': '#F8BD97', 
  // '--gradient-color-3': '#9E5428', 
  // '--gradient-color-4': '#3B0102',
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
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Evita el salto directo
    const target = document.querySelector(this.getAttribute('href')); // Selecciona la sección objetivo

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY; // Calcula la posición absoluta
      window.scrollTo({
        top: top,
        behavior: 'smooth' // Comportamiento de desplazamiento suave
      });
    }
  });
});