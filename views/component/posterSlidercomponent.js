function PosterSlider(posters) {

    let html = "";

    posters.forEach((poster) => {

        html += `
        <div class="poster-slide">
            <img src="${poster.image}" alt="${poster.title}">
        </div>
        `;

    });

    return `
    <section class="poster-slider">
        ${html}
    </section>
    `;
}

module.exports = PosterSlider;