<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/validateTop.php"; ?>
<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/top.php"; ?>
<header class="cmsConHeader">
    <span>Welcome</span>
</header>
<section class="cmsConSection cmsConSectionWhite">
    <header>Protected Images</header>
    <section class="imgList">
        <?php BasicTool::echoProtectedImage($_SERVER["DOCUMENT_ROOT"]."/a2/asset/image/1.jpg")?>
        <?php BasicTool::echoProtectedImage($_SERVER["DOCUMENT_ROOT"]."/a2/asset/image/2.jpg")?>
        <?php BasicTool::echoProtectedImage($_SERVER["DOCUMENT_ROOT"]."/a2/asset/image/3.jpg")?>
    </section>
</section>
<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/bottom.php"; ?>
