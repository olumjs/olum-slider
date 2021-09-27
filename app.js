(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else if (typeof define === "function" && define.amd) define(factory);
  else root.OlumSlider = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function OlumSlider(options) {
    var $this = this;

    $this.navigate = function (width) {
      $this.slider.scrollTo({
        left: width,
        behavior: "smooth",
      });
      // reset dots active class
      if ($this.dotsContainer) {
        var dots = [].slice.call($this.dotsContainer.getElementsByTagName("span"));
        dots.forEach(function (dot) {
          dot.className = "";
        });
        // add active class to current slide
        dots[$this.index].className = "active";
      }
    };

    $this.nextSlide = function (btn) {
      btn.addEventListener("click", function () {
        if ($this.currentScroll < $this.totalWidth) {
          $this.index++;
          $this.currentScroll += $this.width;
          $this.navigate($this.currentScroll);
        }
      });
    };

    $this.prevSlide = function (btn) {
      btn.addEventListener("click", function () {
        if ($this.currentScroll > 0) {
          $this.index--;
          $this.currentScroll -= $this.width;
          $this.navigate($this.currentScroll);
        }
      });
    };

    $this.arrows = function () {
      var nextBtn = document.createElement("button");
      var prevBtn = document.createElement("button");
      nextBtn.innerHTML = options.nextArrowIcon;
      prevBtn.innerHTML = options.prevArrowIcon;
      nextBtn.className = "nextBtn";
      prevBtn.className = "prevBtn";
      nextBtn.type = "button";
      prevBtn.type = "button";

      options.container.append(nextBtn);
      options.container.append(prevBtn);

      $this.nextSlide(nextBtn);
      $this.prevSlide(prevBtn);
    };

    $this.dots = function () {
      // insert dots
      $this.dotsContainer = document.createElement("div");
      $this.dotsContainer.className = "dots";
      for (var i = 0; i < $this.length; i++) {
        var span = document.createElement("span");
        span.setAttribute("data-index", i);
        if (i === 0) span.className = "active";
        $this.dotsContainer.append(span);
      }
      options.container.append($this.dotsContainer);

      // listen to clicks
      $this.dotsContainer.addEventListener("click", function (e) {
        if (e.target.nodeName === "SPAN") {
          // reset dots active class
          var dots = [].slice.call($this.dotsContainer.getElementsByTagName("span"));
          dots.forEach(function (dot) {
            dot.className = "";
          });
          // add active class to current slide
          e.target.className = "active";
          // navigate
          $this.index = +e.target.getAttribute("data-index");
          $this.currentScroll = $this.index * $this.width;
          $this.navigate($this.currentScroll);
        }
      });
    };

    $this.auto = function () {
      var interval = setInterval(function () {
        if ($this.currentScroll < $this.totalWidth) {
          $this.index++;
          $this.currentScroll += $this.width;
          $this.navigate($this.currentScroll);
        } else {
          clearInterval(interval);
        }
      }, options.interval);
    };

    $this.style = function () {
      var style = document.createElement("style");
      var className = options.container.className;
      var id = options.container.id;
      var selector = id ? "#" + id : "." + className;
      style.innerHTML = "\n    "
        .concat(selector, " {\n      position: relative;\n      width: 100%;\n      height: 500px;\n    }\n    \n    ")
        .concat(
          selector,
          " .slides {\n      width: 100%;\n      height: 100%;\n      white-space: nowrap;\n      overflow: hidden;\n    }\n    \n    "
        )
        .concat(selector, " .slides .slide {\n      width: 100%;\n      height: 100%;\n      display: inline-block;\n    }\n    \n    ")
        .concat(selector, " .nextBtn,\n    ")
        .concat(
          selector,
          " .prevBtn {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      background-color: transparent;\n      border: none;\n      cursor: pointer;\n    }\n    \n    "
        )
        .concat(selector, " .nextBtn svg,\n    ")
        .concat(
          selector,
          " .prevBtn svg {\n      pointer-events: none;\n      width: 20px;\n      position: relative;\n      top: 2px;\n      fill: white;\n    }\n    \n    "
        )
        .concat(selector, " .nextBtn {\n      right: 0;\n    }\n    \n    ")
        .concat(selector, " .prevBtn {\n      left: 0;\n    }\n    \n    ")
        .concat(
          selector,
          " .dots {\n      position: absolute;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      margin: 0 auto;\n      width: -webkit-fit-content;\n      width: -moz-fit-content;\n      width: fit-content;\n    }\n    \n    "
        )
        .concat(
          selector,
          " .dots span {\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background-color: rgba(255, 255, 255, 0.5);\n      display: inline-block;\n      cursor: pointer;\n      margin: 2.5px;\n    }\n    \n    "
        )
        .concat(selector, " .dots span.active {\n      background-color: white;\n    }\n    ");
      document.body.append(style);
    };

    if (options && options.container) {
      $this.style(); // inject related style | must be run 1st to get slides info properly
      $this.currentScroll = 0;
      $this.index = 0;

      // default options
      if (!options.nextArrowIcon)
        options.nextArrowIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>';
      if (!options.prevArrowIcon)
        options.prevArrowIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>';
      if (!options.interval) options.interval = 3000;

      var slides = [].slice.call(options.container.getElementsByClassName("slide"));
      $this.length = slides.length;

      if ($this.length) {
        // re-structure elements (container > .slides > .slide)
        var slidesContainer = document.createElement("div");
        slidesContainer.className = "slides";
        slides.forEach(function (slide) {
          slidesContainer.append(slide);
        });
        options.container.append(slidesContainer);

        // calc width, total width & initialize other features
        $this.slider = slidesContainer;
        $this.width = Math.round($this.slider.scrollWidth / $this.length);
        $this.totalWidth = $this.width * ($this.length - 1);
        if (options.hasOwnProperty("arrows") && options.arrows === true) $this.arrows();
        if (options.hasOwnProperty("dots") && options.dots === true) $this.dots();
        if (options.hasOwnProperty("auto") && options.auto === true) $this.auto();
      } else {
        console.error("slides don't exist!");
      }
    } else {
      console.error("no slider container assigned!");
    }
  }

  return OlumSlider;
});
