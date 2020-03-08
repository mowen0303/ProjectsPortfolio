<?php
//disable browser cache
header("Cache-Control:no-cache,must-revalidate,no-store");
header("Pragma:no-cache");
header("Expires:-1");
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/model/BasicTool.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/model/UserModel.php";
$currentUser = new UserModel();
try{
    //if user has validate cookie, then go to SIS
    $currentUser->validateUser();
    header("Location: http://www.atyorku.ca/a2/page/frame/index.php");
}catch(Exception $e){

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Login</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="asset/js/js.js"></script>
    <link href="asset/css/css.css" rel="stylesheet" type="text/css">
</head>

<body>
<div id="containerLogin">
    <header>
        <h1>ITEC 4020</h1>
        <p>Assignment 2 made by GROUP 3</p>
    </header>
    <section class="loginFormBox">
        <div id="errorBox"><span></span><i>x</i></div>
        <input type="text" name="username" value="">
        <input type="password" name="password" value="">
        <label class="checkboxBox"><input type="checkbox"  value="1" name="isAutoLogin"/> Auto login in next 3 days</label>
        <button id="submitButton">Login</button>
    </section>
</div>
</body>
</html>