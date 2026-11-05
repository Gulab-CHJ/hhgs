
const crypto = require("crypto");
const Analytics = require("../models/Analytics");

const SECRET =
    process.env.ANALYTICS_SECRET ||
    process.env.SESSION_SECRET;

function getDevice(userAgent = "") {
    const ua = userAgent.toLowerCase();

    if (/ipad|tablet|playbook|silk/.test(ua)) {
        return "Tablet";
    }

    if (/mobile|android|iphone|ipod/.test(ua)) {
        return "Mobile";
    }

    return "Desktop";
}

function analyticsMiddleware(req, res, next) {

    if (
        req.method !== "GET" ||
        !req.accepts("html") ||
        req.path.startsWith("/admin") ||
        req.path.startsWith("/analytics") ||
        req.path.startsWith("/api") ||
        req.path.startsWith("/shopkeeper") ||
        req.path.startsWith("/uploads") ||
        req.path.startsWith("/images") ||
        req.path.startsWith("/css") ||
        req.path.startsWith("/js") ||
        req.path.startsWith("/fonts") ||
        req.path.startsWith("/public")
    ) {
        return next();
    }

    const sessionId = req.sessionID;

    if (!sessionId || !SECRET) {
        return next();
    }

    const visitorHash = crypto
        .createHmac("sha256", SECRET)
        .update(sessionId)
        .digest("hex");

    const event = {
        eventType: "pageview",
        visitorHash,
        path: req.path,
        device: getDevice(req.headers["user-agent"])
    };

    next();

    setImmediate(async () => {
        try {
            await Analytics.create(event);
        } catch (error) {
            console.error("Analytics Tracking Error:", error.message);
        }
    });
}

module.exports = analyticsMiddleware;
