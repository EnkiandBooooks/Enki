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

gsap.to(".pImage", {
  yPercent: 30, // Imagen se mueve en sentido contrario para efecto de profundidad
  ease: "none",
  scrollTrigger: {
    trigger: ".pSection",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
});


// Animación de entrada para el título "Hola" cuando aparece en la vista
gsap.set("#section2", { opacity: 0, x: -500 }); // Inicializa fuera de la vista

gsap.to("#section2", {
  opacity: 1,
  x: 0,  // Hace que entre desde la izquierda
  duration: 3,
  ease: "sine",
  scrollTrigger: {
    trigger: ".text_animation", // Se activa cuando el elemento con la clase .hola entra en la vista
    start: "top 80%",  // Empieza la animación cuando el top de .hola esté al 80% de la ventana
    end: "top 20%",    // Termina la animación cuando el top de .hola llegue al 20% de la ventana
    toggleActions: "play none none none",  // Activar animación una sola vez
  }
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