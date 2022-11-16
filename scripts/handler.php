<?php

function validateX($xVal): bool
{
    $startsWithZero = '/^0+\\d+$/';
    $numberSystems = '/(0x|0o|0b)\d*/';

    $xVal = str_replace(',', '.', $xVal);

    if (!preg_match($startsWithZero, $xVal) && !preg_match($numberSystems, $xVal)) {
        if (is_numeric($xVal) && isset($xVal)) {
            $arr = array("-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3");
            if (in_array($xVal, $arr)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function validateY($yVal): bool
{
    $Y_MIN = -5;
    $Y_MAX = 5;

    if (!isset($yVal))
        return false;

    $numY = str_replace(',', '.', $yVal);

    $startsWithZero = '/^0+\\d+$/';
    $numberSystems = '/(0x|0o|0b)\d*/';

    if (!preg_match($startsWithZero, $numY) && !preg_match($numberSystems, $numY)) {
        return is_numeric($numY) && $numY >= $Y_MIN && $numY <= $Y_MAX;
    } else {
        return false;
    }
}

function validateR($rVal): bool
{
    $startsWithZero = '/^0+\\d+$/';
    $numberSystems = '/(0x|0o|0b)\d*/';

    $rVal = str_replace(',', '.', $rVal);

    if (!preg_match($startsWithZero, $rVal) && !preg_match($numberSystems, $rVal)) {
        if (is_numeric($rVal) && isset($rVal)) {
            $arr = array("1", "2", "3", "4", "5");
            if (in_array($rVal, $arr)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
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
$isHit = $isValid ? checkHit($xVal, $yVal, $rVal) : 'put dispenser';
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