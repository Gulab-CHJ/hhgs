function EditStudent(student) {
    return `
<!DOCTYPE html>
<html>
<head>
<title>Edit Student</title>
</head>
<body>

<form action="/admin/edit-student/${student._id}"
      method="POST"
      enctype="multipart/form-data">

<label>Student Name</label>
<input type="text" name="name" value="${student.name || ""}" required>

<label>Father Name</label>
<input type="text" name="fatherName" value="${student.fatherName || ""}">

<label>Course</label>
<input type="text" name="course" value="${student.course || ""}">

<label>Email</label>
<input type="email" name="email" value="${student.email || ""}">

<label>Mobile</label>
<input type="text" name="mobile" value="${student.mobile || ""}">

<label>Address</label>
<textarea name="address">${student.address || ""}</textarea>

<label>Description</label>
<textarea name="description">${student.description || ""}</textarea>

<label>Current Photo</label>
<img src="${student.image}" width="150">

<label>Change Photo</label>
<input type="file" name="image">

<button type="submit">Update Student</button>

</form>

</body>
</html>
`;
}

module.exports = EditStudent;