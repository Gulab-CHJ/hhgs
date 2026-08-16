// function DoctorOrders(doctor = {}, orders = []) {

//     let rows = "";

//     orders.forEach((order, index) => {

//         const products = Array.isArray(order.items)
//             ? order.items.map((item) => {
//                 return `
//                     <div class="product">
//                         <b>${item.name || item.productName || "Product"}</b>
//                         × ${item.quantity || 1}
//                     </div>
//                 `;
//             }).join("")
//             : "-";

//         rows += `
//         <tr>
//             <td>${index + 1}</td>
//             <td>${order.orderId || order._id}</td>
//             <td>${products}</td>
//             <td>₹ ${order.totalAmount || order.total || 0}</td>
//             <td>${order.paymentMethod || "COD"}</td>
//             <td>
//                 <span class="status">
//                     ${order.status || "Pending"}
//                 </span>
//             </td>
//             <td>
//                 ${
//                     order.createdAt
//                         ? new Date(order.createdAt).toLocaleString("en-IN")
//                         : "-"
//                 }
//             </td>
//         </tr>
//         `;
//     });

//     return `
//     <!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Doctor Orders</title>

//         <style>
//             body{
//                 margin:0;
//                 background:#f4f7fb;
//                 font-family:Arial, sans-serif;
//                 color:#1d2939;
//             }

//             .container{
//                 width:95%;
//                 max-width:1300px;
//                 margin:30px auto;
//             }

//             .top{
//                 display:flex;
//                 justify-content:space-between;
//                 align-items:center;
//                 gap:15px;
//                 margin-bottom:20px;
//             }

//             h1{
//                 margin:0 0 8px;
//                 font-size:25px;
//             }

//             p{
//                 margin:0;
//                 color:#667085;
//             }

//             .back-btn{
//                 background:#0d6efd;
//                 color:white;
//                 text-decoration:none;
//                 padding:10px 16px;
//                 border-radius:8px;
//                 white-space:nowrap;
//             }

//             .table-box{
//                 background:white;
//                 border-radius:10px;
//                 overflow-x:auto;
//                 box-shadow:0 2px 10px rgba(0,0,0,.08);
//             }

//             table{
//                 width:100%;
//                 min-width:900px;
//                 border-collapse:collapse;
//             }

//             th, td{
//                 padding:12px;
//                 border:1px solid #e5e7eb;
//                 text-align:center;
//                 font-size:14px;
//             }

//             th{
//                 background:#0d6efd;
//                 color:white;
//             }

//             .product{
//                 text-align:left;
//                 margin-bottom:6px;
//             }

//             .status{
//                 display:inline-block;
//                 padding:5px 10px;
//                 border-radius:20px;
//                 background:#fff3cd;
//                 color:#856404;
//                 font-weight:bold;
//             }

//             .empty{
//                 padding:35px;
//                 text-align:center;
//                 font-size:16px;
//                 color:#667085;
//             }

//             @media(max-width:600px){
//                 .container{
//                     width:94%;
//                 }

//                 .top{
//                     flex-direction:column;
//                     align-items:flex-start;
//                 }
//             }
//         </style>
//     </head>

//     <body>

//         <div class="container">

//             <div class="top">
//                 <div>
//                     <h1>📦 Orders — ${doctor.name || "Doctor"}</h1>
//                     <p>Doctor ID: ${doctor.doctorId || "-"}</p>
//                 </div>

//                 <a href="/admin/manage-doctors" class="back-btn">
//                     ← Back to Doctors
//                 </a>
//             </div>

//             <div class="table-box">

//                 ${
//                     orders.length
//                         ? `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Order ID</th>
//                                     <th>Products</th>
//                                     <th>Total</th>
//                                     <th>Payment</th>
//                                     <th>Status</th>
//                                     <th>Order Date</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 ${rows}
//                             </tbody>
//                         </table>
//                         `
//                         : `
//                         <div class="empty">
//                             No orders found for ${doctor.name || "this doctor"}.
//                         </div>
//                         `
//                 }

//             </div>

//         </div>

//     </body>
//     </html>
//     `;
// }

// module.exports = DoctorOrders;


