<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/validateTop.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/config/authority.php";
try {
    $userID = BasicTool::get("id","need a user id");
    $currentUser->validateAuthority("userManage",$userID);
    $userRow = $currentUser->getUserByID($userID);
} catch (Exception $e) {
    BasicTool::echoMessage("Sorry",$e->getMessage());
}
?>
<?php require_once $_SERVER["DOCUMENT_ROOT"]. "/a2/page/frame/top.php"; ?>
    <header class="cmsConHeader">
        <span>User - Edit</span>
    </header>
    <section class="cmsConSection cmsConSectionWhite">
        <header><?php echo $userRow["user_name"]?></header>
        <form action="userController.php?action=updateUserState" method="post">
            <input type="hidden" name="id" value="<?php echo $userID?>"/>
            <p class="inputBox">State: <input type="text" name="state" value="<?php echo $userRow['des']?>"></p>
            <input type="submit" value="submit"/>
        </form>
    </section>
<?php require_once $_SERVER["DOCUMENT_ROOT"]. "/a2/page/frame/bottom.php"; ?>