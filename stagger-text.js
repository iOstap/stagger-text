  gsap.registerPlugin(CustomEase);

  CustomEase.create("customEase", "0.65, 0.05, 0, 1");

  let splitText;

  function runSplit() {
    splitText = new SplitType("[stagger-link]", {
      types: "words, chars"
    });
  }

  runSplit();

  let windowWidth = window.innerWidth;
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (windowWidth !== window.innerWidth) {
        windowWidth = window.innerWidth;
        splitText.revert();
        runSplit();
      }
    }, 250);
  });

  const staggerLinks = document.querySelectorAll("[stagger-link]");
  staggerLinks.forEach((link) => {
    const letters = link.querySelectorAll("[stagger-link-text] .char");
    link.addEventListener("mouseenter", function () {
      gsap.to(letters, {
        yPercent: -100,
        duration: 0.5,
        ease: "customEase", 
        stagger: { each: 0.01, from: "start" },
        overwrite: true
      });
    });
    link.addEventListener("mouseleave", function () {
      gsap.to(letters, {
        yPercent: 0,
        duration: 0.5,
        ease: "customEase",
        stagger: { each: 0.01, from: "end" }
      });
    });
  });
