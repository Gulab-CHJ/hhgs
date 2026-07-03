function Hero(cards){

    return `
    <section class="hero">

        ${cards.map(card => `
            <div class="card">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
            </div>
        `).join("")}

    </section>
    `;
}

module.exports = Hero;