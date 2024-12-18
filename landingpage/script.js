
document.addEventListener("DOMContentLoaded", () => {
  const gradient = new Gradient()

  // Call `initGradient` with the selector to your canvas
  gradient.initGradient('#canvas1')
  
  // Seleccionamos el elemento canvas
const canvas = document.getElementById('canvas1');

canvas.style.transition = 'background 5s, color 5s, transform 5s';

// Establecemos dos configuraciones de colores como objetos
const gradient1 = {
  '--gradient-color-1': '#1F9EA3',
  '--gradient-color-2': '#F8BD97', 
  '--gradient-color-3': '#9E5428', 
  '--gradient-color-4': '#3B0102',
};

const gradient2 = {
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


console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

/* ---------------------------------- */