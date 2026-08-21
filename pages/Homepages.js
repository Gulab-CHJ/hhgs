



// const Header =
//     require("../views/component/headercomponent");

// const Banner =
//     require("../views/component/bannercomponent");

// const Footer =
//     require("../views/component/footercomponent");

// const DoctorSection =
//     require("../views/component/doctorcomponent");

// const StudentSection =
//     require("../views/component/studentcomponent");

// const ServiceSection =
//     require("../views/component/servicecomponent");

// const GovernmentSection =
//     require("../views/component/governmentcomponent");


// function Home(
//     banners = [],
//     doctors = [],
//     governments = [],
//     services = [],
//     students = []
// ) {

//     return `
// <!DOCTYPE html>

// <html lang="en">

// <head>

//     <meta charset="UTF-8">

//     <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1.0"
//     >

//     <meta
//         name="theme-color"
//         content="#16a34a"
//     >

//     <meta
//         name="mobile-web-app-capable"
//         content="yes"
//     >

//     <meta
//         name="apple-mobile-web-app-capable"
//         content="yes"
//     >

//     <meta
//         name="apple-mobile-web-app-status-bar-style"
//         content="default"
//     >

//     <meta
//         name="apple-mobile-web-app-title"
//         content="HHGS"
//     >

//     <link
//         rel="manifest"
//         href="/manifest.json"
//     >

//     <link
//         rel="icon"
//         type="image/png"
//         href="/images/hhgs-icon-192.png"
//     >

//     <link
//         rel="apple-touch-icon"
//         href="/images/hhgs-icon-192.png"
//     >

//     <title>
//         HHGS23 | Online Healthcare & Government Services
//     </title>

//     <link
//         rel="stylesheet"
//         href="/css/style.css"
//     >

//     <link
//         rel="stylesheet"
//         href="/css/banner.css"
//     >

//     <style>

//         * {
//             box-sizing: border-box;
//         }

//         html,
//         body {
//             width: 100%;
//             max-width: 100%;
//             margin: 0;
//             padding: 0;
//             overflow-x: hidden;
//         }

//         img {
//             max-width: 100%;
//         }


//         /* =====================================
//            INSTALL APP POPUP
//         ===================================== */

//         .install-popup {
//             display: none;

//             position: fixed;
//             inset: 0;
//             z-index: 999999;

//             align-items: center;
//             justify-content: center;

//             padding: 20px;

//             background:
//                 rgba(15, 23, 42, 0.72);

//             backdrop-filter: blur(5px);
//         }

//         .install-popup.show {
//             display: flex;
//         }

//         .install-box {
//             width: 100%;
//             max-width: 360px;

//             position: relative;

//             padding: 28px 22px 22px;

//             text-align: center;

//             border-radius: 24px;

//             background: #ffffff;

//             box-shadow:
//                 0 20px 60px
//                 rgba(0, 0, 0, 0.30);

//             animation:
//                 installPopupOpen
//                 0.35s ease;
//         }

//         @keyframes installPopupOpen {

//             from {
//                 opacity: 0;
//                 transform: scale(0.85);
//             }

//             to {
//                 opacity: 1;
//                 transform: scale(1);
//             }

//         }

//         .install-close {
//             width: 34px;
//             height: 34px;

//             position: absolute;
//             top: 12px;
//             right: 12px;

//             border: 0;
//             border-radius: 50%;

//             color: #475569;
//             background: #f1f5f9;

//             font-size: 25px;
//             line-height: 30px;

//             cursor: pointer;
//         }

//         .install-logo {
//             width: 78px;
//             height: 78px;

//             display: block;

//             margin:
//                 5px auto 15px;

//             object-fit: contain;
//         }

//         .install-box h2 {
//             margin: 0 0 8px;

//             color: #123c77;

//             font-size: 23px;
//             font-weight: 800;
//         }

//         .install-box p {
//             margin: 0 auto 18px;

//             color: #64748b;

//             font-size: 14px;
//             line-height: 1.5;
//         }

//         .install-benefits {
//             display: flex;
//             flex-direction: column;
//             gap: 7px;

//             margin-bottom: 20px;

//             color: #166534;

//             font-size: 13px;
//             font-weight: 700;
//         }

//         .install-now {
//             width: 100%;

//             padding: 14px 18px;

//             border: 0;
//             border-radius: 14px;

//             color: #ffffff;

//             background:
//                 linear-gradient(
//                     135deg,
//                     #16a34a,
//                     #15803d
//                 );

