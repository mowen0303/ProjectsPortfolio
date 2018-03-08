<?php
/**
 * Created by PhpStorm.
 * User: Jerry
 * Date: 2017-11-06
 * Time: 7:53 PM
 */
require_once $_SERVER["DOCUMENT_ROOT"].'/a2/model/UserModel.php';
require_once $_SERVER["DOCUMENT_ROOT"].'/a2/model/BasicTool.php';
require_once $_SERVER["DOCUMENT_ROOT"].'/a2/model/ChatModel.php';
$currentUser = new UserModel();
$chatModel = new ChatModel();
call_user_func($_GET['action']);

function addMessageWithJson(){
    global $currentUser;
    global $chatModel;
    try{
        $currentUser->validateAuthority("chatPost");
        $userID = $currentUser->getUserID();
        $message = BasicTool::post("message","say something");
        $chatModel->addChat($userID,$message);
        $arr = [];
        $arr['user_name'] = $currentUser->getUserName();
        $arr['chat_message'] = $message;
        BasicTool::echoJson(1,"success",$arr);
    }catch(Exception $e){
        BasicTool::echoJson(0, $e->getMessage());
    }
}

function getMessagesWithJson(){
    global $chatModel;
    global $currentUser;
    try{
        $currentUser->validateAuthority("chatView");
        $messageList = $chatModel->getChats();
        BasicTool::echoJson(1,"success",$messageList);
    }catch(Exception $e){
        BasicTool::echoJson(0, $e->getMessage());
    }
}

?>

