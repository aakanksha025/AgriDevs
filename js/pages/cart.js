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
            } else 
                console.log("failed");

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
            } else 
                console.log("failed");

        }, 
        error: function (error) {} 
    });
}