//             font-size: 16px;
//             font-weight: 800;

//             cursor: pointer;

//             box-shadow:
//                 0 8px 20px
//                 rgba(22, 163, 74, 0.25);
//         }

//         .install-later {
//             width: 100%;

//             margin-top: 9px;
//             padding: 10px;

//             border: 0;

//             color: #64748b;
//             background: transparent;

//             font-size: 13px;
//             font-weight: 600;

//             cursor: pointer;
//         }


//         /* =====================================
//            PHONE RESPONSIVE
//         ===================================== */

//         @media screen and (max-width: 768px) {

//             html,
//             body {
//                 width: 100%;
//                 max-width: 100%;
//                 font-size: 14px;
//             }

//             main,
//             section,
//             .container {
//                 width: 100%;
//                 max-width: 100%;
//             }

//             .container {
//                 margin: 0 auto;

//                 padding-left: 10px;
//                 padding-right: 10px;
//             }

//             img {
//                 max-width: 100%;
//                 height: auto;
//             }

//         }

//     </style>

// </head>

// <body>


//     <!-- =====================================
//          INSTALL HHGS APP POPUP
//     ====================================== -->

//     <div
//         id="installPopup"
//         class="install-popup"
//     >

//         <div class="install-box">

//             <button
//                 type="button"
//                 id="closeInstallPopup"
//                 class="install-close"
//             >
//                 ×
//             </button>

//             <img
//                 src="/images/hhgs-icon-192.png"
//                 alt="HHGS Logo"
//                 class="install-logo"
//             >

//             <h2>
//                 Install HHGS App
//             </h2>

//             <p>
//                 सभी Healthcare और Government
//                 Services को तेजी से इस्तेमाल करने
//                 के लिए HHGS App install करें।
//             </p>

//             <div class="install-benefits">

//                 <span>
//                     ✓ Fast Loading
//                 </span>

//                 <span>
//                     ✓ Direct Home Screen Access
//                 </span>

//                 <span>
//                     ✓ Quick Services Access
//                 </span>

//             </div>

//             <button
//                 type="button"
//                 id="installNowButton"
//                 class="install-now"
//             >
//                 ⬇ Install Now
//             </button>

//             <button
//                 type="button"
//                 id="installLaterButton"
//                 class="install-later"
//             >
//                 Maybe Later
//             </button>

//         </div>

//     </div>


//     ${Header()}

//     ${Banner(banners)}

//     ${DoctorSection(doctors)}

//     ${StudentSection(students)}

//     ${ServiceSection(services)}

//     ${GovernmentSection(governments)}

//     ${Footer()}


//     <script src="/js/banner.js"></script>

//     <script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//     ></script>


//     <script>

// // =====================================
// // SERVICE WORKER
// // =====================================

// if ("serviceWorker" in navigator) {

//     window.addEventListener(
//         "load",
//         function () {

//             navigator.serviceWorker
//                 .register(
//                     "/service-worker.js"
//                 )
//                 .then(function (registration) {

//                     console.log(
//                         "Service Worker Registered:",
//                         registration.scope
//                     );

//                 })
//                 .catch(function (error) {

//                     console.log(
//                         "Service Worker Error:",
//                         error
//                     );

//                 });

//         }
//     );

// }


// // =====================================
// // INSTALL POPUP ELEMENTS
// // =====================================

// let hhgsInstallPrompt = null;

// const installPopup =
//     document.getElementById(
//         "installPopup"
//     );

// const installNowButton =
//     document.getElementById(
//         "installNowButton"
//     );

// const installLaterButton =
//     document.getElementById(
//         "installLaterButton"
//     );

// const closeInstallPopup =
//     document.getElementById(
//         "closeInstallPopup"
//     );


// // =====================================
// // CHECK APP INSTALLED
// // =====================================

// function isHHGSInstalled() {

//     return (
//         window.matchMedia(
//             "(display-mode: standalone)"
//         ).matches ||

//         window.navigator
//             .standalone === true
//     );

// }


// // =====================================
// // SHOW POPUP
// // =====================================

// function showInstallPopup() {

//     if (
//         installPopup &&
//         !isHHGSInstalled()
//     ) {

//         installPopup.classList.add(
//             "show"
//         );

//     }

// }


// // =====================================
// // HIDE POPUP
// // =====================================

// function hideInstallPopup() {

//     if (installPopup) {

//         installPopup.classList.remove(
//             "show"
//         );

//     }

// }


