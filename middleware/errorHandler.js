const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).render("error", {
        title: "Error",
        statusCode,
        message: err.message || "Internal Server Error"
    });

    // अगर JSON API है तो यह use करें
    // res.status(statusCode).json({
    //     success: false,
    //     message: err.message || "Internal Server Error"
    // });
};

module.exports = errorHandler;