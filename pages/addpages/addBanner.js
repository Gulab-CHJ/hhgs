function AddBanner() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Banner</title>
</head>
<body>

<h1>Add Banner</h1>

<form action="/admin/add-banner" method="POST" enctype="multipart/form-data">

    <input type="text" name="title" placeholder="Banner Title" required><br><br>

    <input type="file" name="image" accept="image/*" required><br><br>

    <input type="text" name="link" placeholder="Banner Link"><br><br>

    <button type="submit">Save Banner</button>

</form>

</body>
</html>
`;
}

module.exports = AddBanner;