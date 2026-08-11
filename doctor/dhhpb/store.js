const express = require("express");
const path = require("path");

const router = express.Router();

const Product = require("../../models/Product");
const Doctor = require("../../models/Doctor");


// ======================================================
// DOCTOR STORE
// URL: /doctor/store
// ======================================================

router.get("/store", async (req, res) => {

    try {

        // -----------------------------------------------
        // DOCTOR LOGIN CHECK
        // -----------------------------------------------

        let doctor = null;

        if (req.session && req.session.doctor) {

            doctor = req.session.doctor;

        }


        // -----------------------------------------------
        // DOCTOR NAME
        // -----------------------------------------------

        let doctorName = "Doctor";

        if (doctor && doctor.name) {

            doctorName = doctor.name;

        }


        // -----------------------------------------------
        // PRODUCTS FETCH
        // -----------------------------------------------

        const products = await Product
            .find({})
            .sort({
                createdAt: -1
            })
            .lean();


        // -----------------------------------------------
        // PRODUCT DATA CLEAN
        // -----------------------------------------------

        const productData = products.map(product => {

            return {

                _id: product._id
                    ? product._id.toString()
                    : "",

                name:
                    product.name || "",

                category:
                    product.category || "",

                brand:
                    product.brand || "",

                manufacturer:
                    product.manufacturer || "",

                description:
                    product.description || "",

                stock:
                    Number(product.stock || 0),

                batch:
                    product.batch ||
                    product.batchNo ||
                    product.batchNumber ||
                    "",

                expiry:
                    product.expiry ||
                    product.expiryDate ||
                    "",

                use:
                    product.use ||
                    product.uses ||
                    product.usage ||
                    "",

                image:
                    product.image ||
                    product.mainImage ||
                    "",

                mainImage:
                    product.mainImage ||
                    product.image ||
                    "",

                images:
                    Array.isArray(product.images)
                        ? product.images
                        : [],

                video:
                    product.video || ""

            };

        });


        // -----------------------------------------------
        // STORE HTML
        // -----------------------------------------------

        const htmlPath = path.join(
            __dirname,
            "../pages/store.html"
        );


        // -----------------------------------------------
        // READ HTML
        // -----------------------------------------------

        const fs = require("fs");

        let html =
            fs.readFileSync(
                htmlPath,
                "utf8"
            );


        // -----------------------------------------------
        // DOCTOR NAME
        // -----------------------------------------------

        html = html.replace(
            "__DOCTOR_NAME__",
            escapeHTML(doctorName)
        );


        // -----------------------------------------------
        // PRODUCT COUNT
        // -----------------------------------------------

        html = html.replace(
            "__PRODUCT_COUNT__",
            productData.length
        );


        // -----------------------------------------------
        // PRODUCT JSON
        // -----------------------------------------------

        html = html.replace(
            "__PRODUCTS_JSON__",
            JSON.stringify(productData)
                .replace(/</g, "\\u003c")
                .replace(/>/g, "\\u003e")
                .replace(/&/g, "\\u0026")
        );


        // -----------------------------------------------
        // SEND
        // -----------------------------------------------

        res.send(html);

    }

    catch (error) {

        console.error(
            "STORE ERROR:",
            error
        );

        res.status(500).send(`
            <h2>Store Error</h2>
            <pre>${escapeHTML(
                error.message
            )}</pre>
        `);

    }

});


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


module.exports = router;