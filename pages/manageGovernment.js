function ManageGovernment(persons = []) {

let rows = "";


persons.forEach((person,index)=>{

rows += `

<tr>

<td>${index + 1}</td>


<td>

<img src="${person.image || "/images/default.png"}"
style="
width:60px;
height:60px;
border-radius:50%;
object-fit:cover;
">

</td>


<td>${person.name}</td>


<td>${person.position}</td>


<td>${person.department || "-"}</td>


<td>${person.phone || "-"}</td>


<td>${person.address || "-"}</td>


<td>

<a href="/admin/delete-government/${person._id}"
onclick="return confirm('Delete this person?')"
style="
background:#dc2626;
color:white;
padding:8px 12px;
border-radius:6px;
text-decoration:none;
">

Delete

</a>

</td>


</tr>

`;

});



return `

<!DOCTYPE html>

<html>

<head>

<title>Manage Government Person</title>


<style>


body{

font-family:Arial;
background:#f1f5f9;
padding:20px;

}


.container{

background:white;
padding:20px;
border-radius:12px;
box-shadow:0 5px 20px #ddd;

}


h2{

text-align:center;
color:#2563eb;

}



table{

width:100%;
border-collapse:collapse;

}


th{

background:#2563eb;
color:white;
padding:12px;

}


td{

padding:12px;
border-bottom:1px solid #ddd;
text-align:center;

}


tr:hover{

background:#f8fafc;

}



.add-btn{

display:inline-block;
background:#16a34a;
color:white;
padding:10px 15px;
border-radius:8px;
text-decoration:none;
margin-bottom:15px;

}



@media(max-width:700px){

table{

font-size:12px;

}


td,th{

padding:8px;

}


}

</style>


</head>


<body>


<div class="container">


<h2>
Manage Government Person
</h2>


<a href="/admin/add-government"
class="add-btn">

+ Add Government Person

</a>



<table>


<thead>

<tr>

<th>#</th>

<th>Photo</th>

<th>Name</th>

<th>Position</th>

<th>Department</th>

<th>Phone</th>

<th>Address</th>

<th>Action</th>


</tr>

</thead>


<tbody>


${rows || 

`
<tr>

<td colspan="8">

No Government Person Found

</td>

</tr>
`

}


</tbody>


</table>


</div>


</body>

</html>


`;

}


module.exports = ManageGovernment;