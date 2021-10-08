# olum-slider

OlumSlider is a lightweight and flexible slider, written via vanilla js

<p align="center">
 <a href="https://www.npmjs.com/package/olum-slider" target="_blank"><img src="https://img.shields.io/npm/v/olum-slider" alt="npm"></a>
 <img src="https://img.shields.io/npm/dm/olum-slider" alt="npm">
 <img src="https://img.shields.io/npm/l/olum-slider" alt="npm">
</p>

# Documentation

### CDN
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Olum Slider</title>
    <style>
      #slider {
        height: 500px;
      }
      #slider .slide {
        line-height: 500px;
        text-align: center;
        color: white;
        font-size: 30px;
      }
      #slider .slide:nth-last-of-type(1) {
        background-color: #FFC93C;
      }
      #slider .slide:nth-last-of-type(2) {
        background-color: #364F6B;
      }
      #slider .slide:nth-last-of-type(3) {
        background-color: #E84545;
      }
    </style>
  </head>

  <body>
    <div id="slider">
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
    </div>

    <script src="https://unpkg.com/olum-slider@latest/dist/olum-slider.min.js"></script>
    <script>
      new OlumSlider({
        container: document.getElementById("slider"),
        arrows: true,
        nextArrowIcon: "", // accepts html & text
        prevArrowIcon: "", // accepts html & text
        dots: true,
        auto: true,
        interval: 3000,
      });
    </script>
  </body>
</html>
```

### ES6 Module
```javascript
import OlumSlider from "olum-slider";

new OlumSlider({
  container: document.getElementById("slider"),
  arrows: true,
  nextArrowIcon: "", // accepts html & text
  prevArrowIcon: "", // accepts html & text
  dots: true,
  auto: true,
  interval: 3000,
});
```