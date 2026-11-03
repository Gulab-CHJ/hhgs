
function GSMarketBanner() {
    return `
        <style>
            .gs-market-banner,
            .gs-market-banner * {
                box-sizing: border-box;
            }

            .gs-market-banner {
                position: relative;
                display: flex;
                align-items: center;
                gap: 22px;
                width: calc(100% - 24px);
                max-width: 1100px;
                margin: 24px auto;
                padding: 30px;
                overflow: hidden;
                border: 1px solid #bbf7d0;
                border-radius: 22px;
                background: linear-gradient(120deg, #ecfdf5 0%, #f0fdf4 48%, #eff6ff 100%);
                box-shadow: 0 8px 25px rgba(22, 163, 74, 0.10);
                font-family: Arial, sans-serif;
            }

            .gs-market-icon {
                display: flex;
                flex: 0 0 76px;
                align-items: center;
                justify-content: center;
                width: 76px;
                height: 76px;
                border-radius: 22px;
                background: linear-gradient(135deg, #16a34a, #15803d);
                box-shadow: 0 8px 18px rgba(22, 163, 74, 0.22);
                font-size: 38px;
            }

            .gs-market-content {
                position: relative;
                z-index: 1;
                flex: 1;
                min-width: 0;
            }

            .gs-market-content .welcome {
                margin: 0 0 10px;
                color: #15803d;
                font-size: 12px;
                font-weight: 800;
                letter-spacing: 2px;
            }

            .gs-market-content h2 {
                margin: 0 0 10px;
                color: #14532d;
                font-size: clamp(23px, 3vw, 34px);
                line-height: 1.2;
                font-weight: 800;
            }

            .gs-market-content .tagline {
                margin: 0 0 16px;
                color: #4b5563;
                font-size: 15px;
                line-height: 1.6;
            }

            .gs-market-content .delivery {
                margin: 0 0 10px;
                color: #166534;
                font-size: 19px;
                font-weight: 800;
            }

            .gs-market-content .description {
                margin: 0;
                color: #374151;
                font-size: 14px;
                line-height: 1.7;
            }

            .gs-market-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin-top: 20px;
                padding: 13px 23px;
                border: none;
                border-radius: 11px;
                background: linear-gradient(135deg, #16a34a, #15803d);
                color: #ffffff !important;
                font-size: 15px;
                font-weight: 800;
                text-decoration: none !important;
                box-shadow: 0 5px 14px rgba(22, 163, 74, 0.22);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }

            .gs-market-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 18px rgba(22, 163, 74, 0.30);
            }

            @media (max-width: 600px) {
                .gs-market-banner {
                    align-items: flex-start;
                    gap: 13px;
                    width: calc(100% - 20px);
                    margin: 14px auto;
                    padding: 17px 14px;
                    border-radius: 16px;
                }

                .gs-market-icon {
                    flex-basis: 46px;
                    width: 46px;
                    height: 46px;
                    border-radius: 13px;
                    font-size: 24px;
                }

                .gs-market-content .welcome {
                    margin-bottom: 8px;
                    font-size: 10px;
                    letter-spacing: 1px;
                }

                .gs-market-content h2 {
                    font-size: 21px;
                    line-height: 1.3;
                }

                .gs-market-content .tagline {
                    margin-bottom: 12px;
                    font-size: 13px;
                }

                .gs-market-content .delivery {
                    font-size: 16px;
                    line-height: 1.4;
                }

                .gs-market-content .description {
                    font-size: 12px;
                }

                .gs-market-btn {
                    margin-top: 15px;
                    padding: 11px 17px;
                    font-size: 13px;
                }
            }

            @media (max-width: 360px) {
                .gs-market-banner {
                    gap: 10px;
                    padding: 13px 10px;
                }

                .gs-market-content h2 {
                    font-size: 18px;
                }
            }
        </style>

        <section class="gs-market-banner">
            <div class="gs-market-icon">🛍️</div>

            <div class="gs-market-content">
                <p class="welcome">WELCOME TO GS MARKET</p>

                <h2>Discover Products You'll Love</h2>

                <p class="tagline">
                    Great finds, great prices, easy shopping.
                </p>

                <h3 class="delivery">
                    ⚡ Delivery in Just 5 Minutes!
                </h3>

                <p class="description">
                    Order from the comfort of your home and get your
                    daily essentials delivered to your doorstep.
                </p>

                <a href="/market" class="gs-market-btn">
                    Shop Now <span>→</span>
                </a>
            </div>
        </section>
    `;
}

