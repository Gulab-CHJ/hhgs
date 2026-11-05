
const express = require("express");
const router = express.Router();

const Analytics = require("../models/Analytics");
const crypto = require("crypto");

// ======================================
// ADMIN AUTHENTICATION
// ======================================

function adminAuth(req, res, next) {

    if (!req.session?.adminId) {
        return res.redirect("/admin");
    }

    next();
}

// ======================================
// IST DATE FUNCTIONS
// ======================================

const IST_OFFSET = 330 * 60 * 1000;

function istDayStart(date = new Date()) {

    const shifted = new Date(
        date.getTime() + IST_OFFSET
    );

    shifted.setUTCHours(0, 0, 0, 0);

    return new Date(
        shifted.getTime() - IST_OFFSET
    );
}

function istDateKey(date) {

    return new Date(
        date.getTime() + IST_OFFSET
    ).toISOString().slice(0, 10);

}

// ======================================
// VALID PAGE FILTER
// Exclude old technical page records too
// ======================================

const validPageFilter = {

    eventType: "pageview",

    path: {
        $not: /^(\/admin(?:\/|$)|\/analytics(?:\/|$)|\/api(?:\/|$)|\/shopkeeper(?:\/|$)|\/uploads(?:\/|$)|\/images(?:\/|$)|\/css(?:\/|$)|\/js(?:\/|$)|\/fonts(?:\/|$)|\/public(?:\/|$)|\/storage(?:\/|$)|\/service-worker\.js$|\/sw\.js$|\/manifest\.json$|\/favicon\.ico$|\/robots\.txt$|\/sitemap\.xml$)|\.(js|css|json|map|png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|ttf|eot|mp3|mp4|pdf|xml|txt|webmanifest)$/i
    }

};

// ======================================
// ANALYTICS DASHBOARD
// ======================================

router.get(
    "/",
    adminAuth,
    (req, res) => {

        res.setHeader(
            "Cache-Control",
            "no-store"
        );

        res.render("analytics");

    }
);

// ======================================
// ANALYTICS API
// ======================================

