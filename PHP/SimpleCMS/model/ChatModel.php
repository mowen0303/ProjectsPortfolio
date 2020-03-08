<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/model/Model.php";
require_once $_SERVER["DOCUMENT_ROOT"]."/a2/config/authority.php";

/**
 * Created by PhpStorm.
 * User: Jerry
 * Date: 2017-11-06
 * Time: 7:36 PM
 */
class ChatModel extends Model
{

    public function getChats(){
        $sql = "select * from chat inner join user on chat.user_id = user.user_id";
        return $this->getListBySql($sql);
    }

    public function addChat($uid,$message){
        $sql = "insert into chat (user_id,chat_message) values ($uid,'{$message}')";
        return $this->query($sql);
    }



}