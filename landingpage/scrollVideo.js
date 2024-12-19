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
/*TEXT ANIMATION*/

const text = document.querySelector('.split_text');

// Escuchar cuando el video termine
video.addEventListener('ended', () => {
  // Cuando el video termine, agregar la clase que hace visible el texto sobre el gradiente
  text.classList.add('visible-text');
});

// Escuchar el scroll para asegurar que el texto aparece solo al final del video
window.addEventListener('scroll', () => {
  // Si el video ha terminado y el scroll ha llegado al final del video
  const videoEnd = video.getBoundingClientRect().top + video.offsetHeight <= 0;
  
  // Mostrar el texto si hemos llegado al final del video
  if (videoEnd) {
    text.classList.add('visible-text');
  } else {
    text.classList.remove('visible-text');  // Ocultar el texto si no hemos llegado al final
  }
});



const splitTypes = document.querySelectorAll('.split_text')

splitTypes.forEach((char,i)=> {

      const text = new SplitType(char, {types: 'chars'})

      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: char,
          start: 'top 70%',
          end: 'top 30%',
          scrub: true,
          markers: false
        },
        opacity: 0.2,
        stagger: 0.1,
      })

      console.log(text)
})