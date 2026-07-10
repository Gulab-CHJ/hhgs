function AdminLogin(error = "") {

return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Admin Login</title>

<link rel="stylesheet" href="/css/admin.css">

<style>
.error-message{
    background:#ffe5e5;
    color:#d8000c;
    border:1px solid #ffb3b3;
    padding:10px;
    border-radius:8px;
    margin-bottom:15px;
    text-align:center;
    font-weight:bold;
}
</style>

</head>

<body>

<div class="login-container">

<div class="login-card">

<img src="/images/GS LOGO.png" alt="Logo">

<h2>HHGS Admin</h2>

<p>Sign in to continue</p>

${error ? `<div class="error-message">${error}</div>` : ""}

<form action="/admin/login" method="POST">

<input
type="text"
name="username"
placeholder="Username"
required
>

<input
type="password"
name="password"
placeholder="Password"
required
>

<button type="submit">
Login
</button>

</form>

<a href="/">← Back Home</a>

</div>

</div>

<script>

// 3 सेकंड बाद Error Hide
setTimeout(()=>{
const box=document.querySelector(".error-message");
if(box){
box.style.display="none";
}
},3000);

// Refresh होने पर URL से error हटाओ
const url=new URL(window.location);
if(url.searchParams.has("error")){
url.searchParams.delete("error");
window.history.replaceState({},document.title,url.pathname);
}

</script>

</body>
</html>
`;

}

module.exports = AdminLogin;

// function AdminLogin(error = "") {
//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Admin Login</title>

//     <style>
//         body{
//             font-family: Arial, sans-serif;
//             background:#f4f4f4;
//             display:flex;
//             justify-content:center;
//             align-items:center;
//             height:100vh;
//             margin:0;
//         }

//         .box{
//             width:350px;
//             background:#fff;
//             padding:25px;
//             border-radius:10px;
//             box-shadow:0 0 10px rgba(0,0,0,.2);
//         }

//         h2{
//             text-align:center;
//             margin-bottom:20px;
//         }

//         input{
//             width:100%;
//             padding:10px;
//             margin:10px 0;
//             box-sizing:border-box;
//         }

//         button{
//             width:100%;
//             padding:10px;
//             background:#007bff;
//             color:#fff;
//             border:none;
//             cursor:pointer;
//             border-radius:5px;
//         }

//         button:hover{
//             background:#0056b3;
//         }

//         .error{
//             color:red;
//             text-align:center;
//             margin-bottom:10px;
//         }
//     </style>
// </head>
// <body>

// <div class="box">
//     <h2>Admin Login</h2>

//     ${error ? `<div class="error">${error}</div>` : ""}

//     <form action="/admin/login" method="POST">
//         <input type="text" name="username" placeholder="Username" required>

//         <input type="password" name="password" placeholder="Password" required>

//         <button type="submit">Login</button>
//     </form>
// </div>

// </body>
// </html>
// `;
// }

// module.exports = AdminLogin;