function DoctorOrders(doctor = {}, orders = []) {

    let rows = "";

    orders.forEach((order, index) => {

        const products = Array.isArray(order.items)
            ? order.items.map((item) => {
                return `
                    <div class="product">
                        <b>${item.name || item.productName || "Product"}</b>
                        × ${item.quantity || 1}
                    </div>
                `;
            }).join("")
            : "-";

        rows += `
        <tr>
            <td>${index + 1}</td>

            <td>${order.orderId || order._id}</td>

            <td>${products}</td>

            <td>₹ ${order.totalAmount || order.total || 0}</td>

            <td>${String(order.paymentMethod || "COD").toUpperCase()}</td>

            <td>
                <span class="status">
                    ${order.status || "Pending"}
                </span>
            </td>

            <td>
                ${
                    order.createdAt
                        ? new Date(order.createdAt).toLocaleString("en-IN")
                        : "-"
                }
            </td>

            <td class="action-cell">

                <form
                    action="/admin/doctor-order/${order._id}/status"
                    method="POST"
                    class="status-form"
                >
                    <select name="status">
                        <option value="Pending"
                            ${order.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="Confirmed"
                            ${order.status === "Confirmed" ? "selected" : ""}>
                            Confirmed
                        </option>

                        <option value="Processing"
                            ${order.status === "Processing" ? "selected" : ""}>
                            Processing
                        </option>

                        <option value="Completed"
                            ${order.status === "Completed" ? "selected" : ""}>
                            Completed
                        </option>

                        <option value="Cancelled"
                            ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>
                    </select>

                    <button type="submit" class="update-btn">
                        Update
                    </button>
                </form>

                <a
                    href="/admin/doctor-order/${order._id}/invoice"
                    class="invoice-btn"
                    target="_blank"
                >
                    ⬇ Invoice
                </a>

            </td>
        </tr>
        `;
    });

    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Doctor Orders</title>

        <style>

            *{
                box-sizing:border-box;
            }

            body{
                margin:0;
                background:#f4f7fb;
                font-family:Arial, sans-serif;
                color:#1d2939;
            }

            .container{
                width:95%;
                max-width:1400px;
                margin:30px auto;
            }

            .top{
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                margin-bottom:20px;
            }

            h1{
                margin:0 0 8px;
                font-size:25px;
            }

            p{
                margin:0;
                color:#667085;
            }

            .back-btn{
                background:#0d6efd;
                color:white;
                text-decoration:none;
                padding:10px 16px;
                border-radius:8px;
                white-space:nowrap;
                font-weight:bold;
            }

            .table-box{
                background:white;
                border-radius:10px;
                overflow-x:auto;
                box-shadow:0 2px 10px rgba(0,0,0,.08);
            }

            table{
                width:100%;
                min-width:1100px;
                border-collapse:collapse;
            }

            th,
            td{
                padding:12px;
                border:1px solid #e5e7eb;
                text-align:center;
                font-size:14px;
            }

            th{
                background:#0d6efd;
                color:white;
                white-space:nowrap;
            }

            .product{
                text-align:left;
                margin-bottom:6px;
            }

            .status{
                display:inline-block;
                padding:5px 10px;
                border-radius:20px;
                background:#fff3cd;
                color:#856404;
                font-weight:bold;
            }

            .action-cell{
                min-width:185px;
            }

            .status-form{
                display:flex;
                justify-content:center;
                gap:5px;
                margin-bottom:8px;
            }

            .status-form select{
                max-width:110px;
                padding:7px 5px;
                border:1px solid #d0d5dd;
                border-radius:6px;
                outline:none;
            }

            .update-btn,
            .invoice-btn{
                border:none;
                color:white;
                padding:7px 9px;
                border-radius:6px;
                font-size:12px;
                font-weight:bold;
                cursor:pointer;
                text-decoration:none;
            }

            .update-btn{
                background:#198754;
            }

            .invoice-btn{
                background:#0d6efd;
                display:inline-block;
            }

            .empty{
                padding:35px;
                text-align:center;
                font-size:16px;
                color:#667085;
            }

            @media(max-width:600px){

                .container{
                    width:94%;
                    margin:20px auto;
                }

                .top{
                    flex-direction:column;
                    align-items:flex-start;
                }

            }

        </style>
    </head>

    <body>

        <div class="container">

            <div class="top">

                <div>
                    <h1>📦 Orders — ${doctor.name || "Doctor"}</h1>
                    <p>Doctor ID: ${doctor.doctorId || "-"}</p>
                </div>

                <a href="/admin/manage-doctors" class="back-btn">
                    ← Back to Doctors
                </a>

            </div>

            <div class="table-box">

                ${
                    orders.length
                        ? `
                        <table>

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order ID</th>
                                    <th>Products</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Order Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${rows}
                            </tbody>

                        </table>
                        `
                        : `
                        <div class="empty">
                            No orders found for ${doctor.name || "this doctor"}.
                        </div>
                        `
                }

            </div>

        </div>

    </body>
    </html>
    `;
}

module.exports = DoctorOrders;