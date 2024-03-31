function logout(){
    $.ajax({

        url: 'http://127.0.0.1:8001/logout', 
        method: 'GET',
        success: function(response) {
            
            console.log("in success : ");
            console.log(response);

            if (response.message === "Logout Successful")
            {
                alert("Logged Out Successfully !!!! ");
                window.location.href = "http://127.0.0.1:8001/static/login.html";
            }
            else if (response.message === "Logout Failed")
            {
                alert("Unable to logout due to some internal error");
            }

            else if (response.message === "No access token found in cookie")
            {
                window.location.href = "http://127.0.0.1:8001/static/login.html";
            }
        },

        error: function(error) {
            alert("Logout was unsuccessful !!!")
        }
    
    });
}

// according to user type, redirect to that home page.
function home_page(){
    const access_token = sessionStorage.getItem("access_token");
    $.ajax({
        url: 'http://127.0.0.1:8000/doctor_get_payload_of_jwt_token', 
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },
        success: function(payload_of_jwt_token) {
            
            console.log(payload_of_jwt_token);

            window.location.href = "http://127.0.0.1:8001/static/doctor_home.html"

        },

        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(errorThrown);

            if (jqXHR.status === 401)
            {
                $.ajax({
                    url: 'http://127.0.0.1:8000/admin_get_payload_of_jwt_token', 
                    method: 'GET',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
                    },
                    success: function(response) {
                        
                        window.location.href = "http://127.0.0.1:8001/static/admin_home.html"
            
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);

                        if (jqXHR.status === 401)
                        {
                            window.location.href = "http://127.0.0.1:8001/static/login.html"
                        }
                    }
                })
            }
        }
    
    });
}


