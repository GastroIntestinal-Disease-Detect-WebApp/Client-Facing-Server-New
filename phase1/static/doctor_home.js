$(document).ready(function (){

    // Get the current page URL


    // sessionStorage.getItem("access_token") will give you "null" string
    // localStorage.getItem("access_token") will give you "null" as a string

    const at = sessionStorage.getItem("access_token");
    console.log(at);

    if (at == "null") {
    
        console.log("hey");
        const currentUrl = window.location.href;

        // Create a URL object
        const url = new URL(currentUrl);
    
        // Use URLSearchParams to get the access token
        const accessToken = url.searchParams.get('access_token');
    
        sessionStorage.setItem("access_token",accessToken)
        
        console.log(sessionStorage.getItem("access_token"));
    
        window.location.href = "http://127.0.0.1:8001/static/doctor_home.html";
    }

    else 
    {
        console.log("token is set already");
        console.log(sessionStorage.getItem("access_token"));
    }


    // Attempt to retrieve the access token from localStorage
}
)