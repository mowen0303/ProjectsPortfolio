<?php
require_once "PhraseProcess.php";
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
        foreach ($dataSet as $item) {
            if($filterType == false || ($filterType == true && $filterType==$item['type'])){
                ?>
                <tr>
                    <td><?php echo $item['value'] ?></td>
                    <td><?php echo $item['length'] ?></td>
                    <td><?php echo $item['typeDesc'] ?></td>
                </tr>
                <?php
            }
        }
        ?>
        </tbody>
    </table>
    <p><a href="PhraseParse.php?phrase=<?php echo $text?>">Back</a></p>
</div>
</body>
</html>

