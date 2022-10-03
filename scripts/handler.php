<?php
$x = "undefined";
$y = "undefined";
$r = "undefined";

$timezoneOffset = $_POST['timezone'];
$converted_isValid = $isValid ? 'true' : 'false';
$currentTime = date('H:i:s', time()-$timezoneOffset*60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);


$jsonData = '{' .
    "\"xval\":\"$x\"," .
    "\"yval\":\"$y\"," .
    "\"rval\":\"$r\"," .
    "\"curtime\":\"$currentTime\"," .
    "\"exectime\":\"$executionTime\"," .
    "\"hitres\":$converted_isHit" .
    "}";
  
  echo $jsonData;