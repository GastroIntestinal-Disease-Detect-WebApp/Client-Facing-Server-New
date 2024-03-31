// from access token => get the email id of the sender doctor
// if the doctor is not logged in, redirect to login page
function createChatThreadStepOne() {

    const access_token = sessionStorage.getItem("access_token");

    $.ajax({

        url: 'http://127.0.0.1:8000/doctor_get_payload_of_jwt_token', // Adjust with your actual API endpoint
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },

        success: function(payload_of_jwt_token) {
            
            console.log("in success : ");
            console.log(payload_of_jwt_token);
            createChatThreadStepTwo(payload_of_jwt_token);
        },

        error: function(error) {
            window.location.href = "http://127.0.0.1:8001/static/login.html"
        }
    
    });

}

// check whether the email id of the reciever is correct or not
function createChatThreadStepTwo(payload_of_jwt_token)
{
    // [payload_of_jwt_token["email"] is the email of sender doctor
    // email_id is the email of the reciever doctor
    const email_id = document.getElementById("email_id").value;
    const access_token = sessionStorage.getItem("access_token");

    $.ajax({

        url: `http://127.0.0.1:8000/verify_email_of_other_doctor/${email_id}`, // Adjust with your actual API endpoint
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },

        success: function(response) {
            
            console.log("in success : ");
            console.log(response);
            if(response.message === "User Does Not Exist")
            {
                alert("Invalid Doctor Email Entered")
            }
            else if (response.message === "User Exists")
            {
                createChatThreadStepThree(payload_of_jwt_token);
            }
            
        },

        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 401)
            {
                window.location.href = "http://127.0.0.1:8001/static/login.html"
            }
        }
    
    });
}

// add the chat json object into database
function createChatThreadStepThree(payload_of_jwt_token)
{
    const email_id = document.getElementById("email_id").value;
    const chat_title = document.getElementById("chat_title").value;
    const access_token = sessionStorage.getItem("access_token");
    console.log("in sendCreateChatThreadRequest");
    // console.log(payload_of_jwt_token);

    participants = [payload_of_jwt_token["email"], email_id]

    // console.log(participants);

    json_object_to_send = {
        "participants":participants,
        "chat_title": chat_title
    }

    console.log(json_object_to_send);

    $.ajax({
    url: 'http://127.0.0.1:8000/create_chat_thread',
    type: 'POST',
    contentType: 'application/json', 
    data: JSON.stringify(json_object_to_send), // Convert object to a JSON string
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
    },
    success: function(response) {
        alert("Chat Thread Created Successfully !!!!")
        const html_to_add = `
        <h3>Details of newly created chat thread: </h3>
        <p>Chat Title: ${response.chat_title}</p>
        <p>Participant 1: ${response.participants[0]}</p>
        <p>Participant 2: ${response.participants[1]}</p>
        <p>Chat Thread Id: ${response.chat_thread_id}</p>
        `;
        
        $(".result-container").html(html_to_add);
        
    }
    ,
    error: function(jqXHR, textStatus, errorThrown) {
        // This function is called if the request fails
        if (jqXHR.status === 401)
        {
            window.location.href = "http://127.0.0.1:8001/static/login.html"
        }
    }
});
}