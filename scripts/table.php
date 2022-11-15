<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Таблица</title>
</head>

<body>
<!--пофиксить кнопку (она в таблице лол)-->
<style>
    td {
        border: solid 2px lightgrey;
    }
    th {
        border: solid 2px lightgrey;
    }
</style>
<table style="border: 5px solid #990000; border-collapse: collapse">
    <tr>
        <th>
            <?php
            session_start();
            echo $_SESSION["table"];
            ?>
        </th>
        <th>
            <button onclick="window.location.href
                = 'https://se.ifmo.ru/~s319066/';"
            >Да не умер он в конце Драйва!</button><br>
        </th>
    </tr>
</table>
</body>
</html>
