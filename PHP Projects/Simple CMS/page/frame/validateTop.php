<?php
header("Cache-Control:no-cache,must-revalidate,no-store");
header("Pragma:no-cache");
header("Expires:-1");
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/model/UserModel.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/model/BasicTool.php";
$currentUser = new UserModel();
try{
    $currentUser->validateUser();
}catch(Exception $e){
    $currentUser->logout();
}

try{
    $currentUser->validateAuthority("login");
}catch(Exception $e){
    BasicTool::echoMessage("Your account has been blocked");
}


?>