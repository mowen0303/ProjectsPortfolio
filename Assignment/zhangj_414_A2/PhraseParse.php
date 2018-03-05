<?php
$text = @$_POST['phrase'];
$buttonName = @$_POST['submitButton'];

if (empty($text)) {
    die('phrase can\'t be empty. <a href="PhraseInput.html">Go Back</a>');
}

$textArr = explode(" ", $text);

if (count($textArr) < 3) {
    die('has at least 3 words. <a href="PhraseInput.html">Go Back</a>');
}


function getValueType($val)
{
    $wt1 = '/^[a-zA-Z]{3}[0-9a-zA-Z]*$/';
    $wt2 = '/^[0-9]{3}[0-9a-zA-Z]*$/';
    if (preg_match($wt1, $val)) {
        echo "start with 3 alphabetic characters";
    } else if (preg_match($wt2, $val)) {
        echo "start with 3 digits";
    } else {
        echo "undefined type";
    }
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>PhraseInput</title>
    <link href="Phrase.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="Phrase.js"></script>
</head>
<body>
<div id="container">
    <p>Your phrase parsed into words :</p>
    <table>
        <thead>
            <tr>
                <th>Word</th>
                <th>Length</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($textArr as $key => $value) {
                ?>
                <tr>
                    <td><?php echo $value ?></td>
                    <td><?php echo strlen($value) ?></td>
                    <td><?php echo getValueType($value) ?></td>
                </tr>
                <?php
            }
            ?>
        </tbody>
    </table>
</div>
</body>
</html>
