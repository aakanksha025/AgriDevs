function login(e) {  
    e.preventDefault();
   document.getElementById('message-error').innerHTML = "";
   var email = document.getElementById('email').value;
   var password = document.getElementById('password').value;  
   
   $.ajax({
       type: "POST",
       url: "endpoints/login.php",
       datatype: "html",
       data: {
           email: email, 
           password: password,
       },
       success: function (response) { 
           response = JSON.parse(response); 
           if (response == "invalid") 
               document.getElementById('message-error').innerHTML = "Invalid Credentials";
           else if (response == "error") 
               document.getElementById('message-error').innerHTML = "There was a problem logging you in. Please Try again later."; 
           else {
               localStorage.authToken = response.authToken;
               window.location.href = "index.html";
           }
       }, 
       error: function (error) {}
   })
}