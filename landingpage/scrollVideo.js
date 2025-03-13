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

    // Mostrar el botón con una transición suave
    if (window.scrollY > 100 && footerTop > windowHeight - offset) {
      btnTop.style.opacity = "1";
      btnTop.style.pointerEvents = "auto"; // Permitir clics
    } else {
      btnTop.style.opacity = "0";
      btnTop.style.pointerEvents = "none"; // Evitar clics cuando se oculta
    }
  });

  // Scroll suave al hacer clic en el botón
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
  lenis.on("scroll", (e) => {
  });

  // ================================
  // ANIMACIÓN DE TEXTO CON SPLITTYPE
  // ================================
  const splitTypes = document.querySelectorAll(".split_text");
  splitTypes.forEach((charEl) => {
    const text = new SplitType(charEl, { types: "words, chars" });

    text.words.forEach((word) => {
      word.style.whiteSpace = "nowrap"; // Evita que una palabra se divida en líneas
      word.style.display = "inline-block"; // Mantiene la palabra unida en la animación
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
    console.log(text);
  });

  // ================================
  // SCROLL HORIZONTAL CON PAUSA EN CADA SECCIÓN
  // ================================
  let sections = gsap.utils.toArray(".scroll-section");

  const holdDuration = 20; // Tiempo en que el panel se queda estático
  const moveDuration = 10; // Duración de la transición al siguiente panel
  const factor = (holdDuration + moveDuration) / moveDuration;

  let horizontalTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      markers: false,
      end: () =>
        "+=" + document.querySelector(".scroll-inner").offsetWidth * factor,
    },
  });

  for (let i = 0; i < sections.length - 1; i++) {
    horizontalTimeline.to(".scroll-inner", {
      xPercent: -100 * i,
      duration: holdDuration,
      ease: "none",
    });
    horizontalTimeline.to(".scroll-inner", {
      xPercent: -100 * (i + 1),
      duration: moveDuration,
      ease: "none",
    });
  }
  // Mantener el último panel un momento
  
  horizontalTimeline.to(".scroll-inner", {
    xPercent: -100 * (sections.length - 1),
    duration: holdDuration+20,
    ease: "none",
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
          y: () => SCROLL_TEXT.offsetHeight - container.offsetHeight - 100,
          ease: "none",
        },
        "+=0.1"
      );
    });
  }

  // ================================
  // TRANSFORMACIÓN DE TEXTO EN LAS CARACTERÍSTICAS
  // ================================
  sections.forEach((section, index) => {
    let animatedEl = section.querySelector(".animated-text");
    if (!animatedEl) return;

    const initText = animatedEl.getAttribute("data-init");
    const changeText = animatedEl.getAttribute("data-change");

    // Inicialmente muestra el texto inicial, separándolo en <span>
    animatedEl.innerHTML = "";
    for (const char of initText) {
      const span = document.createElement("span");
      span.innerText = char;
      animatedEl.appendChild(span);
    }

    let startValue = "left center";
    let delayTime = index === 0 ? 0 : 0.5;

    ScrollTrigger.create({
      trigger: section,
      containerAnimation: horizontalTimeline,
      start: startValue,
      horizontal: true,
      markers: false,
      once: true, // Se dispara solo una vez
      onEnter: () => {
        console.log(`Trigger activado para: ${initText}`);
        gsap.delayedCall(delayTime, () => {
          runDiffAnimation(initText, changeText, animatedEl);
        });
      },
    });
  });

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
  // TRANSFORMACIÓN DE TEXTO (runDiffAnimation)
  // ================================
  function runDiffAnimation(initText, changeText, animatedEl) {
    // Fijamos posición, ancho y altura del contenedor para evitar cambios durante la animación
    animatedEl.style.position = "relative";
    animatedEl.style.width = animatedEl.offsetWidth + "px";
    animatedEl.style.height = animatedEl.offsetHeight + "px";
  
    animatedEl.innerHTML = "";
  
    function renderTextHorizontallyCentered(text, container, topValue = "0px") {
      const spans = [];
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.style.whiteSpace = "pre";
        span.innerText = text[i];
        span.style.position = "absolute";
        span.style.display = "inline-block";
        span.style.top = topValue;
        container.appendChild(span);
        spans.push(span);
      }
      let totalWidth = 0;
      spans.forEach((s) => {
        totalWidth += s.offsetWidth;
      });
      const containerWidth = container.offsetWidth;
      const startX = (containerWidth - totalWidth) / 2;
      let xOffset = 0;
      spans.forEach((s) => {
        s.style.left = startX + xOffset + "px";
        xOffset += s.offsetWidth;
      });
      return spans;
    }
  
    // 1. Renderizamos el texto inicial y guardamos las posiciones (FLIP "First")
    const initSpans = renderTextHorizontallyCentered(initText, animatedEl, "0px");
    const initialPositions = new Map();
    initSpans.forEach((span) => {
      initialPositions.set(span, {
        left: parseFloat(span.style.left),
        top: parseFloat(span.style.top),
      });
    });
  
    // Esperamos 1 segundo para visualizar el estado inicial antes de la transformación
    setTimeout(() => {
      // 2. Preparamos la transformación: determinamos letras "common" y "added"
      const freq = {};
      for (const ch of initText) {
        freq[ch] = (freq[ch] || 0) + 1;
      }
      const finalMapping = [];
      for (const ch of changeText) {
        if (freq[ch] && freq[ch] > 0) {
          finalMapping.push({ char: ch, type: "common" });
          freq[ch]--;
        } else {
          finalMapping.push({ char: ch, type: "added" });
        }
      }
      // Asociamos los spans del texto inicial a las letras "common"
      const remainingSpans = [...initSpans];
      const commonMapping = [];
      for (const item of finalMapping) {
        if (item.type === "common") {
          const idx = remainingSpans.findIndex((s) => s.innerText === item.char);
          if (idx !== -1) {
            commonMapping.push({ char: item.char, span: remainingSpans[idx] });
            remainingSpans.splice(idx, 1);
          }
        }
      }
      const removedSpans = remainingSpans;
  
      // 3. Borramos el contenido y renderizamos el texto final (FLIP "Last")
      animatedEl.innerHTML = "";
      const tempFinalSpans = [];
      for (const item of finalMapping) {
        let span;
        if (item.type === "common") {
          const mapIndex = commonMapping.findIndex((m) => m.char === item.char && !m.used);
          if (mapIndex !== -1) {
            span = commonMapping[mapIndex].span;
            commonMapping[mapIndex].used = true;
          } else {
            span = document.createElement("span");
          }
        } else {
          span = document.createElement("span");
        }
        span.style.whiteSpace = "pre";
        span.innerText = item.char;
        span.style.position = "absolute";
        span.style.display = "inline-block";
        span.style.top = "0px";
        animatedEl.appendChild(span);
        tempFinalSpans.push(span);
      }
      let totalWidthFinal = 0;
      tempFinalSpans.forEach((s) => {
        totalWidthFinal += s.offsetWidth;
      });
      const containerWidthFinal = animatedEl.offsetWidth;
      const startXFinal = (containerWidthFinal - totalWidthFinal) / 2;
      let xOffsetFinal = 0;
      tempFinalSpans.forEach((span, i) => {
        const item = finalMapping[i];
        span.style.left = startXFinal + xOffsetFinal + "px";
        xOffsetFinal += span.offsetWidth;
        if (item.type === "common") {
          span.className = "letter common-letter";
          span.style.color = animatedEl.getAttribute("data-original-color") || "#000";
        } else {
          span.className = "letter added-letter";
          span.style.color = animatedEl.getAttribute("data-added-color") || "#00f";
          gsap.set(span, { opacity: 0 });
        }
      });
      const finalSpans = tempFinalSpans;
  
      // 4. Animamos la transformación (FLIP)
      finalSpans.forEach((span) => {
        if (span.classList.contains("common-letter")) {
          const initPos = initialPositions.get(span);
          if (initPos) {
            const finalLeft = parseFloat(span.style.left);
            const finalTop = parseFloat(span.style.top);
            const dx = initPos.left - finalLeft;
            const dy = initPos.top - finalTop;
            gsap.set(span, { x: dx, y: dy });
            gsap.to(span, { x: 0, y: 0, duration: 0.5, ease: "power1.out" });
          }
        }
      });
      finalSpans.forEach((span) => {
        if (span.classList.contains("added-letter")) {
          gsap.to(span, { opacity: 1, duration: 0.5, ease: "power1.out" });
        }
      });
      removedSpans.forEach((span) => {
        gsap.to(span, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => {
            if (span.parentNode) span.parentNode.removeChild(span);
          },
        });
      });
    }, 1000);
  }
  
  

  
});
