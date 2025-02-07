gsap.registerPlugin(ScrollTrigger);

// Animación de texto (sin cambios)
const splitTypes = document.querySelectorAll('.split_text');

splitTypes.forEach((char, i) => {
  const text = new SplitType(char, { types: 'chars' });

  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 60%',
      end: 'top 20%',
      scrub: 4,
      markers: false
    },
    opacity: 0.2,
    stagger: 0.1,
  });

  console.log(text);
});

// Scroll horizontal: aplicar a .scroll-horizontal-container en vez de .container
let sections = gsap.utils.toArray(".scroll-section");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1), // Animación horizontal para las secciones
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-horizontal-container", // Cambia aquí para que el scroll ocurra en el contenedor específico
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".scroll-inner").offsetWidth // Cambia aquí también
  }
});

gsap.to(".pContent", {
  yPercent: -50, // Se mueve hacia arriba al hacer scroll
  opacity: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".pSection",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true
  },
});

gsap.utils.toArray(".pImage").forEach((image) => {
  image.addEventListener("mouseenter", () => {
    let xMove = image.src.includes("MOCKUP_Phone") ? -30 : 30; 
    let yMove = -30;

    gsap.to(image, {
      x: xMove,
      y: yMove,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  image.addEventListener("mouseleave", () => {
    gsap.to(image, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});


ScrollTrigger.create({
  trigger: ".red",
  start: "top top",
  pin: true,
  pinSpacing: false
});


ScrollTrigger.create({
  trigger: "#orange",
  start: "top top",
  end: "bottom 150px",
  pin: "#orange-content"
});

ScrollTrigger.create({
  trigger: "#red",
  start: "top center",
  end: "+=200", // 200px past the start 
  pin: "#red-content"
});


const SCROLL_CONTAINER = '.scroll-container'
if (document.querySelector(SCROLL_CONTAINER)) {
  document.querySelectorAll(SCROLL_CONTAINER).forEach((container) => {
    const SCROLL_TEXT = container.querySelector("#scroll-text");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "25px",
        end: "+=300%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    })

    tl.to(SCROLL_TEXT, {
      y: () => SCROLL_TEXT.offsetHeight - container.offsetHeight - 100,
      ease: "none",
    }, "+=0.1")
  })
}

AOS.init({
  duration: 1200, // Duración de la animación en milisegundos
  easing: 'ease-in-out', // Tipo de suavizado de la animación
});

gsap.to("#animated-text", {
  duration: 2,
  text: "DISCOVER",
  ease: "power2.out",
  delay: 4,
  scrollTrigger: {
    trigger: "#animated-text", // Activa la animación cuando este elemento sea visible
    start: "top 80%", // Inicia cuando el elemento esté en el 80% de la pantalla
    toggleActions: "play none none none" // La animación solo se ejecuta una vez
  }
});

gsap.to(".car", {
  y: 20, // Mueve la imagen 10px arriba y abajo
  duration: 2, // Duración del movimiento
  repeat: -1, // Repetir infinito
  yoyo: true, // Hace que vuelva al punto original
  ease: "power1.inOut" // Suaviza la animación
});