module.exports = GSMarketBanner;

function GSMarketBanner() {
    return `
        <style>
            .gs-market-banner,
            .gs-market-banner * {
                box-sizing: border-box;
            }

            .gs-market-banner {
                position: relative;
                display: flex;
                align-items: center;
                gap: 22px;
                width: calc(100% - 24px);
                max-width: 1100px;
                margin: 24px auto;
                padding: 30px;
                overflow: hidden;
                border: 1px solid #bbf7d0;
                border-radius: 22px;
                background: linear-gradient(120deg, #ecfdf5 0%, #f0fdf4 48%, #eff6ff 100%);
                box-shadow: 0 8px 25px rgba(22, 163, 74, 0.10);
                font-family: Arial, sans-serif;
            }

            .gs-market-icon {
                display: flex;
                flex: 0 0 76px;
                align-items: center;
                justify-content: center;
                width: 76px;
                height: 76px;
                border-radius: 22px;
                background: linear-gradient(135deg, #16a34a, #15803d);
                box-shadow: 0 8px 18px rgba(22, 163, 74, 0.22);
                font-size: 38px;
            }

            .gs-market-content {
                position: relative;
                z-index: 1;
                flex: 1;
                min-width: 0;
            }

            .gs-market-content .welcome {
                margin: 0 0 10px;
                color: #15803d;
                font-size: 12px;
                font-weight: 800;
                letter-spacing: 2px;
            }

            .gs-market-content h2 {
                margin: 0 0 10px;
                color: #14532d;
                font-size: clamp(23px, 3vw, 34px);
                line-height: 1.2;
                font-weight: 800;
            }

            .gs-market-content .tagline {
                margin: 0 0 16px;
                color: #4b5563;
                font-size: 15px;
                line-height: 1.6;
            }

            .gs-market-content .delivery {
                margin: 0 0 10px;
                color: #166534;
                font-size: 19px;
                font-weight: 800;
            }

            .gs-market-content .description {
                margin: 0;
                color: #374151;
                font-size: 14px;
                line-height: 1.7;
            }

            .gs-market-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin-top: 20px;
                padding: 13px 23px;
                border: none;
                border-radius: 11px;
                background: linear-gradient(135deg, #16a34a, #15803d);
                color: #ffffff !important;
                font-size: 15px;
                font-weight: 800;
                text-decoration: none !important;
                box-shadow: 0 5px 14px rgba(22, 163, 74, 0.22);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }

            .gs-market-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 18px rgba(22, 163, 74, 0.30);
            }

            @media (max-width: 600px) {
                .gs-market-banner {
                    align-items: flex-start;
                    gap: 13px;
                    width: calc(100% - 20px);
                    margin: 14px auto;
                    padding: 17px 14px;
                    border-radius: 16px;
                }

                .gs-market-icon {
                    flex-basis: 46px;
                    width: 46px;
                    height: 46px;
                    border-radius: 13px;
                    font-size: 24px;
                }

                .gs-market-content .welcome {
                    margin-bottom: 8px;
                    font-size: 10px;
                    letter-spacing: 1px;
                }

                .gs-market-content h2 {
                    font-size: 21px;
                    line-height: 1.3;
                }

                .gs-market-content .tagline {
                    margin-bottom: 12px;
                    font-size: 13px;
                }

                .gs-market-content .delivery {
                    font-size: 16px;
                    line-height: 1.4;
                }

                .gs-market-content .description {
                    font-size: 12px;
                }

                .gs-market-btn {
                    margin-top: 15px;
                    padding: 11px 17px;
                    font-size: 13px;
                }
            }

            @media (max-width: 360px) {
                .gs-market-banner {
                    gap: 10px;
                    padding: 13px 10px;
                }

                .gs-market-content h2 {
                    font-size: 18px;
                }
            }
        </style>

        <section class="gs-market-banner">
            <div class="gs-market-icon">🛍️</div>

            <div class="gs-market-content">
                <p class="welcome">WELCOME TO GS MARKET</p>

                <h2>Discover Products You'll Love</h2>

                <p class="tagline">
                    Great finds, great prices, easy shopping.
                </p>

                <h3 class="delivery">
                    ⚡ Delivery in Just 5 Minutes!
                </h3>

                <p class="description">
                    Order from the comfort of your home and get your
                    daily essentials delivered to your doorstep.
                </p>

                <a href="/market" class="gs-market-btn">
                    Shop Now <span>→</span>
                </a>
            </div>
        </section>
    `;
}

module.exports = GSMarketBanner;
