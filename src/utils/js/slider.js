let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
export function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
export function currentSlide(n) {
  showSlides((slideIndex = n));
}

export function showSlides(n) {
  let i;
  let slides = document.querySelectorAll('[data-info = "slide"]');
  let dots = document.querySelectorAll('[data-info="slider__item"]');
  console.log(dots);
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i += 1) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i += 1) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += "active";
}
