// function QuickServiceSection(){

//     return `

// <style>

// .quick-service-section {
//     display: block;
//     width: 100%;
//     max-width: 1180px;
//     margin: 20px auto;
//     float: none;
//     clear: both;
//     position: relative;
// }

// .quick-service-card{
//     display:flex;
//     align-items:center;
//     gap:15px;

//     padding:18px;

//     background:
//         linear-gradient(
//             135deg,
//             #0d604b,
//             #16a34a
//         );

//     color:#ffffff;

//     border-radius:18px;

//     text-decoration:none;

//     box-shadow:
//         0 10px 28px
//         rgba(13,96,75,.20);

//          width: 100%;
//     float: none;
//     box-sizing: border-box;
// }

// .quick-service-icon{
//     width:58px;
//     height:58px;

//     display:flex;
//     align-items:center;
//     justify-content:center;

//     flex-shrink:0;

//     background:#ffffff;
//     color:#16a34a;

//     border-radius:15px;

//     font-size:30px;
// }

// .quick-service-content{
//     flex:1;
// }

// .quick-service-title{
//     font-size:19px;
//     font-weight:900;
// }

// .quick-service-text{
//     margin-top:5px;
//     font-size:13px;
// }

// .quick-service-small{
//     margin-top:7px;
//     font-size:12px;
//     font-weight:700;
// }

// .quick-service-arrow{
//     font-size:34px;
//     font-weight:bold;
// }

// @media(max-width:768px){

//     .quick-service-section{
//         width:calc(100% - 20px);
//         margin:12px auto;
//     }

//     .quick-service-card{
//         padding:14px;
//         gap:11px;
//     }

//     .quick-service-icon{
//         width:48px;
//         height:48px;
//         font-size:25px;
//     }

//     .quick-service-title{
//         font-size:15px;
//     }

//     .quick-service-text{
//         font-size:11px;
//     }

//     .quick-service-small{
//         font-size:10px;
//     }

// }

// </style>


// <section class="quick-service-section">

// <a
// href="/quick-service"
// class="quick-service-card"
// >

// <div class="quick-service-icon">
// ⚡
// </div>

// <div class="quick-service-content">

// <div class="quick-service-title">
// GLOBAL QUICK SERVICES
// </div>

// <div class="quick-service-text">
// PAN Card, Photo Copy & Document Services
// </div>

// <div class="quick-service-small">
// 📍 Fast Doorstep Service
// </div>

// </div>

// <div class="quick-service-arrow">
// ›
// </div>

// </a>

// </section>

//     `;

// }


// module.exports =
//     QuickServiceSection;



function QuickServiceSection() {
    return `
        <style>
            .quick-service-home {
                width: 100%;
                max-width: 1100px;
                margin: 25px auto;
                padding: 0 12px;
                box-sizing: border-box;
            }

            .quick-service-home-heading {
                text-align: center;
                margin-bottom: 15px;
            }

            .quick-service-home-heading h2 {
                font-size: 26px;
                font-weight: 800;
                color: #166534;
                margin: 0 0 8px;
            }

            .quick-service-home-heading p {
                color: #555;
                font-size: 15px;
                margin: 0;
            }

            .quick-service-home-frame {
                display: block;
                width: 100%;
                height: 1100px;
                border: 1px solid #d1d5db;
                border-radius: 16px;
                background: #ffffff;
            }

            @media (max-width: 600px) {
                .quick-service-home {
                    padding: 0 8px;
                    margin: 15px auto;
                }

                .quick-service-home-heading h2 {
                    font-size: 22px;
                }

                .quick-service-home-frame {
                    height: 1100px;
                    border-radius: 10px;
                }
            }
        </style>

        <section class="quick-service-home">

            <div class="quick-service-home-heading">
                <h2>⚡ GLOBAL QUICK SERVICES</h2>

                <p>
                    Photocopy
                </p>
            </div>

            <iframe
                class="quick-service-home-frame"
                src="/quick-service"
                title="Global Quick Services Form"
                loading="lazy"
                allow="geolocation"
            ></iframe>

        </section>
    `;
}

module.exports = QuickServiceSection;
