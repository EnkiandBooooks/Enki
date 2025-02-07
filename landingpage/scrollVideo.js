// ================================
// REGISTRO DE PLUGINS Y CONFIGURACIONES INICIALES
// ================================
gsap.registerPlugin(ScrollTrigger);

// ================================
// ANIMACIÓN DE TEXTO CON SPLITTYPE (Código Original)
// ================================
const splitTypes = document.querySelectorAll('.split_text');
splitTypes.forEach(charEl => {
  const text = new SplitType(charEl, { types: 'chars' });
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: charEl,
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

// ================================
// SCROLL HORIZONTAL CON PAUSA EN CADA SECCIÓN
// ================================
// Se asume que cada sección se encuentra en un elemento con clase ".scroll-section"
// y que todas están contenidas en un elemento con clase ".scroll-inner" dentro de
// un contenedor con clase ".scroll-horizontal-container".
let sections = gsap.utils.toArray(".scroll-section");

// Definimos las duraciones para el "hold" (pausa) y el "move" (transición)
const holdDuration = 1;  // Tiempo en el que el panel se queda estático
const moveDuration = 1;    // Tiempo de transición al siguiente panel

// Calculamos un factor para aumentar el scroll total.
// El scroll total original se basaba en el ancho del contenedor interno, pero ahora
// se extiende en proporción a la suma de las duraciones de hold y move.
const factor = (holdDuration + moveDuration) / moveDuration; // Por ejemplo, 1.5 si hold=0.5 y move=1

// Creamos un timeline que animará el contenedor ".scroll-inner".
let horizontalTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-horizontal-container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    markers: { startColor: "blue", endColor: "blue", indent: 2 },
    // El "end" se ajusta multiplicando el ancho original por el factor calculado
    end: () => "+=" + document.querySelector(".scroll-inner").offsetWidth * factor
  }
});

