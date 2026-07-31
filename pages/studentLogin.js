function StudentLogin(){

return `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Student Login</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',Arial,sans-serif;
}


body{

    min-height:100vh;

    background:
    linear-gradient(
    135deg,
    #2563eb,
    #06b6d4
    );

    display:flex;
    justify-content:center;
    align-items:center;

}


.login-card{

    width:380px;

    background:
    rgba(255,255,255,0.95);

    padding:35px;

    border-radius:25px;

    box-shadow:
    0 20px 50px rgba(0,0,0,0.25);

    animation:show 0.6s ease;

}



@keyframes show{

from{
    opacity:0;
    transform:translateY(40px);
}

to{
    opacity:1;
    transform:translateY(0);
}

}



.logo{

    width:80px;
    height:80px;

    margin:auto;

    border-radius:50%;

    overflow:hidden;

    background:white;

    display:flex;
    justify-content:center;
    align-items:center;

    box-shadow:0 5px 15px rgba(0,0,0,.2);

}


.logo img{

    width:100%;
    height:100%;

    object-fit:cover;

}

    color:white;

    display:flex;
    justify-content:center;
    align-items:center;

    font-size:32px;
    font-weight:bold;

}



h2{

    text-align:center;

    margin-top:20px;

    color:#1e3a8a;

}



p{

    text-align:center;

    color:#64748b;

    margin:10px 0 25px;

}



.input-box{

    position:relative;

}



input{

    width:100%;

    padding:14px 15px;

    margin-bottom:18px;

    border-radius:12px;

    border:1px solid #cbd5e1;

    outline:none;

    font-size:15px;

    transition:.3s;

}



input:focus{

    border-color:#2563eb;

    box-shadow:
    0 0 10px rgba(37,99,235,.3);

}



button{

    width:100%;

    padding:14px;

    border:none;

    border-radius:12px;

    background:

    linear-gradient(
    135deg,
    #2563eb,
    #06b6d4
    );

    color:white;

    font-size:17px;

    font-weight:600;

    cursor:pointer;

    transition:.3s;

}



button:hover{

    transform:translateY(-3px);

    box-shadow:
    0 10px 25px rgba(37,99,235,.4);

}



.footer{

    text-align:center;

    margin-top:20px;

    font-size:13px;

    color:#64748b;

}


</style>


</head>


<body>


<div class="login-card">


<div class="logo">
    <img src="/images/GS LOGO.png." alt="Logo">
</div>


<h2>
Student Login
</h2>


<p>
Welcome back! Login to continue
</p>



<form method="POST" action="/student-login">


<input 
type="text"
name="roll"
placeholder="Enter Roll Number"
required
>



<input 
type="password"
name="password"
placeholder="Enter Password"
required
>



<button>
Login Now
</button>


</form>


<div class="footer">

© 2026 Gulab Service Institute

</div>


</div>


</body>

</html>


`;

}


module.exports = StudentLogin;