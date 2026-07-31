// function EditService(service = {}) {

// return `

// <!DOCTYPE html>
// <html>

// <head>

// <title>Edit Service</title>

// <meta name="viewport" content="width=device-width, initial-scale=1">

// <style>

// body{
// background:linear-gradient(135deg,#0f172a,#2563eb);
// font-family:Poppins,sans-serif;
// min-height:100vh;
// display:flex;
// justify-content:center;
// align-items:center;
// }

// .card{

// width:90%;
// max-width:600px;
// background:white;
// padding:30px;
// border-radius:20px;
// box-shadow:0 20px 40px #0005;

// }


// h1{
// text-align:center;
// }


// input,textarea{

// width:100%;
// padding:14px;
// margin:10px 0;
// border-radius:10px;
// border:1px solid #ddd;

// }


// textarea{

// height:120px;

// }


// img{

// width:150px;
// height:150px;
// object-fit:cover;
// border-radius:15px;

// }


// button{

// width:100%;
// padding:15px;
// background:#2563eb;
// color:white;
// border:0;
// border-radius:10px;
// font-size:18px;

// }


// a{

// display:block;
// text-align:center;
// margin-top:15px;

// }


// </style>

// </head>


// <body>


// <div class="card">


// <h1>Edit Service</h1>


// <form action="/admin/edit-service/${service._id}" method="POST">


// <label>
// Service Name
// </label>


// <input

// name="title"

// value="${service.title || ''}"

// required>



// <label>
// Image
// </label>


// <input

// name="image"

// id="image"

// value="${service.image || ''}">


// <br>


// <img

// id="preview"

// src="${service.image || '/images/no-image.png'}">


// <label>
// Description
// </label>


// <textarea name="description">

// ${service.description || ''}

// </textarea>



// <button>

// Update Service

// </button>


// <a href="/admin/manage-services">

// Cancel

// </a>



// </form>


// </div>



// <script>

// let image=document.getElementById("image");

// let preview=document.getElementById("preview");


// image.addEventListener("input",()=>{

// preview.src=image.value;

// });


// </script>


// </body>

// </html>


// `;

// }


// module.exports = EditService;

function EditService(service = {}) {

return `

<!DOCTYPE html>
<html>

<head>

<title>Edit Service</title>

<meta name="viewport" content="width=device-width, initial-scale=1">


<style>

body{

background:linear-gradient(135deg,#0f172a,#2563eb);

font-family:Arial;

min-height:100vh;

display:flex;

justify-content:center;

align-items:center;

padding:20px;

}


.card{

width:100%;

max-width:600px;

background:white;

padding:30px;

border-radius:20px;

box-shadow:0 20px 40px #0005;

}


h1{

text-align:center;

}


input,textarea{

width:100%;

padding:14px;

margin:10px 0;

border-radius:10px;

border:1px solid #ddd;

}



textarea{

height:120px;

}



img{

width:150px;

height:150px;

object-fit:cover;

border-radius:15px;

}



.feature-row{

display:flex;

gap:10px;

margin-bottom:10px;

}



.feature-row input{

flex:1;

}



.remove{

width:45px;

background:red;

color:white;

border:none;

border-radius:8px;

}



.add{

background:orange;

color:white;

border:none;

padding:10px;

border-radius:8px;

cursor:pointer;

}



button{

width:100%;

padding:15px;

background:#2563eb;

color:white;

border:0;

border-radius:10px;

font-size:18px;

margin-top:20px;

}



a{

display:block;

text-align:center;

margin-top:15px;

}



</style>


</head>


<body>


<div class="card">


<h1>
Edit Service
</h1>



<form action="/admin/edit-service/${service._id}" method="POST">



<label>
Service Name
</label>


<input

name="title"

value="${service.title || ''}"

required>



<label>
Image URL
</label>


<input

name="image"

id="image"

value="${service.image || ''}">


<img

id="preview"

src="${service.image || '/images/no-image.png'}">





<label>
Description
</label>


<textarea

name="description">

${service.description || ''}

</textarea>





<label>
Service Features
</label>



<div id="featuresBox">


${
(service.features || [])
.map(feature=>`

<div class="feature-row">


<input

type="text"

name="features[]"

value="${feature}"

>


<button

type="button"

class="remove"

onclick="removeFeature(this)">

❌

</button>


</div>

`).join("")
}



</div>



<button

type="button"

class="add"

onclick="addFeature()">

➕ Add Feature

</button>




<button type="submit">

Update Service

</button>



<a href="/admin/manage-services">

Cancel

</a>



</form>



</div>




<script>


let image=document.getElementById("image");

let preview=document.getElementById("preview");



image.addEventListener("input",()=>{

preview.src=image.value;

});




// Add Feature

function addFeature(){


let box=document.getElementById("featuresBox");


let div=document.createElement("div");


div.className="feature-row";


div.innerHTML =

'<input type="text" name="features[]" placeholder="Enter Feature">'+

'<button type="button" class="remove" onclick="removeFeature(this)">❌</button>';


box.appendChild(div);


}




function removeFeature(btn){

btn.parentElement.remove();

}



</script>



</body>

</html>


`;

}


module.exports = EditService;