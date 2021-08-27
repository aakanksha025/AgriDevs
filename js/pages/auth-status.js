function logout() { 
   // call AJAX
   $.ajax({
       type: "POST",
       url: "endpoints/logout.php",
       datatype: "html",
       data: {
           email: email, 
       },
       success: function (response) { 
           response = JSON.parse(response); 
           if (response == "success") { 
                localStorage.removeItem("email");
                localStorage.removeItem("authToken");
               window.location.href = "index.html";
           } else {
                window.location.href = "index.html";
           }
       }, 
       error: function (error) {}
   })
}  

function checkAuthStatus() { 
    var email = localStorage.getItem('email')
    var authToken =  localStorage.getItem('authToken')
    if (email !== null && authToken !== null)  {
        // call AJAX
        $.ajax({
            type: "POST",
            url: "endpoints/auth-status.php",
            datatype: "html",
            data: {
                email: email, 
                authToken: authToken, 
            },
            success: function (response) { 
                response = JSON.parse(response); 
                if (response == "success") { 
                    return true;
                } else {
                    return false;
                }
            }, 
            error: function (error) {}
        })
    } else 
        return false;

}