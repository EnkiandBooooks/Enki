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