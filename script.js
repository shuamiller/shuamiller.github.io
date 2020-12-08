/* let graphicsGallery = document.getElementById('gallery-image');
let body = document.getElementsByName('body');

function openGallery() {
    let overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
}

graphicsGallery.addEventListener('click', ) */

let slideIndex = 1;
showDivs(slideIndex);

function plusSlides(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    const slides = document.getElementsByClassName("slides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}