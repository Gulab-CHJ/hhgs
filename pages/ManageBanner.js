// function ManageBanner(banners) {

// let html = "";

// banners.forEach((banner) => {

// html += `
// <tr>

// <td>
// <img src="${banner.image}" width="180" height="80" style="object-fit:cover;border-radius:8px;">
// </td>

// <td>${banner.title}</td>

// <td>
// <a href="${banner.link}" target="_blank">
// ${banner.link}
// </a>
// </td>

// <td>
// ${banner.active
// ? '<span style="color:green;font-weight:bold;">Active</span>'
// : '<span style="color:red;font-weight:bold;">Inactive</span>'}
// </td>

// <td>

// <a class="edit"
// href="/admin/edit-banner/${banner._id}">
// ✏️ Edit
// </a>

// <a class="delete"
// onclick="return confirm('Delete Banner?')"
// href="/admin/delete-banner/${banner._id}">
// 🗑 Delete
// </a>

// ${banner.active
// ? `<a class="deactivate"
// href="/admin/deactivate-banner/${banner._id}">
// 🚫 Deactivate
// </a>`
// : `<a class="activate"
// href="/admin/activate-banner/${banner._id}">
// ✅ Activate
// </a>`}

// </td>

// </tr>
// `;

// });

// return `
// <!DOCTYPE html>

// <html>

// <head>

// <title>Manage Banner</title>

// <style>

// body{
// font-family:Arial;
// background:#f5f5f5;
// padding:30px;
// }

// .container{
// max-width:1200px;
// margin:auto;
// background:#fff;
// padding:20px;
// border-radius:10px;
// box-shadow:0 5px 15px rgba(0,0,0,.15);
// }

// h1{
// text-align:center;
// margin-bottom:20px;
// }

// table{
// width:100%;
// border-collapse:collapse;
// }

// th,td{
// border:1px solid #ddd;
// padding:12px;
// text-align:center;
// }

// th{
// background:#2563eb;
// color:#fff;
// }

// a{
// text-decoration:none;
// padding:8px 15px;
// border-radius:5px;
// color:#fff;
// margin:2px;
// display:inline-block;
// font-size:14px;
// }

// .edit{
// background:#2563eb;
// }

// .delete{
// background:#dc2626;
// }

// .activate{
// background:#16a34a;
// }

// .deactivate{
// background:#f59e0b;
// }

// img{
// max-width:180px;
// }

// </style>

// </head>

// <body>

// <div class="container">

// <h1>🖼 Manage Banner</h1>

// <table>

// <tr>

// <th>Banner</th>
// <th>Title</th>
// <th>Link</th>
// <th>Status</th>
// <th>Action</th>

// </tr>

// ${html}

// </table>

// </div>

// </body>

// </html>
// `;

// }

// module.exports = ManageBanner;