const horizontalSections = gsap.utils.toArray("section.horizontal");

horizontalSections.forEach(function (sec, i) {
  var thisPinWrap = sec.querySelector(".pin-wrap");
  var thisAnimWrap = thisPinWrap.querySelector(".animation-wrap");

  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

  gsap.fromTo(
    thisAnimWrap,
    {
      x: () => (thisAnimWrap.classList.contains("to-right") ? 0 : getToValue())
    },
    {
      x: () => (thisAnimWrap.classList.contains("to-right") ? getToValue() : 0),
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
        pin: thisPinWrap,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        scrub: true,
        // markers: true,
      }
    }
  );
});

// var elephant = document.querySelector(".elephant");
// var elephant_tooltip = document.querySelector("#elephant-tooltip");
// elephant.addEventListener("mouseenter", function () {
//   elephant_tooltip.style.visibility = "visible";
// });
// elephant.addEventListener("mouseleave", function () {
//   elephant_tooltip.style.visibility = "hidden";
// });

var animal_containers = document.querySelectorAll(".animal-container");
animal_containers.forEach(function (animal_container) {
  // Get first child of animal_container
  let tooltip = animal_container.firstElementChild;
  let animal = tooltip.nextElementSibling;
  animal.addEventListener("mouseenter", function () {
    tooltip.style.visibility = "visible";
  });
  animal.addEventListener("mouseleave", function () {
    tooltip.style.visibility = "hidden";
  });
});


class ContinentHoverAware {
  static init (selector) {
      return new ContinentHoverAware(selector);
  }

  constructor (selector) {
      this.continents = document.querySelectorAll(selector);
      
      this.continents.forEach(continent => {
          this._loadEvents(continent);
      });
  }

  _loadEvents (el) {
      el.addEventListener('mouseenter', (event) => {
          const direction = this._getDir(event, el);
          this._animateLayer(event, el, direction);
      });

      el.addEventListener('mouseleave', (event) => {
          const direction = this._getDir(event, el);
          this._animateLayer(event, el, direction);
      });
  }

  _animateLayer (event, el, direction) {
      const hoverLayer = el.querySelector('.continent__hover-layer');  // Adjusted the class to match a hypothetical CSS class
      const speed = 0.3;

      function tween (topVal, rightVal) {
          if (event.type === 'mouseenter') {
              TweenLite.fromTo(hoverLayer, speed,
                  {
                      top: topVal,
                      right: rightVal
                  },
                  {
                      top: 0,
                      right: 0
                  }
              );
          } else {
              TweenLite.to(hoverLayer, speed,
                  {
                      top: topVal,
                      right: rightVal
                  }
              );
          }
      }

      switch (direction) {
          case 0:
              tween('-100%', 0);
              break;
          case 1:
              tween(0, '-100%');
              break;
          case 2:
              tween('100%', 0);
              break;
          case 3:
              tween(0, '100%');
              break;
      }
  }

  _getDir (event, el) {
      const coordinates = { x: event.pageX, y: event.pageY };
      const w = el.getBoundingClientRect().width;
      const h = el.getBoundingClientRect().height;

      const newX = (coordinates.x - el.getBoundingClientRect().left - (w / 2)) * (w > h ? (h / w) : 1);
      const newY = (coordinates.y - el.getBoundingClientRect().top - (h / 2)) * (h > w ? (w / h) : 1);

      let direction = Math.round((((Math.atan2(newY, newX) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
      return direction;
  }
}

// Initialize for the SVG paths representing the continents
ContinentHoverAware.init('#observablehq-viewof-continent-8b4a32ff path');


