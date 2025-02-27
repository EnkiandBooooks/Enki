
document.addEventListener("DOMContentLoaded", () => {
  const gradient = new Gradient()

  // Call `initGradient` with the selector to your canvas
  gradient.initGradient('#canvas1')
  
  // Seleccionamos el elemento canvas
const canvas = document.getElementById('canvas1');

canvas.style.transition = 'background 5s, color 5s, transform 5s';
/*
const gradient1 = {
  '--gradient-color-1': '#525252',
  '--gradient-color-2': '#66576c', 
  '--gradient-color-3': '#d89df0',
  '--gradient-color-4': '#36dce7',
};



// Función para aplicar un gradiente al elemento
function applyGradient(element, gradient) {
  for (const [key, value] of Object.entries(gradient)) {
    element.style.setProperty(key, value);
  }
}

applyGradient(canvas, gradient1);
*/
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