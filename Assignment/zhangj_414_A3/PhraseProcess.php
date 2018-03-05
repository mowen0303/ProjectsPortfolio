<?php
$text = @$_GET['phrase'];
$buttonName = @$_GET['submitButton'];
$filterType = @$_GET['filterType'];
$dataSet = [];

if (empty($text)) {
    die('phrase can\'t be empty. <a href="PhraseInput.html">Go Back</a>');
}

$textArr = explode(" ", $text);

if (count($textArr) < 3) {
    die('has at least 3 words. <a href="PhraseInput.html">Go Back</a>');
}

foreach($textArr as $index => $item){
    $dataSet[$index]['value'] = $item;
    $dataSet[$index]['length'] = strlen($item);
    $dataSet[$index]['type'] = getValueType($item);
    $dataSet[$index]['typeDesc'] = getValueTypeDesc($dataSet[$index]['type']);
}


function getValueType($val)
{
    $wt1 = '/^[a-zA-Z]{3}[0-9a-zA-Z]*$/';
    $wt2 = '/^[0-9]{3}[0-9a-zA-Z]*$/';
    if (preg_match($wt1, $val)) {
        return "WT1";
    } else if (preg_match($wt2, $val)) {
        return "WT2";
    } else {
        return "WT3";
    }
}

function getValueTypeDesc($val){
    switch ($val){
        case "WT1":
            return "start with 3 alphabetic characters";
            break;
        case "WT2":
            return "start with 3 digits";
            break;
        default:
            return "undefined type";
    }
}

?>