$(document).ready(() => { 
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
            } else if (response == 'no-products') {
                document.getElementById('no-products').classList.remove('d-none');
                document.getElementById('placeOrderBtn').classList.add('d-none');
            }
            else {
                    window.cartItems = response;
                    if (window.cartItems && window.cartItems.length != 0) { 
                        var holder = document.getElementById('products-holder'); 
                
                        for (var i in window.cartItems) { 
                            const productId = window.cartItems[i].productId;
                            holder.appendChild(createItem(productId, window.cartItems[i].productName, window.cartItems[i].price));
                        } 
                
                    } else  {
                        document.getElementById('no-products').classList.remove('d-none');
                        document.getElementById('placeOrderBtn').classList.add('d-none');
                    } 
                }

        }, 
        error: function (error) {} 
    });

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

function createItem (pid, productName, priceRs) {
    var row = document.createElement('div');
    row.classList.add('row', 'p-2', 'text-light', 'd-flex', 'justify-content-center'); 
    var name = document.createElement('p');
    name.innerHTML = productName;
    var price = document.createElement('p');
    price.innerHTML = "Rs. "+priceRs; 
    var deleteBtn = document.createElement('button'); 
    deleteBtn.innerHTML = "Delete Item";
    deleteBtn.classList.add('btn', 'btn-danger'); 
    deleteBtn.setAttribute('onclick', "deleteItemFromCart('"+pid+"')")

    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(deleteBtn)
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
            productDetails: productDetails,
        },
        success: function (response) { 
            response = JSON.parse(response); 
            if (response == "unauthenticated")  {
                var pagename = window.location.pathname.split("/").pop();
                window.location.href = "login.html?redirect="+pagename;
            }
            else if (response == "success")  {
                console.log("Success"); 
                window.location.href = "index.html";
            } else  {
                console.log("failed", response);
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
            productId: productDetails.productId, 
            productName: productDetails.productName, 
            price: productDetails.price, 
            action: "add"
        },
        success: function (response) { 
            console.log(response)
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
                window.location.href = "cart.html";
            } else  {
                console.log("failed");
                window.location.href = "cart.html";

            }
        }, 
        error: function (error) {} 
    });
}