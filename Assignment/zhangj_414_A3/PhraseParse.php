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
    <script type="text/javascript">
        function show($val) {
            window.location.href = "PhraseFilter.php?filterType=" + $val + "&phrase=<?php echo $text?>" ;
        }
    </script>
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
            if ($filterType == false || ($filterType == true && $filterType == $item['type'])) {
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
    <p>
        <button class="btn" onclick="show('WT1')">Show only WT1</button>
        <button class="btn" onclick="show('WT2')">Show only WT2</button>
    </p>
    <p><a href="PhraseFilter.php?filterType=WT1&phrase=<?php echo $text?>" class="btn">Show only WT1</a><a href="PhraseFilter.php?filterType=WT2&phrase=<?php echo $text?>" class="btn">Show only WT2</a></p>
</div>
</body>
</html>

