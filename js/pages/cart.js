$(document).ready(() => {
    window.cartItems = getCartItems();
    if (window.cartItems && window.cartItems.length != 0) { 
        var holder = document.getElementById('products-holder'); 

        for (var i in window.cartItems) { 
            const productId = window.cartItems[i].productId;
            holder.appendChild(createItem(window.cartItems[i].productName, window.cartItems[i].price));
        } 

    } else  {
        document.getElementById('no-products').classList.remove('d-none');
        document.getElementById('placeOrderBtn').classList.add('d-none');
    } 
    document.getElementById('placeOrderBtn').addEventListener('click', () => {
        let items = []; 
        for ( var i in window.cartItems) {
            var obj = { 
                productId: window.cartItems[i].productId,
                productName: window.cartItems[i].productName,
                price: window.cartItems[i].price
            }; 
            items.push(obj);
        } 
        placeOrder(items);
    })

})  

function createItem (productName, price) {
    var row = document.createElement('div');
    row.classList.add('row', 'px-2'); 
    var name = document.createElement('p');
    name.innerHTML = productName;
    var price = document.createElement('p');
    price.innerHTML = "Rs. "+price; 

    row.appendChild(name)
    row.appendChild(price)
    return row;

}


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
                window.location.href = "login.html?redirect="+pagename;
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
                window.location.href = "login.html?redirect="+pagename;
            }
            else if (response == "success")  {
                console.log("Success"); 
                window.location.href = "cart.html";
            } else  {
                console.log("failed");
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
            console.log(response);
            response = JSON.parse(response); 
            if (response == "unauthenticated")  {
                var pagename = window.location.pathname.split("/").pop();
                window.location.href = "login.html?redirect="+pagename;
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
                window.location.href = "login.html?redirect="+pagename;
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