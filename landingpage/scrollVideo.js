window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Configuración de SplitType
  function setupSplitText() {
    document.querySelectorAll('.split_text').forEach((char) => {
      // 🔥 Prevenir reflow forzando el tamaño inicial del contenedor
      char.style.display = "inline-block";
      char.style.whiteSpace = "nowrap"; // Evita saltos antes de dividir
      char.style.wordBreak = "keep-all";

      // 🛑 Borrar instancias previas de SplitType (si recarga)
      if (char.dataset.split) {
        char.innerHTML = char.dataset.originalText;
      } else {
        char.dataset.originalText = char.innerHTML; // Guardar texto original
      }

      // ⚡ Aplicar SplitType
      const text = new SplitType(char, { types: 'chars' });

      // ✅ Restaurar estilos normales después de dividir
      char.style.whiteSpace = "normal";
      char.style.wordBreak = "break-word";
      char.style.display = "block"; // Prevenir glitches visuales

      // ✅ Animación con GSAP
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

      // ⚡ Forzar actualización visual
      ScrollTrigger.refresh();
    });
  }

  setupSplitText();

  // 🛠 REFRESCAR TRIGGERS DESPUÉS DE UN PEQUEÑO RETRASO
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);

  // ✅ Scroll horizontal
  let sections = gsap.utils.toArray(".scroll-section");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".scroll-horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".scroll-inner").offsetWidth
    }
  });

  // ✅ Animación de contenido en secciones
  gsap.to(".pContent", {
    yPercent: -50,
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
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".pSection",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
  });

  // ✅ Pines de ScrollTrigger
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
    end: "+=200",
    pin: "#red-content"
  });

  // ✅ Scroll en el contenedor de texto largo
  const SCROLL_CONTAINER = '.scroll-container';
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
      });

      tl.to(SCROLL_TEXT, {
        y: () => SCROLL_TEXT.offsetHeight - container.offsetHeight - 100,
        ease: "none",
      }, "+=0.1");
    });
  }
});