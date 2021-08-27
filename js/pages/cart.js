function placeOrder(productDetails) {
    // productDetails [JSON ARRAY] 
    //  STRUCTURE [
    //      {
    //          productId: str,
    //          productName: str,
    //          price: int
    //      }, {}, ..
    //  ]

    $.ajax({
        type: "POST",
        url: "endpoints/place-order.php",
        datatype: "html",
        data: {
            email: localStorage.email, 
            authToken: localStorage.authToken, 
            productDetails: JSON.stringify(productDetails),
        },
        success: function (response) { 
            response = JSON.parse(response); 
            if (response == "unauthenticated")  {
                var pagename = window.location.pathname.split("/").pop();
                window.location.href = "login.php?redirect="+pagename;
            }
            else if (response == "success")  {
                console.log("Success"); 
                return true;
            } else  {
                console.log("failed");
                return false;
            }

        }, 
        error: function (error) {} 
    });
} 

function addToCart(productDetails) {
    // productDetails [JSON OBJECT] 
    //  STRUCTURE 
    //      {
    //          productId: str,
    //          productName: str,
    //          price: int
    //      }
    //  

    $.ajax({
        type: "POST",
        url: "endpoints/cart.php",
        datatype: "html",
        data: {
            email: localStorage.email, 
            authToken: localStorage.authToken, 
            productDetails: JSON.stringify(productDetails), 
            action: "add"
        },
        success: function (response) { 
            response = JSON.parse(response); 
            if (response == "unauthenticated")  {
                var pagename = window.location.pathname.split("/").pop();
                window.location.href = "login.php?redirect="+pagename;
            }
            else if (response == "success")  {
                console.log("Success"); 
                return true;
            } else  {
                console.log("failed");
                return false;
            }
        }, 
        error: function (error) {} 
    });
} 

function getCartItems() {
    $.ajax({
        type: "POST",
        url: "endpoints/cart.php",
        datatype: "html",
        data: {
            email: localStorage.email, 
            authToken: localStorage.authToken, 
            action: "get"
        },
        success: function (response) { 
            response = JSON.parse(response); 
            if (response == "unauthenticated")  {
                var pagename = window.location.pathname.split("/").pop();
                window.location.href = "login.php?redirect="+pagename;
            }
            else 
                return response;

        }, 
        error: function (error) {} 
    });
} 

function deleteItemFromCart(productId) {
    $.ajax({
        type: "POST",
        url: "endpoints/cart.php",
        datatype: "html",
        data: {
            email: localStorage.email, 
            authToken: localStorage.authToken, 
            productId: productId,
            action: "delete"
        },
        success: function (response) { 
            response = JSON.parse(response); 
            if (response == "unauthenticated")  {
                var pagename = window.location.pathname.split("/").pop();
                window.location.href = "login.php?redirect="+pagename;
            }
            else if (response == "success")  {
                console.log("Success"); 
                return true;
            } else  {
                console.log("failed");
                return false;
            }
        }, 
        error: function (error) {} 
    });
}