// // =====================================
// // CAPTURE INSTALL EVENT
// // =====================================

// window.addEventListener(
//     "beforeinstallprompt",
//     function (event) {

//         event.preventDefault();

//         hhgsInstallPrompt = event;

//         console.log(
//             "HHGS installation available"
//         );

//         setTimeout(
//             showInstallPopup,
//             800
//         );

//     }
// );


// // =====================================
// // ALWAYS SHOW CUSTOM POPUP
// // =====================================

// window.addEventListener(
//     "load",
//     function () {

//         if (!isHHGSInstalled()) {

//             setTimeout(
//                 showInstallPopup,
//                 1500
//             );

//         }

//     }
// );


// // =====================================
// // CLOSE BUTTON
// // =====================================

// if (closeInstallPopup) {

//     closeInstallPopup.addEventListener(
//         "click",
//         hideInstallPopup
//     );

// }


// // =====================================
// // MAYBE LATER BUTTON
// // =====================================

// if (installLaterButton) {

//     installLaterButton.addEventListener(
//         "click",
//         hideInstallPopup
//     );

// }


// // =====================================
// // INSTALL NOW BUTTON
// // =====================================

// if (installNowButton) {

//     installNowButton.addEventListener(
//         "click",
//         async function () {

//             if (hhgsInstallPrompt) {

//                 hideInstallPopup();

//                 hhgsInstallPrompt.prompt();

//                 const installChoice =
//                     await hhgsInstallPrompt
//                         .userChoice;

//                 if (
//                     installChoice.outcome ===
//                     "accepted"
//                 ) {

//                     console.log(
//                         "HHGS App Installed"
//                     );

//                 } else {

//                     console.log(
//                         "Installation cancelled"
//                     );

//                 }

//                 hhgsInstallPrompt = null;

//             } else {

//                 alert(
//                     "Chrome के ⋮ Menu में जाकर Install and create shortcut दबाएँ।"
//                 );

//             }

//         }
//     );

// }


// // =====================================
// // INSTALLATION COMPLETE
// // =====================================

// window.addEventListener(
//     "appinstalled",
//     function () {

//         hideInstallPopup();

//         hhgsInstallPrompt = null;

//         console.log(
//             "HHGS App Installation Complete"
//         );

//     }
// );


// // Installed app में popup बंद रखें

// if (isHHGSInstalled()) {

//     hideInstallPopup();

// }

// </script>

// </body>

// </html>
// `;

// }


// module.exports = Home;

const Header =
    require("../views/component/headercomponent");

const Banner =
    require("../views/component/bannercomponent");

const Footer =
    require("../views/component/footercomponent");

const DoctorSection =
    require("../views/component/doctorcomponent");

const StudentSection =
    require("../views/component/studentcomponent");

const ServiceSection =
    require("../views/component/servicecomponent");

const GovernmentSection =
    require("../views/component/governmentcomponent");


