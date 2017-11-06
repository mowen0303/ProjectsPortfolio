<?php


$dbInfo = array('host'=>'localhost','user'=>'root','password'=>'','database'=>'atyorku');

@header("Content-type:text/html; charset=utf-8");
@header("Access-Control-Allow-Origin: *"); 
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/SqlTool.class.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/BasicTool.class.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/Model.class.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/authority.php";
use \admin\user\UserModel as UserModel;

function __autoload($name){
    $name = str_replace("\\","/",$name);
    include_once $_SERVER['DOCUMENT_ROOT']."/{$name}.class.php";
}

//隐藏notice和warning级别错误
error_reporting(E_ALL^E_WARNING^E_NOTICE);
date_default_timezone_set("America/Toronto");

?>