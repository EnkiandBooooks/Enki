document.addEventListener("DOMContentLoaded", function () {
  // ================================
  // Botón "Volver Arriba"
  // ================================
  const btnTop = document.getElementById("btnTop");
  const footer = document.getElementById("footer-nav");
  const offset = 20;

  window.addEventListener("scroll", function () {
    let footerTop = footer.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    if (window.scrollY > 100 && footerTop > windowHeight - offset) {
      btnTop.style.opacity = "1";
      btnTop.style.pointerEvents = "auto";
    } else {
      btnTop.style.opacity = "0";
      btnTop.style.pointerEvents = "none";
    }
  });

  btnTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================================
  // REGISTRO DE PLUGINS Y CONFIGURACIONES INICIALES
  // ================================
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    autoRaf: true,
  });
  lenis.on("scroll", (e) => {});

  // ================================
  // ANIMACIÓN DE TEXTO CON SPLITTYPE
  // ================================
  const splitTypes = document.querySelectorAll(".split_text");
  splitTypes.forEach((charEl) => {
    const text = new SplitType(charEl, { types: "words, chars" });
    text.words.forEach((word) => {
      word.style.whiteSpace = "nowrap";
      word.style.display = "inline-block";
    });
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: charEl,
        start: "top 60%",
        end: "top 20%",
        scrub: 4,
        markers: false,
      },
      opacity: 0.2,
      stagger: 0.1,
    });
  });

  // ================================
  // SCROLL HORIZONTAL CON PAUSA EN CADA SECCIÓN
  // ================================
  let sections = gsap.utils.toArray(".scroll-section");

  const holdDuration = 30; // Tiempo de pausa en cada panel
  const moveDuration = 10; // Duración del movimiento entre paneles

  let horizontalTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      markers: false,
      end: () =>
        "+=" + document.querySelector(".scroll-inner").offsetWidth * 2,
    },
  });

  // Primer panel: se mantiene en su posición por holdDuration
  horizontalTimeline.to(".scroll-inner", {
    xPercent: 0,
    duration: 30,
    ease: "none"
  });

  for (let i = 0; i < sections.length - 1; i++) {
    // Movimiento hacia el siguiente panel
    horizontalTimeline.to(".scroll-inner", {
      xPercent: -100 * (i + 1),
      duration: 10,
      ease: "none"
    });
    // Pausa en el panel actual
    horizontalTimeline.to(".scroll-inner", {
      xPercent: -100 * (i + 1),
      duration: 30,
      ease: "none"
    });
  }

  // Opcional: mantener el último panel un momento
  horizontalTimeline.to(".scroll-inner", {
    xPercent: -100 * (sections.length - 1),
    duration: 30,
    ease: "none"
  });

  // ================================
  // ANIMACIONES EN SECCIONES VERTICALES (Parallax y otros)
  // ================================
  gsap.to(".pContent", {
    yPercent: -50,
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".pSection",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
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
        ease: "power2.out",
      });
    });
    image.addEventListener("mouseleave", () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  ScrollTrigger.create({
    trigger: ".red",
    start: "top top",
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: "#orange",
    start: "top top",
    end: "bottom 150px",
    pin: "#orange-content",
  });

  ScrollTrigger.create({
    trigger: "#red",
    start: "top center",
    end: "+=200",
    pin: "#red-content",
  });

  const SCROLL_CONTAINER = ".scroll-container";
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
          invalidateOnRefresh: true,
        },
      });
      tl.to(
        SCROLL_TEXT,
        {
          y: () =>
            SCROLL_TEXT.offsetHeight - container.offsetHeight - 100,
          ease: "none",
        },
        "+=0.1"
      );
    });
  }



  // ================================
  // AOS & OTRAS ANIMACIONES CON GSAP
  // ================================
  AOS.init({
    duration: 1200,
    easing: "ease-in-out",
  });

  gsap.to("#animated-text", {
    duration: 2,
    text: "DISCOVER",
    ease: "power2.out",
    delay: 4,
    scrollTrigger: {
      trigger: "#animated-text",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.to(".car", {
    y: 10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  // ================================
  // FUNCIÓN: runDiffAnimation
  // Realiza la animación de transformación de texto (FLIP/diff)
  // ================================
  
});