<?php
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//数据库
$dbInfo = array('host'=>'localhost','user'=>'root','password'=>'','database'=>'atyorku');
//-------------------------------------------------------------------------------------------------------------------------------------------------------
@header("Content-type:text/html; charset=utf-8");
@header("Access-Control-Allow-Origin: *"); //开启跨域访问
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/SqlTool.class.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/BasicTool.class.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/Model.class.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/authority.php";
require_once $_SERVER['DOCUMENT_ROOT']."/commonClass/Credit.class.php";
function __autoload($name){
    $name = str_replace("\\","/",$name);
    if(!include_once $_SERVER['DOCUMENT_ROOT']."/{$name}.class.php"){
        !include_once $_SERVER['DOCUMENT_ROOT']."/admin/aws/{$name}.php";
    };
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//隐藏notice和warning级别错误
error_reporting(E_ALL^E_WARNING^E_NOTICE^E_STRICT);
date_default_timezone_set("America/Toronto");

?>