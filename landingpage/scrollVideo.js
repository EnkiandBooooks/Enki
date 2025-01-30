gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll('.split_text')

splitTypes.forEach((char,i)=> {

      const text = new SplitType(char, {types: 'chars'})

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
      })

      console.log(text)
})