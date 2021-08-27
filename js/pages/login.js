function login(e) {  
    e.preventDefault();
   document.getElementById('message-error').innerHTML = "";
   var email = document.getElementById('email').value;
   var password = document.getElementById('password').value;  
   
   // call AJAX
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
               localStorage.email = email; 
               var url = new URL(window.location.href);
               var redirectPage = url.searchParams.get("redirect");
               if (redirectPage)
                    window.location.href = redirectPage; 
                else
                    window.location.href = "index.html"; 

           }
       }, 
       error: function (error) {}
   })
} 

function signup(e) {
    e.preventDefault();
    document.getElementById('message-error').innerHTML = "";

   var email = document.getElementById('email').value;
   var fullName = document.getElementById('fullname').value;
   var phone = document.getElementById('phone').value;
   var city = document.getElementById('state').value;
   var password = document.getElementById('password').value;  
   var confirmpassword = document.getElementById('confirmpassword').value;   

   if (password == confirmpassword) {
        $.ajax({
            type: "POST",
            url: "endpoints/sign-up.php",
            datatype: "html",
            data: {
                email: email, 
                password: password, 
                fullName: fullName,
                city: city,
                phone: phone, 
            },
            success: function (response) { 
                response = JSON.parse(response); 
                if (response == "exists") 
                    document.getElementById('message-error').innerHTML = "The Account with this email already exists.";
                else if (response == "fail") 
                    document.getElementById('message-error').innerHTML = "There was a problem while Signing up. Please Try again later."; 
                else {
                    localStorage.authToken = response.authToken;
                    localStorage.email = email;
                    window.location.href = "index.html";
                }
            }, 
            error: function (error) {}
        })
    } else {
        document.getElementById('message-error').innerHTML = "Password mismatch";
    }
}