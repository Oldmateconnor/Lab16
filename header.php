<head>
    <title>Classic Cinema</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">

    <?php

if (isset($scriptList) && is_array($scriptList)) {
foreach ($scriptList as $script) {
echo "<script src='$script'></script>";
}
}
?>
</head>

<body>

    <header>
        <h1>Classic Cinema</h1>
        <div id="login">
            <form id="loginForm">
                <label for="loginUser">Username: </label>
                <input type="text" name="loginUser" id="loginUser">
                <br>
                <label for="loginPassword">Password: </label>
                <input type="password" name="loginPassword" id="loginPassword">
                <br>
                <input type="submit" id="loginSubmit" value="Login">
            </form>
        </div>

        <div id="logout">
            <p>Welcome, <span id="logoutUser"></span></p>
            <form id="logoutForm">
                <input type="submit" id="logoutSubmit" value="Logout">
            </form>
        </div>

    </header>

    <nav>
        <ul>
            <?php
    $currentPage = basename($_SERVER['PHP_SELF']);
    if ($currentPage === 'index.php') { echo "<li> Home";
        } else {
    echo "<li> <a href='index.php'>Home</a>";
    }
    if ($currentPage === 'classic.php') { echo "<li> Classics";
        } else {
    echo "<li> <a href='classic.php'>Classics</a>";
    }
    if ($currentPage === 'scifi.php') { echo "<li> Science Fiction and Horror";
        } else {
    echo "<li> <a href='scifi.php'>Science Fiction and Horror</a>";
    }
    if ($currentPage === 'hitchcock.php') { echo "<li> Alfred Hitchcock";
        } else {
    echo "<li> <a href='hitchcock.php'>Alfred hitchcock</a>";
    }
    if ($currentPage === 'checkout.php') { echo "<li> Checkout";
        } else {
    echo "<li> <a href='checkout.php'>Checkout</a>";
    }
?>

        </ul>
    </nav>