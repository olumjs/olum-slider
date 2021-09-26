function OlumSlider(settings) {
  var $this = this;

  $this.navigate = function (width) {
    $this.container.scrollTo({
      left: width,
      behavior: "smooth"
    });
    // reset dots active class
    var dots = $this.dotsContainer.getElementsByTagName("span");
    Array.from(dots).forEach(function (dot) {
      dot.className = "";
    });
    // add active class to current slide
    dots[$this.index].className = "active";
  }

  $this.nextSlide = function (btn) {
    btn.addEventListener("click", function () {
      if ($this.currentScroll < $this.totalWidth) {
        $this.index++;
        $this.currentScroll += $this.width;
        $this.navigate($this.currentScroll);
      }
    });
  }

  $this.prevSlide = function (btn) {
    btn.addEventListener("click", function () {
      if ($this.currentScroll > 0) {
        $this.index--;
        $this.currentScroll -= $this.width;
        $this.navigate($this.currentScroll);
      }
    });
  }

  $this.arrows = function () {
    var nextBtn = document.createElement("button");
    var prevBtn = document.createElement("button");
    nextBtn.innerHTML = settings.nextArrowIcon;
    prevBtn.innerHTML = settings.prevArrowIcon;
    nextBtn.className = "nextBtn";
    prevBtn.className = "prevBtn";
    nextBtn.type = "button";
    prevBtn.type = "button";

    $this.container.append(nextBtn);
    $this.container.append(prevBtn);

    $this.nextSlide(nextBtn);
    $this.prevSlide(prevBtn);
  }

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
    $this.container.append($this.dotsContainer);

    // listen to clicks
    $this.dotsContainer.addEventListener('click', function (e) {
      if (e.target.nodeName === "SPAN") {
        // reset dots active class
        var dots = $this.dotsContainer.getElementsByTagName("span");
        Array.from(dots).forEach(function (dot) {
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
  }

  if (settings && settings.container) {
    $this.container = settings.container;
    $this.currentScroll = 0;
    $this.index = 0;
    if (!settings.nextArrowIcon) settings.nextArrowIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5l7 7-7 7\" /></svg>";
    if (!settings.prevArrowIcon) settings.prevArrowIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 19l-7-7 7-7\" /></svg>";

    var slides = $this.container.getElementsByClassName("slide");
    $this.length = slides.length;
    if ($this.length) {
      $this.width = Math.round($this.container.scrollWidth / $this.length);
      $this.totalWidth = $this.width * ($this.length - 1);
      if (settings.hasOwnProperty("arrows") && settings.arrows === true) $this.arrows();
      if (settings.hasOwnProperty("dots") && settings.dots === true) $this.dots();
    } else {
      console.error("slides don't exist!");
    }
  } else {
    console.error("no slider container assigned!");
  }
}