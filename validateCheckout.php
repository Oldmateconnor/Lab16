<html>
<?php
$scriptList = array('JS/jquery-1.11.1.min.js', 'JS/cookies.js'); 
include("header.php");
?>

    <div id="main">
        <?php
$deliveryNameErr = $deliveryEmailErr = $deliveryAddress1Err = $deliveryAddress2Err = 
$deliveryCityErr = $postCodeErr = $cardTypeErr = $cardNumberErr = $expiryDateErr = "";

// define variables and set to empty values
$deliveryName = $deliveryEmail = $deliveryAddress1 = $deliveryAddress2 = 
$deliveryCity = $postCode = $cardType = $cardNumber = $expiryDate = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["deliverName"])) {
        $deliveryNameErr = "Delivery name is required";
    } else {
        $deliveryName = test_input($_POST["deliveryName"]);
    }
    
    if (empty($_POST["deliverEmail"])) {
        $deliveryEmailErr = "Delivery email is required";
    } else {
        $deliveryEmail = test_input($_POST["deliveryEmail"]);
    }
        
    if (empty($_POST["deliveryAddress1"])) {
        $deliveryEmailErr = "Delivery address is required";
    } else {
        $deliveryEmail = test_input($_POST["deliveryAddress"]);
    }
    
    $deliveryAddress2 = test_input($_POST["deliveryAddress2"]);
    
    if (empty($_POST["deliveryCity"])) {
        $deliverycityErr = "Delivery city is required";
    } else {
        $deliveryCity = test_input($_POST["deliveryCity"]);
    }
    
    if (empty($_POST["postCode"])) {
        $postCodeErr = "Post Code is required";
    } else {
        $postCode = test_input($_POST["postCode"]);
    }
    
    if (empty($_POST["cardType"])) {
        $cardTypeErr = "CardType Required";
    } else {
        $cardType = test_input($_POST["cardType"]);
    }
    
    if (empty($_POST["cardNumber"])) {
        $cardNumberErr = "Card Number Required";
    } else {
        $cardNumber = test_input($_POST["cardNumber"]);
    }
    if (empty($_POST["expiryDate"])) {
        $expiryDateErr = "Expiry Date Required";
    } else {
        $expiryDate = test_input($_POST["expiryDate"]);
    }
    
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
        <p> Placeholder for checkout validation </p>
    </div>
        <?php include("footer.php"); ?>
    </body>
</html>

