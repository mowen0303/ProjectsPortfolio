<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Login</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="../../asset/js/js.js"></script>
    <link href="../../asset/css/css.css" rel="stylesheet" type="text/css">
</head>

<body>
<div id="cmsContainer">
    <nav class="cmsNav">
        <header>
            <div class="avatar"><?php BasicTool::echoProtectedImage($_SERVER["DOCUMENT_ROOT"]."/a2/asset/image/".@$_COOKIE['uv'])?></div>
            <div>
                <p class="name"><?php echo @$_COOKIE["un"]?></p>
            </div>
        </header>
        <section>
            <ul>
                <li><a href="../frame/index.php">Welcome</a></li>
                <li><a href="../chat/chatRoomPage.php">Chat Room</a></li>
                <li><a href="../user/userPage.php">User List</a></li>
                <li><a href="../user/userCategoryPage.php">User Category</a></li>
            </ul>
        </section>
        <footer>
            <a href="../user/userController.php?action=logout">Logout</a>
        </footer>
    </nav>
    <div class="cmsCon">