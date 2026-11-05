
const crypto = require("crypto");
const Analytics = require("../models/Analytics");

const SECRET =
    process.env.ANALYTICS_SECRET ||
    process.env.SESSION_SECRET;

// ======================================
// DEVICE DETECTION
// ======================================

function getDevice(userAgent = "") {

    const ua = userAgent.toLowerCase();

    if (
        /ipad|tablet|playbook|silk/.test(ua) ||
        (/android/.test(ua) && !/mobile/.test(ua))
    ) {
        return "Tablet";
    }

    if (
        /mobile|android|iphone|ipod/.test(ua)
    ) {
        return "Mobile";
    }

    return "Desktop";
}

// ======================================
// IGNORE NON-PAGE REQUESTS
// ======================================

function shouldIgnore(req) {

    const pathname =
        req.path.toLowerCase();

    const ignoredPaths = [
        "/admin",
        "/analytics",
        "/api",
        "/shopkeeper",
        "/uploads",
        "/images",
        "/css",
        "/js",
        "/fonts",
        "/public",
        "/storage",
        "/doctor/public",
        "/service-worker.js",
        "/sw.js",
        "/manifest.json",
        "/favicon.ico",
        "/robots.txt",
        "/sitemap.xml"
    ];

    if (
        ignoredPaths.some(
            item =>
                pathname === item ||
                pathname.startsWith(item + "/")
        )
    ) {
        return true;
    }

    // Static files and technical resources
    if (
        /\.(js|css|json|map|png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|ttf|eot|mp3|mp4|pdf|xml|txt|webmanifest)$/i.test(pathname)
    ) {
        return true;
    }

    // Ignore automated bots
    const ua =
        req.headers["user-agent"] || "";

    if (
        /bot|crawler|spider|slurp|headless|lighthouse|pagespeed|curl|wget/i.test(ua)
    ) {
        return true;
    }

    return false;
}

// ======================================
// ANALYTICS MIDDLEWARE
// ======================================

function analyticsMiddleware(req, res, next) {

    // Only GET HTML page requests
    if (
        req.method !== "GET" ||
        shouldIgnore(req) ||
        !req.accepts("html")
    ) {
        return next();
    }

    const sessionId = req.sessionID;

    if (!sessionId || !SECRET) {
        return next();
    }

    // Anonymous visitor identifier
    const visitorHash =
        crypto
            .createHmac("sha256", SECRET)
            .update(sessionId)
            .digest("hex");

    const event = {

        eventType: "pageview",

        visitorHash,

        path: req.path,

        device: getDevice(
            req.headers["user-agent"]
        )

    };

    // Save only after successful HTML response
    res.once("finish", () => {

        if (
            res.statusCode < 200 ||
            res.statusCode >= 300
        ) {
            return;
        }

        const contentType =
            String(
                res.getHeader("content-type") || ""
            ).toLowerCase();

        if (!contentType.includes("text/html")) {
            return;
        }

        setImmediate(async () => {

            try {

                await Analytics.create(event);

            } catch (error) {

                console.error(
                    "Analytics Tracking Error:",
                    error.message
                );

            }

        });

    });

    next();
}

module.exports = analyticsMiddleware;
