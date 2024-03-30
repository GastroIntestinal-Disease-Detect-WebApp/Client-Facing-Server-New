$(document).ready(function() {
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
            get_chats(payload_of_jwt_token);
        },

        error: function(error) {
            window.location.href = "http://127.0.0.1:8001/static/login.html"
        }
    
    });

});


function get_chats(payload_of_jwt_token){

    const access_token = sessionStorage.getItem("access_token");
    const email = payload_of_jwt_token["email"]

    $.ajax({
        url: `http://127.0.0.1:8000/chat/${email}`,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },
        success: function (chat) {
            var html_content = `
            <br><br><h2>All the Chats for the given doctor are : </h2><br><hr><br>
            `;
            console.log("chat");
            console.log(chat);
            chat.forEach(individualChat => {
                html_content = html_content.concat(`
                <h3>Chat Thread ID: ${individualChat.chat_thread_id}</h3>
                <h4>Chat title: ${individualChat.chat_title}</h4>
                <h4>Participant Doctors Id : ${individualChat.participants[0]} , ${individualChat.participants[1]}</h4>
                <a href="http://127.0.0.1:8001/chat_room/${individualChat.chat_thread_id}/${email}">Click Here to View Chat in this thread</a>
                <h4></h4>
                <br><hr><br>
                `);
            });
            
            console.log(html_content);

            $(`#chats_overview`).html(html_content);

        },
        error: function(error) {
            console.log('Error fetching doctor chat data:', error);
            $('.chats_overview').html(`
            <hr><br>
            <h2>Sorry some error occurred !!! </h2>
            `);
        }
    });

}