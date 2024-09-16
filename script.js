function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });




  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

function swiper() {
  let swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
  });
}

function horinzontalScroll() {
  gsap.to(".technology", {
    scrollTrigger: {
      trigger: ".technologys",
      start: "top top",
      end: "bottom -200%",
      scrub: 1,
    },
    xPercent: -210,
    ease: Power4
  })
}

function mediaHover() {
  Shery.hoverWithMediaCircle(".p3Left h1", { images: ["./images/profile.jpg", "./images/ai1.jpg", "./images/ai2.jpg", "./images/ai4.jpg"] })
}

// document.querySelectorAll(".mFollow")
//   .forEach(function (e) {
//   e.addEventListener("mouseenter",)
//     function mouseFollower() {
//       Shery.mouseFollower(".home", {
//         //   //Parameters are optional.
//         skew: true,
//         ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//         duration: 0.3,
//       });
//     }
//   })

function swiper2() {
  let swiper = new Swiper(".mySwiper2", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}


function mouseFollower() {
  Shery.mouseFollower(".home", {
    //   //Parameters are optional.
    skew: false,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.3,
  });
}

Shery.makeMagnet(".magnet")
mediaHover();

mouseFollower();
locomotive();
// swiper();
// horinzontalScroll();
swiper2();