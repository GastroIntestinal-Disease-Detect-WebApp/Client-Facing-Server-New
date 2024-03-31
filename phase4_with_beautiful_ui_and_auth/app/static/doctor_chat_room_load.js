$(document).ready(function load_chats() {
    const access_token = sessionStorage.getItem("access_token");
    
    const chat_thread_id = document.querySelector("#chat_thread_id").textContent;
    const main_doctor_id = document.querySelector("#main_doctor_id").textContent;

    $.ajax({
        url: `http://127.0.0.1:8000/chat_thread/${chat_thread_id}`,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        },
        success: function(chat) {
            var html_content = `<h2 style="text-align: center;">${chat.chat_title}</h2>
                                <h3 id="remove-me">Conversation between <span id="participant_id0">${chat.participants[0]}</span> and <span id="participant_id1">${chat.participants[1]}</span></h3>`;

            chat.chats.forEach(individualMessage => {
                const messageClass = individualMessage.from_ === main_doctor_id ? 'outgoing' : 'incoming';
                html_content += `<div class="message ${messageClass}">
                                    <div>${individualMessage.message}</div>
                                    <div class="meta-info">
                                        <span>From: ${individualMessage.from_}</span> |
                                        <span>Date & Time: ${individualMessage.dateTime}</span>
                                    </div>
                                 </div>`;
            });

            $("#messages").html(html_content);

            remove_me();
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error fetching chat data:', errorThrown);
            $("#messages").html("<h2>Error loading chat data.</h2>");
        }
    });
});

function remove_me(params) {
    document.getElementById("remove-me").style.display = 'none';
}