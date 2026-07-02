// function Hero(){

// return `

// <section class="hero">



// <div class="card">
//     <h2>Hero Card</h2>
//     <p>This is a simple hero card component.</p>
// </div>

// </section>

// `;

// }

// module.exports = Hero;

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