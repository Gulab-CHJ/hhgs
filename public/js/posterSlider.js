let index = 0;

const slides = document.querySelectorAll(".poster-slide");

setInterval(() => {

    slides[index].classList.remove("active");

    index++;

    if(index >= slides.length){

        index = 0;

    }

    slides[index].classList.add("active");

},2000);