

function logout() { 
   // call AJAX
   $.ajax({
       type: "POST",
       url: "endpoints/logout.php",
       datatype: "html",
       data: {
           email: localStorage.email, 
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

$(document).ready(() => {  

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
                console.log(response)
                response = JSON.parse(response); 
                if (response == "success") { 
                    $('#logoutLink').removeClass('d-none');
                } else {
                    $('.login').removeClass('d-none');
                }
            }, 
            error: function (error) {}
        })
    } else 
        $('.login').removeClass('d-none');

});