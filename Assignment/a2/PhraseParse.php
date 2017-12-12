<?php
$text = @$_POST['phrase'];
$textArr = explode(" ", $text);

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
    <table>
        <tr>
            <th>Word</th>
            <th>Length</th>
            <th>Type</th>
        </tr>
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
    </table>
</div>
</body>
</html>
