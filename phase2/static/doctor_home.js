$(document).ready(function (){
    
    // checking if cookie is set:

    // Get all cookies as a string
    const cookies = document.cookie;

    // Split the cookie string into individual cookies
    const cookieArray = cookies.split('; ');

    // Find the specific cookie by name
    const myCookie = cookieArray.find(cookie => cookie.startsWith('access_token='));

    // Extract the value of the cookie if it exists
    const access_token = myCookie ? myCookie.split('=')[1] : 'Cookie not found';

    // Log the value to the console
    console.log(access_token);

}
)

function check_cookie_working() {
    window.location.href = "http://127.0.0.1:8001/cookie_check"
}