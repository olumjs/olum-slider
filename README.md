# olum-slider

OlumSlider is a lightweight and flexible slider, written via vanilla js

<p align="center">
 <a href="https://www.npmjs.com/package/olum-slider" target="_blank"><img src="https://img.shields.io/npm/v/olum-slider" alt="npm"></a>
 <img src="https://img.shields.io/npm/dm/olum-slider" alt="npm">
 <img src="https://img.shields.io/npm/l/olum-slider" alt="npm">
</p>

## Documentation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Olum Slider</title>
  </head>

  <body>
    <div id="slider">
      <div class="slide">content 1</div>
      <div class="slide">content 2</div>
      <div class="slide">content 3</div>
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
