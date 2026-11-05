
const express = require("express");
const router = express.Router();
const Analytics = require("../models/Analytics");
const crypto = require("crypto");

function adminAuth(req, res, next) {
    if (!req.session?.adminId) {
        return res.redirect("/admin");
    }
    next();
}

// IST date boundaries
function istDayStart(date = new Date()) {
    const shifted = new Date(date.getTime() + 330 * 60000);
    shifted.setUTCHours(0, 0, 0, 0);
    return new Date(shifted.getTime() - 330 * 60000);
}

// Analytics dashboard
router.get("/", adminAuth, (req, res) => {
    res.render("analytics");
});

// Analytics API
router.get("/api", adminAuth, async (req, res) => {
    try {
        const now = new Date();

        const todayStart = istDayStart(now);

        const weekStart = new Date(todayStart);
        weekStart.setUTCDate(weekStart.getUTCDate() - 6);

        const monthStart = new Date(
            Date.UTC(
                new Date(now.getTime() + 330 * 60000).getUTCFullYear(),
                new Date(now.getTime() + 330 * 60000).getUTCMonth(),
                1
            ) - 330 * 60000
        );

        const liveSince = new Date(
            now.getTime() - 2 * 60 * 1000
        );

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

            Analytics.countDocuments({
                eventType: "pageview"
            }),

            Analytics.countDocuments({
                eventType: "pageview",
                createdAt: { $gte: todayStart }
            }),

            Analytics.countDocuments({
                eventType: "pageview",
                createdAt: { $gte: weekStart }
            }),

            Analytics.countDocuments({
                eventType: "pageview",
                createdAt: { $gte: monthStart }
            }),

            Analytics.distinct("visitorHash", {
                eventType: "pageview"
            }).then(v => v.length),

            Analytics.distinct("visitorHash", {
                eventType: "pageview",
                createdAt: { $gte: todayStart }
            }).then(v => v.length),

            Analytics.distinct("visitorHash", {
                eventType: "pageview",
                createdAt: { $gte: liveSince }
            }).then(v => v.length),

            Analytics.aggregate([
                {
                    $match: {
                        eventType: "pageview",
                        createdAt: { $gte: monthStart }
                    }
                },
                {
                    $group: {
                        _id: "$device",
                        count: { $sum: 1 }
                    }
                }
            ]),

            Analytics.aggregate([
                {
                    $match: {
                        eventType: "pageview",
                        createdAt: { $gte: monthStart }
                    }
                },
                {
                    $group: {
                        _id: "$path",
                        visits: { $sum: 1 }
                    }
                },
                { $sort: { visits: -1 } },
                { $limit: 10 }
            ]),

            Analytics.countDocuments({
                eventType: "install"
            }),

            Analytics.aggregate([
                {
                    $match: {
                        eventType: "pageview",
                        createdAt: { $gte: weekStart }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt",
                                timezone: "Asia/Kolkata"
                            }
                        },
                        visits: { $sum: 1 },
                        visitors: { $addToSet: "$visitorHash" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        visits: 1,
                        visitors: { $size: "$visitors" }
                    }
                },
                { $sort: { date: 1 } }
            ])
        ]);

        res.json({
            success: true,
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
            daily
        });

    } catch (error) {
        console.error("Analytics API Error:", error);

        res.status(500).json({
            success: false,
            message: "Analytics data load failed"
        });
    }
});

// PWA install event
router.post("/install", async (req, res) => {
    try {
        if (!req.sessionID) {
            return res.status(401).json({
                success: false
            });
        }

        const secret =
            process.env.ANALYTICS_SECRET ||
            process.env.SESSION_SECRET;

        if (!secret) {
            return res.status(500).json({
                success: false
            });
        }

        const visitorHash = crypto
            .createHmac("sha256", secret)
            .update(req.sessionID)
            .digest("hex");

        await Analytics.create({
            eventType: "install",
            visitorHash,
            path: "/",
            device: "Unknown"
        });

        res.json({ success: true });

    } catch (error) {
        console.error("Install Analytics Error:", error.message);

        res.status(500).json({
            success: false
        });
    }
});

module.exports = router;
