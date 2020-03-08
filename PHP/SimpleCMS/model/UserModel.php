<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/a2/model/Model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/a2/config/authority.php";

/**
 * Created by PhpStorm.
 * User: Jerry
 * Date: 2017-11-06
 * Time: 7:36 PM
 */
class UserModel extends Model
{
    private $privateKey = "jerry";

    public function login($username, $password, $keepLogin = false)
    {
        $sql = "select user.*,user_category.user_category_title,user_category.user_category_authority from user inner join user_category on user.user_category_id = user_category.user_category_id where user_name = '{$username}'";
        $user = $this->getRowBySql($sql) or BasicTool::throwException('user name is wrong');
        $user["user_password"] == md5($password) or BasicTool::throwException("password is wrong");
        //set expire time based on user selection
        $time = $keepLogin == true ? time() + 3600 * 24 * 3 : 0;
        //protected data
        $protectedDataArr = [];
        $protectedDataArr['uid'] = $user['user_id'];
        $protectedDataArr['ua'] = $user['user_category_authority'];
        $protectedDataArr['un'] = $user['user_name'];
        $protectedDataArr['uv'] = $user['avatar'];
        $protectedDataArr['et'] = $time;
        $protectedDataArr['PublicKey'] = self::generatePublicKey($protectedDataArr, $keepLogin);
        //set cookie
        foreach ($protectedDataArr as $k => $v) {
            setcookie($k, $v, $time, '/');
        }

    }

    public function logout()
    {
        foreach ($_COOKIE as $k => $v) {
            setcookie($k, $v, time() - 1, '/');
        }
        header("Location: http://www.atyorku.ca/a2/login.php");
        die();
    }

    public function validateUser()
    {
        @$_COOKIE['uid'] or BasicTool::throwException("not login");
        $protectedDataArr = [];
        $protectedDataArr['uid'] = @$_COOKIE['uid'];
        $protectedDataArr['ua'] = @$_COOKIE['ua'];
        $protectedDataArr['un'] = @$_COOKIE['un'];
        $protectedDataArr['uv'] = @$_COOKIE['uv'];
        $protectedDataArr['et'] = @$_COOKIE['et'];
        self::generatePublicKey($protectedDataArr) == @$_COOKIE['PublicKey'] or BasicTool::throwException("user data has been changed unauthorizedly!");
    }

    public function getUserID()
    {
        $this->validateUser();
        return @$_COOKIE['uid'];
    }

    public function getUserName()
    {
        $this->validateUser();
        return @$_COOKIE['un'];
    }

    private function generatePublicKey($protectedDataArr)
    {
        return md5(implode($protectedDataArr) . $this->privateKey);
    }

    public function validateAuthority($authorityKey, $ownerID = false)
    {
        global $RIGHT;
        $this->validateUser();
        //neither owner nor admin
        if (($ownerID != @$_COOKIE["uid"]) && (($RIGHT[$authorityKey] & $_COOKIE["ua"]) == 0)) {
            BasicTool::throwException("You have no authority");
        }

    }

    public function getUserByID($userID)
    {
        $sql = "select user.*,user_category.user_category_title,user_category.user_category_authority from user inner join user_category on user.user_category_id = user_category.user_category_id where user_id = '{$userID}'";
        $result = $this->getRowBySql($sql) or BasicTool::throwException("can't find the user according to ID");
        return $result;
    }

    public function getUsers()
    {
        $sql = "select user.*,user_category.user_category_title,user_category.user_category_authority from user inner join user_category on user.user_category_id = user_category.user_category_id";
        return $this->getListBySql($sql);
    }

    public function getUserCategoryByID($categoryID)
    {
        $sql = "select * from user_category where user_category_id = {$categoryID}";
        $result = $this->getRowBySql($sql) or BasicTool::throwException("can't find the user category according to ID");
        return $result;
    }

    public function getUserCategories()
    {
        $sql = "select * from user_category";
        return $this->getListBySql($sql);
    }

    public function updateUserCategoryAuthority($userCategoryID, $authorityValue)
    {
        $sql = "update user_category set user_category_authority = {$authorityValue} WHERE user_category_id in ($userCategoryID)";
        $this->query($sql);
    }

    public function updateUserState($id, $val)
    {
        $sql = "update user set des = '{$val}' WHERE user_id in ($id)";
        $this->query($sql);
    }


}