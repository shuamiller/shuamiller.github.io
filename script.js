let navDiv = document.getElementById("nav-div")
let nav = document.getElementById("navbar");

navDiv.addEventListener("mouseenter", function() {
     nav.setAttribute("class", "hovered-nav");
})

navDiv.addEventListener("mouseleave", function() {
    nav.removeAttribute("class");
})