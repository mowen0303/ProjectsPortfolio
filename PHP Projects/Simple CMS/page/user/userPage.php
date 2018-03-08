<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/validateTop.php";
try {
    $userArr = $currentUser->getUsers();
} catch (Exception $e) {
    BasicTool::echoMessage("Sorry",$e->getMessage());
}
?>

<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/top.php"; ?>
    <header class="cmsConHeader">
        <span>User list</span>
    </header>
    <section class="cmsConSection">
        <div class="userContainer">
        <?php foreach($userArr as $row) { ?>
        <div class="userBox">
            <div class="userAvatarBox"><?php BasicTool::echoProtectedImage($_SERVER["DOCUMENT_ROOT"]."/a2/asset/image/".$row['avatar'])?></div>
            <div class="UserInfoBox">
                <div class="tooBox"><a href="userEditPage.php?id=<?php echo $row['user_id']?>" class="icon iconfont icon-xiugai"></a></div>
                <h1><?php echo $row['user_name']?></h1>
                <p><span>State:</span><?php echo $row['des']?></p>
                <p><span>User Group:</span><?php echo $row['user_category_title']?></p>
            </div>
        </div>
        <?php } ?>
        </div>
    </section>
<?php require_once $_SERVER["DOCUMENT_ROOT"]. "/a2/page/frame/bottom.php"; ?>
