<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/validateTop.php"; ?>
<?php
try {
    $currentUser->validateAuthority("chatView");
    $userCategoryArr = $currentUser->getUserCategories();
} catch (Exception $e) {
    BasicTool::echoMessage("Sorry",$e->getMessage());
}
?>
<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/top.php"; ?>
<header class="cmsConHeader">
    <span>Chat Room</span>
</header>
<section class="cmsConSection cmsConSectionWhite">
    <header>Chat Room ( Here's information are protected)</header>
    <section>
        <div id="chatRoom"></div>
    </section>
</section>
<section class="cmsConSection cmsConSectionWhite">
    <section id="msgBox"></section>
    <section>
        <div class="chatInputBox">
            <input type="text" id="chatInput" name="message"/><button id="chatButton">Send</button>
        </div>
    </section>
</section>
<?php require_once $_SERVER["DOCUMENT_ROOT"]."/a2/page/frame/bottom.php"; ?>
