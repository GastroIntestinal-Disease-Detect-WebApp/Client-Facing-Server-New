$(document).ready(function() {
    const access_token = sessionStorage.getItem("access_token");

    $.ajax({
        url: 'http://127.0.0.1:8000/doctor_get_payload_of_jwt_token',
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },
        success: function(payload_of_jwt_token) {
            get_chats(payload_of_jwt_token);
        },
        error: function() {
            window.location.href = "http://127.0.0.1:8001/static/login.html"
        }
    });
});

function get_chats(payload_of_jwt_token) {
    const access_token = sessionStorage.getItem("access_token");
    const email = payload_of_jwt_token["email"];

    $.ajax({
        url: `http://127.0.0.1:8000/chat/${email}`,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },
        success: function(chats) {
            let html_content = '';
            chats.forEach(chat => {
                html_content += `
                <div class="chat-card">
                    <h3>${chat.chat_title}</h3>
                    <p>Participants: ${chat.participants.join(', ')}</p>
                    <a href="http://127.0.0.1:8001/chat_room/${chat.chat_thread_id}/${email}">View Chat</a>
                </div>
                `;
            });

            $('#chats_overview').html(html_content);
        },
        error: function() {
            $('#chats_overview').html('<p>Error loading chats.</p>');
        }
    });
}
