function AddStudent() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Add Student</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:#f4f6f9;
    padding:30px;
}

.container{
    max-width:650px;
    margin:auto;
    background:#fff;
    padding:25px;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,.15);
}

h2{
    text-align:center;
    margin-bottom:25px;
    color:#333;
}

label{
    display:block;
    margin-bottom:6px;
    font-weight:bold;
    color:#444;
}

input,
textarea{
    width:100%;
    padding:12px;
    margin-bottom:18px;
    border:1px solid #ccc;
    border-radius:6px;
    font-size:15px;
}

textarea{
    resize:vertical;
    min-height:100px;
}

button{
    width:100%;
    padding:14px;
    border:none;
    background:#0d6efd;
    color:#fff;
    font-size:16px;
    border-radius:6px;
    cursor:pointer;
}

button:hover{
    background:#0b5ed7;
}

</style>

</head>

<body>

<div class="container">

<h2>Add Student</h2>

<form
action="/admin/add-student"
method="POST"
enctype="multipart/form-data"
>

<label>Student Name</label>

<input
type="text"
name="name"
required
>

<label>Father Name</label>

<input
type="text"
name="father"
required
>

<label>Class</label>

<input
type="text"
name="class"
required
>

<label>Email</label>

<input
type="email"
name="email"
>

<label>Phone</label>

<input
type="text"
name="phone"
>

<label>Address</label>

<textarea
name="address"
></textarea>

<label>Description</label>

<textarea
name="description"
placeholder="Write about student..."
></textarea>

<label>Student Photo</label>

<input
type="file"
name="image"
accept="image/*"
required
>

<button type="submit">
Add Student
</button>

</form>

</div>

</body>
</html>
`;
}

module.exports = AddStudent;