function AdminDashboard() {

return `

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Dashboard</title>

<link rel="stylesheet" href="/css/admin.css">

<style>
body{
    font-family:Arial,sans-serif;
    background:#f5f5f5;
}

.dashboard{
    width:500px;
    margin:40px auto;
    background:#fff;
    padding:20px;
    border-radius:10px;
    box-shadow:0 0 10px rgba(0,0,0,.1);
}

h1{
    text-align:center;
}

#search{
    width:100%;
    padding:10px;
    margin:20px 0;
    font-size:16px;
    border:1px solid #ccc;
    border-radius:6px;
    box-sizing:border-box;
}

.menu a{
    display:block;
    padding:10px 0;
    color:#000;
    text-decoration:none;
    border-bottom:1px solid #ddd;
    font-size:18px;
}

.menu a:hover{
    color:blue;
}
</style>

</head>

<body>

<div class="dashboard">

<h1>Welcome Admin 👋</h1>

<input
type="text"
id="search"
placeholder="Search..."
onkeyup="searchMenu()"
>

<div class="menu" id="menu">

<a href="/admin/add-service">Add Service</a>

<a href="/admin/edit-service">Edit Service</a>



<a href="/admin/delete-service">Delete Service</a>

<hr>

<a href="/admin/add-doctor">👨‍⚕️ Add Doctor</a>

<a href="/admin/doctors">👨‍⚕️ Manage Doctors</a>

<a href="/admin/edit-doctor">✏️ Edit Doctor</a>

<a href="/admin/delete-doctor">🗑 Delete Doctor</a>

<hr>


<a href="/admin/categories">Categories</a>

<a href="/admin/users">Users</a>

<a href="/admin/change-password">Change Password</a>

<a href="/">Home</a>
<a href="/admin/students">👨‍🎓 Students</a>

</div>

</div>

<script>
function searchMenu(){

let input=document.getElementById("search").value.toLowerCase();

let links=document.querySelectorAll("#menu a");

links.forEach(link=>{

if(link.textContent.toLowerCase().includes(input)){
link.style.display="block";
}else{
link.style.display="none";
}

});

}
</script>

</body>

</html>

`;

}

 module.exports = AdminDashboard;