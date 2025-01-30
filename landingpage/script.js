
document.addEventListener("DOMContentLoaded", () => {
  const gradient = new Gradient()

  // Call `initGradient` with the selector to your canvas
  gradient.initGradient('#canvas1')
  
  // Seleccionamos el elemento canvas
const canvas = document.getElementById('canvas1');

canvas.style.transition = 'background 5s, color 5s, transform 5s';

// Establecemos dos configuraciones de colores como objetos
const gradient1 = {
  '--gradient-color-1': '#AB02FF',
  '--gradient-color-2': '#7627D6', 
  '--gradient-color-3': '#393939', 
  '--gradient-color-4': '#450473',
};

const gradient2 = {
  '--gradient-color-1': '#AB02FF',
  '--gradient-color-2': '#7627D6', 
  '--gradient-color-3': '#393939', 
  '--gradient-color-4': '#450473',
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