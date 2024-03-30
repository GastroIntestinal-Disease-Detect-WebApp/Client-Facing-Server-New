// Function to hash a password using SHA-256
async function hashPassword(password) {
    // Encode the password as UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hash the password using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

async function login(){
    const password = document.getElementById("password").value;
    const hashedPassword = await hashPassword(password);
    const email = document.getElementById("email").value;
    
    login_json_object = {
        "email":email,
        "password":hashedPassword
    }
    
    console.log(login_json_object);
    
    $.ajax({
        url: `http://127.0.0.1:8002/login`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(login_json_object),

        success: function (response) {
            if (response.message === "Invalid Credentials"){
                alert("Invalid Credentials")
            }
            else if(response.message === "Valid Credentials"){
                console.log(response.access_token);
                sessionStorage.setItem('access_token', response.access_token);

                // setting the cookie :
                // not specifying domain in the below line since we are running client facing web server on local host
                // domain=http://127.0.0.1:8001 is not added.
                document.cookie = `access_token=${response.access_token}; path=/;  Secure; SameSite=None`;

                alert("Valid Credentials");

                window.location.href = response.redirect_link;
            }
                

        },
        error: function(error) {
            alert("Some Error Occurred !!!!!")
        }
    });


}