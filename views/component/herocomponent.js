// function Hero(cards){

//     return `
//     <section class="hero">

//         ${cards.map(card => `
//             <div class="card">

//                 <h2>${card.title}</h2>
//                 <p>${card.description}</p>

//                 <a href="/admin/delete-service/${card._id}"
//                    onclick="return confirm('Delete this service?')">
//                    Delete
//                 </a>

//             </div>
//         `).join("")}

//     </section>
//     `;
// }

// module.exports = Hero;
function Hero(cards){

    return `
    <section class="hero">

        ${cards.map(card => `
            <div class="card">

                <h2>${card.title}</h2>
                <p>${card.description}</p>

                <a href="/admin/delete-service/${card._id}"
                   onclick="return confirm('Delete this service?')">
                   Delete
                </a>

            </div>
        `).join("")}

    </section>
    `;
}

module.exports = Hero;