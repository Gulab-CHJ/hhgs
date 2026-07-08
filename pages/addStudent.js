function AddStudent() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student</title>

    <style>
        body{
            font-family:Arial,sans-serif;
            background:#f5f5f5;
            margin:0;
            padding:30px;
        }

        .container{
            max-width:600px;
            margin:auto;
            background:#fff;
            padding:25px;
            border-radius:10px;
            box-shadow:0 5px 15px rgba(0,0,0,.1);
        }

        h2{
            text-align:center;
            margin-bottom:20px;
        }

        input,
        textarea{
            width:100%;
            padding:10px;
            margin-bottom:15px;
            border:1px solid #ccc;
            border-radius:5px;
            box-sizing:border-box;
        }

        button{
            width:100%;
            padding:12px;
            border:none;
            background:#007bff;
            color:#fff;
            font-size:16px;
            border-radius:5px;
            cursor:pointer;
        }

        button:hover{
            background:#0056b3;
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

<input
    type="text"
    name="name"
    placeholder="Student Name"
    required
>

<input
    type="text"
    name="father"
    placeholder="Father Name"
>

<input
    type="email"
    name="email"
    placeholder="Email"
>

<input
    type="text"
    name="phone"
    placeholder="Phone Number"
>

<textarea
    name="address"
    placeholder="Address"
></textarea>

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