router.get(
    "/api",
    adminAuth,
    async (req, res) => {

        try {

            res.setHeader(
                "Cache-Control",
                "no-store"
            );

            const now = new Date();

            // IST TODAY
            const todayStart =
                istDayStart(now);

            // LAST 7 DAYS
            const weekStart =
                new Date(
                    todayStart.getTime() -
                    6 * 24 * 60 * 60 * 1000
                );

            // CURRENT MONTH
            const shiftedNow =
                new Date(
                    now.getTime() + IST_OFFSET
                );

            const monthStart =
                new Date(
                    Date.UTC(
                        shiftedNow.getUTCFullYear(),
                        shiftedNow.getUTCMonth(),
                        1
                    ) - IST_OFFSET
                );

            // LIVE VISITORS
            const liveSince =
                new Date(
                    now.getTime() -
                    2 * 60 * 1000
                );

            // --------------------------------
            // FILTERS
            // --------------------------------

            const todayFilter = {
                ...validPageFilter,
                createdAt: {
                    $gte: todayStart
                }
            };

            const weekFilter = {
                ...validPageFilter,
                createdAt: {
                    $gte: weekStart
                }
            };

            const monthFilter = {
                ...validPageFilter,
                createdAt: {
                    $gte: monthStart
                }
            };

            const liveFilter = {
                ...validPageFilter,
                createdAt: {
                    $gte: liveSince
                }
            };

            // --------------------------------
            // DATABASE QUERIES
            // --------------------------------

            const [

                totalVisits,

                todayVisits,

                weekVisits,

                monthVisits,

                totalUnique,

                todayUnique,

                liveVisitors,

                devices,

                topPages,

                installs,

                daily

            ] = await Promise.all([

                // TOTAL VISITS

                Analytics.countDocuments(
                    validPageFilter
                ),

                // TODAY VISITS

                Analytics.countDocuments(
                    todayFilter
                ),

                // LAST 7 DAYS

                Analytics.countDocuments(
                    weekFilter
                ),

                // THIS MONTH

                Analytics.countDocuments(
                    monthFilter
                ),

                // TOTAL UNIQUE VISITORS

                Analytics.distinct(
                    "visitorHash",
                    validPageFilter
                ).then(v => v.length),

                // TODAY UNIQUE VISITORS

                Analytics.distinct(
                    "visitorHash",
                    todayFilter
                ).then(v => v.length),

                // LIVE VISITORS

                Analytics.distinct(
                    "visitorHash",
                    liveFilter
                ).then(v => v.length),

                // DEVICE STATISTICS

                Analytics.aggregate([

                    {
                        $match: monthFilter
                    },

                    {
                        $group: {
                            _id: "$device",
                            count: {
                                $sum: 1
                            }
                        }
                    },

                    {
                        $sort: {
                            count: -1
                        }
                    }

                ]),

                // MOST VISITED PAGES

                Analytics.aggregate([

                    {
                        $match: monthFilter
                    },

                    {
                        $group: {
                            _id: "$path",
                            visits: {
                                $sum: 1
                            }
                        }
                    },

                    {
                        $sort: {
                            visits: -1
                        }
                    },

                    {
                        $limit: 10
                    }

                ]),

                // PWA INSTALL EVENTS

                Analytics.countDocuments({

                    eventType: "install"

                }),

                // DAILY TRAFFIC

                Analytics.aggregate([

                    {
                        $match: weekFilter
                    },

                    {
                        $group: {

                            _id: {

                                $dateToString: {

                                    format: "%Y-%m-%d",

                                    date: "$createdAt",

                                    timezone:
                                        "Asia/Kolkata"

                                }

                            },

                            visits: {
                                $sum: 1
                            },

                            visitors: {
                                $addToSet: "$visitorHash"
                            }

                        }
                    },

                    {
                        $project: {

                            _id: 0,

                            date: "$_id",

                            visits: 1,

                            visitors: {
                                $size: "$visitors"
                            }

                        }
                    },

                    {
                        $sort: {
                            date: 1
                        }
                    }

                ])

            ]);

            // --------------------------------
            // FILL MISSING 7 DAYS WITH ZERO
            // --------------------------------

            const dailyMap = new Map();

            daily.forEach(item => {

                dailyMap.set(
                    item.date,
                    item
                );

            });

            const lastSevenDays = [];

            const startDate =
                new Date(
                    weekStart.getTime() +
                    IST_OFFSET
                );

            for (let i = 0; i < 7; i++) {

                const date =
                    new Date(startDate);

                date.setUTCDate(
                    date.getUTCDate() + i
                );

                const key =
                    date.toISOString().slice(0, 10);

                const existing =
                    dailyMap.get(key);

                lastSevenDays.push({

                    date: key,

                    visits:
                        existing?.visits || 0,

                    visitors:
                        existing?.visitors || 0

                });

            }

            // --------------------------------
            // FINAL RESPONSE
            // --------------------------------

            return res.json({

                success: true,

                lastUpdated: now.toISOString(),

                stats: {

                    totalVisits,

                    todayVisits,

                    weekVisits,

                    monthVisits,

                    totalUnique,

                    todayUnique,

                    liveVisitors,

                    installs

                },

                devices,

                topPages,

                daily: lastSevenDays

            });

        } catch (error) {

            console.error(
                "Analytics API Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Analytics data load failed"

            });

        }

    }
);

// ======================================
// PWA INSTALL EVENT
// ======================================

router.post(
    "/install",
    async (req, res) => {

        try {

            if (!req.sessionID) {

                return res.status(401).json({

                    success: false,

                    message: "Session unavailable"

                });

            }

            const secret =
                process.env.ANALYTICS_SECRET ||
                process.env.SESSION_SECRET;

            if (!secret) {

                return res.status(500).json({

                    success: false,

                    message: "Analytics secret missing"

                });

            }

            const visitorHash =
                crypto
                    .createHmac(
                        "sha256",
                        secret
                    )
                    .update(req.sessionID)
                    .digest("hex");

            // Avoid duplicate install event
            // from the same session on the same day

            const todayStart =
                istDayStart();

            const alreadyInstalled =
                await Analytics.findOne({

                    eventType: "install",

                    visitorHash,

                    createdAt: {
                        $gte: todayStart
                    }

                });

            if (alreadyInstalled) {

                return res.json({

                    success: true,

                    duplicate: true

                });

            }

            await Analytics.create({

                eventType: "install",

                visitorHash,

                path: "/",

                device: "Unknown"

            });

            return res.json({

                success: true

            });

        } catch (error) {

            console.error(
                "Install Analytics Error:",
                error
            );

            return res.status(500).json({

                success: false

            });

        }

    }
);

module.exports = router;