function Home(
    banners = [],
    doctors = [],
    governments = [],
    services = [],
    students = []
) {

    return `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="theme-color"
        content="#16a34a"
    >

    <meta
        name="mobile-web-app-capable"
        content="yes"
    >

    <meta
        name="apple-mobile-web-app-capable"
        content="yes"
    >

    <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
    >

    <meta
        name="apple-mobile-web-app-title"
        content="HHGS"
    >

    <link
        rel="manifest"
        href="/manifest.json"
    >

    <link
        rel="icon"
        type="image/png"
        href="/images/hhgs-icon-192.png"
    >

    <link
        rel="apple-touch-icon"
        href="/images/hhgs-icon-192.png"
    >

    <title>
        HHGS23 | Online Healthcare & Government Services
    </title>

    <link
        rel="stylesheet"
        href="/css/style.css"
    >

    <link
        rel="stylesheet"
        href="/css/banner.css"
    >

    <style>

        * {
            box-sizing: border-box;
        }

        html,
        body {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        img {
            max-width: 100%;
        }


        /* INSTALL POPUP */

        .install-popup {
            display: none;

            position: fixed;
            inset: 0;
            z-index: 999999;

            align-items: center;
            justify-content: center;

            padding: 20px;

            background:
                rgba(15, 23, 42, 0.75);

            backdrop-filter: blur(5px);
        }

        .install-popup.show {
            display: flex;
        }

        .install-box {
            width: 100%;
            max-width: 360px;

            position: relative;

            padding: 28px 22px 22px;

            text-align: center;

            border-radius: 24px;

            background: #ffffff;

            box-shadow:
                0 20px 60px
                rgba(0, 0, 0, 0.30);

            animation:
                installPopupOpen
                0.35s ease;
        }

        @keyframes installPopupOpen {

            from {
                opacity: 0;
                transform: scale(0.85);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }

        }

        .install-close {
            width: 34px;
            height: 34px;

            position: absolute;
            top: 12px;
            right: 12px;

            border: 0;
            border-radius: 50%;

            color: #475569;
            background: #f1f5f9;

            font-size: 25px;
            line-height: 30px;

            cursor: pointer;
        }

        .install-logo {
            width: 78px;
            height: 78px;

            display: block;

            margin: 5px auto 15px;

            object-fit: contain;
        }

        .install-box h2 {
            margin: 0 0 8px;

            color: #123c77;

            font-size: 23px;
            font-weight: 800;
        }

        .install-box p {
            margin: 0 auto 18px;

            color: #64748b;

            font-size: 14px;
            line-height: 1.5;
        }

        .install-benefits {
            display: flex;
            flex-direction: column;
            gap: 7px;

            margin-bottom: 20px;

            color: #166534;

            font-size: 13px;
            font-weight: 700;
        }

        .install-now {
            width: 100%;

            padding: 14px 18px;

            border: 0;
            border-radius: 14px;

            color: #ffffff;

            background:
                linear-gradient(
                    135deg,
                    #16a34a,
                    #15803d
                );

            font-size: 16px;
            font-weight: 800;

            cursor: pointer;

            box-shadow:
                0 8px 20px
                rgba(22, 163, 74, 0.25);
        }

        .install-later {
            width: 100%;

            margin-top: 9px;
            padding: 10px;

            border: 0;

            color: #64748b;
            background: transparent;

            font-size: 13px;
            font-weight: 600;

            cursor: pointer;
        }


        /* PHONE VIEW */
@media screen and (max-width: 768px) {

    html,
    body {
        width: 100%;
        max-width: 100%;

        font-size: 14px;
    }

    main,
    section,
    .container {
        width: 100%;
        max-width: 100%;
    }

    .container {
        margin: 0 auto;

        padding-left: 10px;
        padding-right: 10px;
    }

    img {
        max-width: 100%;
        height: auto;
    }

}
    </style>

</head>

<body>


    <!-- INSTALL HHGS APP POPUP -->

    <div
        id="installPopup"
        class="install-popup"
    >

        <div class="install-box">

            <button
                type="button"
                id="closeInstallPopup"
                class="install-close"
            >
                ×
            </button>

            <img
                src="/images/hhgs-icon-192.png"
                alt="HHGS Logo"
                class="install-logo"
            >

            <h2>
                Install HHGS App
            </h2>

            <p>
                सभी Healthcare और Government
                Services को तेजी से इस्तेमाल करने
                के लिए HHGS App install करें।
            </p>

            <div class="install-benefits">

                <span>
                    ✓ Fast Loading
                </span>

                <span>
                    ✓ Direct Home Screen Access
                </span>

                <span>
                    ✓ Quick Services Access
                </span>

            </div>

            <button
                type="button"
                id="installNowButton"
                class="install-now"
            >
                ⬇ Install Now
            </button>

            <button
                type="button"
                id="installLaterButton"
                class="install-later"
            >
                Maybe Later
            </button>

        </div>

    </div>


    ${Header()}

    ${Banner(banners)}

    ${DoctorSection(doctors)}

    ${StudentSection(students)}

    ${ServiceSection(services)}

    ${GovernmentSection(governments)}

    ${Footer()}


    <style>

/* =====================================
   FORCE PHONE APP VIEW
===================================== */

@media screen and (pointer: coarse) and (max-width: 1200px),
       screen and (max-device-width: 768px) {

    html,
    body {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;

        margin: 0 !important;
        padding: 0 !important;

        overflow-x: hidden !important;
    }

    main,
    section,
    header,
    footer,
    .container {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
    }

    /* TWO DOCTORS PER ROW */

    .doctor-grid {
        display: grid !important;

        grid-template-columns:
            repeat(
                2,
                minmax(0, 1fr)
            ) !important;

        gap: 10px !important;

        width: 100% !important;
    }

    .doctor-card {
        width: 100% !important;
        min-width: 0 !important;

        border-radius: 14px !important;
    }

    .doctor-img {
        width: 100% !important;
        height: 145px !important;

        object-fit: cover !important;
    }

    .doctor-body {
        padding: 10px !important;
    }

    .doctor-body h3 {
        font-size: 15px !important;
        line-height: 1.25 !important;
    }

    .doctor-info {
        font-size: 11px !important;
    }

    /* TWO SERVICES PER ROW */

    .services-grid {
        display: grid !important;

        grid-template-columns:
            repeat(
                2,
                minmax(0, 1fr)
            ) !important;

        gap: 10px !important;

        width: 100% !important;
    }

    /* RESPONSIVE IMAGES */

    img,
    video,
    iframe {
        max-width: 100% !important;
    }

}

</style>

    <script src="/js/banner.js"></script>

    <script
        src="https://checkout.razorpay.com/v1/checkout.js"
    ></script>


    <script>

        // SERVICE WORKER

        if ("serviceWorker" in navigator) {

            window.addEventListener(
                "load",
                function () {

                    navigator.serviceWorker
                        .register(
                            "/service-worker.js"
                        )
                        .then(
                            function (
                                registration
                            ) {

                                console.log(
                                    "Service Worker Registered:",
                                    registration.scope
                                );

                            }
                        )
                        .catch(
                            function (error) {

                                console.log(
                                    "Service Worker Error:",
                                    error
                                );

                            }
                        );

                },
                {
                    once: true
                }
            );

        }


        // INSTALL POPUP ELEMENTS

        let hhgsInstallPrompt = null;

        const installPopup =
            document.getElementById(
                "installPopup"
            );

        const installNowButton =
            document.getElementById(
                "installNowButton"
            );

        const installLaterButton =
            document.getElementById(
                "installLaterButton"
            );

        const closeInstallPopup =
            document.getElementById(
                "closeInstallPopup"
            );


        // CHECK APP INSTALLED

        function isHHGSInstalled() {

            return (

                window.matchMedia(
                    "(display-mode: standalone)"
                ).matches ||

                window.navigator
                    .standalone === true

            );

        }


        // SHOW POPUP

        function showInstallPopup() {

            if (
                installPopup &&
                !isHHGSInstalled()
            ) {

                installPopup.classList.add(
                    "show"
                );

            }

        }


        // HIDE POPUP

        function hideInstallPopup() {

            if (installPopup) {

                installPopup.classList.remove(
                    "show"
                );

            }

        }


        // CAPTURE INSTALL EVENT

        window.addEventListener(
            "beforeinstallprompt",
            function (event) {

                event.preventDefault();

                hhgsInstallPrompt = event;

                console.log(
                    "HHGS installation available"
                );

                setTimeout(
                    showInstallPopup,
                    800
                );

            }
        );


        // ALWAYS SHOW POPUP

        function scheduleInstallPopup() {

            if (!isHHGSInstalled()) {

                setTimeout(
                    showInstallPopup,
                    1500
                );

            }

        }


        if (
            document.readyState ===
            "complete"
        ) {

            scheduleInstallPopup();

        } else {

            window.addEventListener(
                "load",
                scheduleInstallPopup,
                {
                    once: true
                }
            );

        }


        // CLOSE BUTTON

        if (closeInstallPopup) {

            closeInstallPopup.addEventListener(
                "click",
                hideInstallPopup
            );

        }


        // MAYBE LATER

        if (installLaterButton) {

            installLaterButton.addEventListener(
                "click",
                hideInstallPopup
            );

        }


        // INSTALL NOW

        if (installNowButton) {

            installNowButton.addEventListener(
                "click",
                async function () {

                    if (hhgsInstallPrompt) {

                        hideInstallPopup();

                        hhgsInstallPrompt.prompt();

                        const installChoice =
                            await hhgsInstallPrompt
                                .userChoice;

                        if (
                            installChoice.outcome ===
                            "accepted"
                        ) {

                            console.log(
                                "HHGS App Installed"
                            );

                        } else {

                            console.log(
                                "Installation cancelled"
                            );

                        }

                        hhgsInstallPrompt = null;

                    } else {

                        alert(
                            "Chrome के ⋮ Menu में जाकर Install and create shortcut दबाएँ।"
                        );

                    }

                }
            );

        }


        // INSTALLATION COMPLETE

        window.addEventListener(
            "appinstalled",
            function () {

                hideInstallPopup();

                hhgsInstallPrompt = null;

                console.log(
                    "HHGS App Installation Complete"
                );

            }
        );


        // APP ALREADY INSTALLED

        if (isHHGSInstalled()) {

            hideInstallPopup();

        }

    </script>

</body>

</html>
`;

}


module.exports = Home;