// Ahora animamos ".scroll-inner" en segmentos: en cada ciclo se hace una pausa y luego se
// realiza la transición al siguiente panel.
for (let i = 0; i < sections.length - 1; i++) {
  // Mantiene el panel i durante "holdDuration"
  horizontalTimeline.to(".scroll-inner", {
    xPercent: -100 * i,
    duration: holdDuration,
    ease: "none"
  });
  // Transición del panel i al panel i+1 durante "moveDuration"
  horizontalTimeline.to(".scroll-inner", {
    xPercent: -100 * (i + 1),
    duration: moveDuration,
    ease: "none"
  });
}
// Opcionalmente, se puede mantener el último panel por un momento:
horizontalTimeline.to(".scroll-inner", {
  xPercent: -100 * (sections.length - 1),
  duration: holdDuration,
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

gsap.set("#section2", { opacity: 0, x: -500 });
gsap.to("#section2", {
  opacity: 1,
  x: 0,
  duration: 3,
  ease: "sine",
  scrollTrigger: {
    trigger: ".text_animation",
    start: "top 80%",
    end: "top 20%",
    toggleActions: "play none none none",
  }
});

// ================================
// EJEMPLOS ADICIONALES DE PINNING
// ================================
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

// ================================
// TRANSFORMACIÓN DE TEXTO EN LAS CARACTERÍSTICAS
// ================================
// Se espera que cada sección de característica (dentro de ".scroll-section") tenga un título:
// <h1 class="animated-text" data-init="Característica X" data-change="Innovación X">Característica X</h1>
sections.forEach((section, index) => {
  let animatedEl = section.querySelector('.animated-text');
  if (!animatedEl) return;

  // Obtiene los textos inicial y final desde los atributos
  const initText = animatedEl.getAttribute('data-init');
  const changeText = animatedEl.getAttribute('data-change');
  
  // Inicialmente muestra el texto inicial, separándolo en <span> para cada carácter
  animatedEl.innerHTML = "";
  for (const char of initText) {
    const span = document.createElement("span");
    span.innerText = char;
    animatedEl.appendChild(span);
  }
  
  // Para este ejemplo, usamos el mismo parámetro de inicio y delay para cada sección.
  // Puedes ajustar estos valores si deseas que el primero se comporte distinto.
  let startValue = "left center";
  let delayTime  = 1; // 1 segundo de retraso antes de ejecutar la transformación
  
  // Creamos un ScrollTrigger que usa containerAnimation para "escuchar" el progreso del timeline horizontal.
  ScrollTrigger.create({
    trigger: section,
    containerAnimation: horizontalTimeline,
    start: startValue,
    horizontal: true,
    markers: { startColor: "green", endColor: "red", indent: 5 },
    onEnter: () => {
      console.log(`Trigger activado para: ${initText}`);
      gsap.delayedCall(delayTime, () => {
        runDiffAnimation(initText, changeText, animatedEl);
      });
    },
    once: true
  });
});

/**
 * Función que realiza una transformación "diff" entre el texto inicial y final.
 * Reconstruye el contenido del elemento y anima cada carácter:
 *  - El prefijo "-" indica que la letra se elimina (se desvanece).
 *  - El prefijo "+" indica que la letra se agrega (aparece con animación).
 *
 * @param {string} initText - Texto inicial.
 * @param {string} changeText - Texto final.
 * @param {HTMLElement} animatedEl - Elemento donde se realiza la animación.
 */
function runDiffAnimation(initText, changeText, animatedEl) {
  let chunks = [`-${initText}`, `+${changeText}`];

  // Procesa los chunks para detectar coincidencias y separar letras que se mantienen
  for (let i = 0; i < chunks.length - 1; i++) {
    let text1 = chunks[i],
        text2 = chunks[i + 1];

    if (text1[0] === "-" && text2[0] === "+") {
      let original1 = text1.slice(1),
          original2 = text2.slice(1),
          longestMatch = "",
          lm_t1idx = 0,
          lm_t2idx = 0;
      
      for (let j = 0; j < original1.length; j++) {
        for (let k = j + longestMatch.length + 1; k <= original1.length; k++) {
          const substring = original1.slice(j, k);
          const idx = original2.indexOf(substring);
          if (idx !== -1 && substring.length > longestMatch.length) {
            longestMatch = substring;
            lm_t1idx = j;
            lm_t2idx = idx;
          }
        }
      }
      
      if (longestMatch.length > 0) {
        const newChunks = [];
        newChunks.push(`-${original1.slice(0, lm_t1idx)}`);
        newChunks.push(`+${original2.slice(0, lm_t2idx)}`);
        newChunks.push(`.${longestMatch}`);
        newChunks.push(`-${original1.slice(lm_t1idx + longestMatch.length)}`);
        newChunks.push(`+${original2.slice(lm_t2idx + longestMatch.length)}`);
        chunks.splice(i, 2, ...newChunks);
        i = -1;
      } else if (original1.length > 1 && original2.length > 1) {
        const minLen = Math.min(original1.length, original2.length);
        const newChunks = [];
        for (let j = 0; j < minLen; j++) {
          newChunks.push(`-${original1[j]}`);
          newChunks.push(`+${original2[j]}`);
        }
        if (original1.length > minLen) {
          newChunks.push(`-${original1.slice(minLen)}`);
        } else if (original2.length > minLen) {
          newChunks.push(`+${original2.slice(minLen)}`);
        }
        chunks.splice(i, 2, ...newChunks);
        i = -1;
      }
    }
  }
  
  let totalLength = chunks.reduce((acc, chunk) => {
    return (chunk[0] === ".") ? acc : acc + (chunk.length - 1);
  }, 0);
  let totalProcessed = 0;
  
  animatedEl.innerHTML = "";
  
  chunks.forEach(chunk => {
    const marker = chunk[0];
    const textContent = chunk.slice(1);
    for (let j = 0; j < textContent.length; j++) {
      const span = document.createElement("span");
      span.innerText = textContent[j];
      animatedEl.appendChild(span);
      
      if (marker === "-") {
        gsap.fromTo(span, 
          { fontSize: "6vh", opacity: 1 },
          { fontSize: "0vh", opacity: 0, duration: 0.4, delay: 0.2 * totalProcessed / totalLength, ease: "power1.out" }
        );
        totalProcessed++;
      } else if (marker === "+") {
        gsap.fromTo(span,
          { fontSize: "0vh", opacity: 0 },
          { fontSize: "6vh", opacity: 1, duration: 0.4, delay: 0.2 * totalProcessed / totalLength, ease: "power1.out" }
        );
        totalProcessed++;
      } else {
        gsap.set(span, { fontSize: "6vh", opacity: 1 });
      }
    }
  });
}
