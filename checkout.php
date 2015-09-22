<!DOCTYPE html>

<html>
        <?php
    $scriptList = array('JS/jquery-1.11.3.min.js', 'JS/showHide.js', 'JS/cookies.js', 'JS/checkoutValidation.js', 'JS/checkout.js');
    $currentPage = 'index.php';
    include('header.php');
?>

        <div id="main">
            <!-- Content is JavaScript driven -->
            <h3>Shopping Cart Contents</h3>
            <div id="cart"></div>
            <div id="errors"></div>
            <form id="checkoutForm"  action='<?php echo htmlspecialchars("validateCheckout.php");?>'>
                <fieldset>
                    <legend>Delivery Details:</legend>
                    <p>
                        <label for="deliveryName">Deliver to:</label>
                        <input type="text" name="deliveryName" id="deliveryName" required>
                        <span class="error">* <?php echo $deliveryNameErr;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="deliveryEmail">Email:</label>
                        <input type="email" name="deliveryEmail" id="deliveryEmail">
                        <span class="error">* <?php echo $deliveryEmailErr;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="deliveryAddress1">Address:</label>
                        <input type="text" name="deliveryAddress1" id="deliveryAddress1" required>
                            
                        <span class="error">* <?php echo $deliveryAddress1Err;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="deliveryAddress2"></label>
                        <input type="text" name="deliveryAddress2" id="deliveryAddress2">
                    </p>
                    <p>
                        <label for="deliveryCity">City:</label>
                        <input type="text" name="deliveryCity" id="deliveryCity" required>
                        <span class="error">* <?php echo $deliveryCityErr;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="deliveryPostcode">Postcode:</label>
                        <input type="text" name="deliveryPostcode" id="deliveryPostcode" maxlength="4" required class="short">
                        <span class="error">* <?php echo $postCodeErr;?></span>
                        <br><br>
                    </p>
                </fieldset>
                
                <fieldset>
                    <legend>Payment Details:</legend>
                    <p>
                        <label for="cardType">Card type:</label>
                        <select name="cardType" id="cardType">
                            <option value="amex">American Express</option>
                            <option value="mcard">Master Card</option>
                            <option value="visa">Visa</option>
                        </select>
                        <span class="error">* <?php echo $cardTypeErr;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="cardNumber">Card number:</label>
                        <input type="text" name="cardNumber" id="cardNumber" maxlength="16" required>
                        <span class="error"> <?php echo $cardNumberErr;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="cardMonth">Expiry date:</label>
                        <select name="cardMonth" id="cardMonth">
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select> / <select name="cardYear" id="cardYear">
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                        </select>
                        <span class="error">* <?php echo $expiryDateErr;?></span>
                        <br><br>
                    </p>
                    <p>
                        <label for="cardValidation">CVC:</label>
                        <input type="text" class="short" maxlength="4" name="cardValidation" id="cardValidation" required>
                    </p>
                </fieldset>
                <input type="submit" name="submit" value="Submit">
            </form>
        </div>

        <?php include ("footer.php"); ?>

    </body>
</html>