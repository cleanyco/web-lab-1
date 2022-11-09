<?php

function validateX($xVal): bool
{
    if (!($xVal > -6) || !($xVal < 4) && !isset($xVal)) {
        echo 'Invalid input x';
        return false;
    } else {
        return true;
    }
}
//добавить и сюда регулярки
function validateY($yVal): bool
{
    $Y_MIN = -5;
    $Y_MAX = 5;

    if (!isset($yVal))
        return false;

    $numY = str_replace(',', '.', $yVal);
    return is_numeric($numY) && $numY >= $Y_MIN && $numY <= $Y_MAX;
}

function validateR($rVal): bool
{
    if (!($rVal > -6) || !($rVal < 4) && !isset($rVal)) {
        echo 'Invalid input r';
        return false;
    } else {
        return true;
    }
}

function validateForm($xVal, $yVal, $rVal): bool
{
    return validateX($xVal) && validateY($yVal) && validateR($rVal);
}


function checkTriangle($xVal, $yVal, $rVal): bool
{
    return $xVal >= 0 && $yVal >= 0 &&
        $yVal <= $xVal + $rVal/2;
}

function checkRectangle($xVal, $yVal, $rVal): bool
{
    return $xVal <= 0 && $xVal >= $rVal && $yVal >= $rVal && $yVal <= $rVal;
}

function checkCircle($xVal, $yVal, $rVal): bool
{
    return $xVal <=0 && $yVal <= 0 &&
        sqrt($xVal*$xVal + $yVal*$yVal) <= $rVal/2;
}

function checkHit($xVal, $yVal, $rVal): bool
{
    return checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal) ||
        checkCircle($xVal, $yVal, $rVal);
}


$xVal = $_POST['x'];
$yVal = $_POST['y'];
$rVal = $_POST['r'];

$timezoneOffset = $_POST['date'];

$isValid = validateForm($xVal, $yVal, $rVal);
$converted_isValid = $isValid ? 'true' : 'false';
$isHit = $isValid ? checkHit($xVal, $yVal, $rVal) : 'michael myers with red tombstone';
$converted_isHit = $isHit ? 'true' : 'false';

$currentTime = date('H:i:s', time()-$timezoneOffset*60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

$jsonData = '{' .
    "\"validate\":$converted_isValid," .
    "\"xval\":\"$xVal\"," .
    "\"yval\":\"$yVal\"," .
    "\"rval\":\"$rVal\"," .
    "\"curtime\":\"$currentTime\"," .
    "\"exectime\":\"$executionTime\"," .
    "\"hitres\":$converted_isHit" .
    "}";

echo $jsonData;