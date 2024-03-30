$(document).ready(function load_chats() {
    const chat_thread_id = document.querySelector("#chat_thread_id").textContent;
    const main_doctor_id = document.querySelector("#main_doctor_id").textContent;
    document.getElementById("chat_thread_id").style.display = "none";
    document.getElementById("main_doctor_id").style.display = "none";
    console.log(chat_thread_id);

    document.getElementById("")
    $.ajax({
        url: `http://127.0.0.1:8000/chat_thread/${chat_thread_id}`,
        method: 'GET',
        success: function (chat) {
            var html_content = `
            <br><br><h2>All the Conversations for chat thread id : ${chat_thread_id} between <span id="participant_id0">${chat.participants[0]}</span> and <span id="participant_id1">${chat.participants[1]}</span> are as below </h2><br><hr><br>
            `;
            
            chat.chats.forEach(individualMessage => {
                html_content = html_content.concat(`
                <h3>Message: ${individualMessage.message}</h3>
                <h4>From: ${individualMessage.from_}</h4>
                <h4>To : ${individualMessage.to}</h4>
                <h4>Date & Time: ${individualMessage.dateTime}</h4>
                <br><hr><br>
                `);
            });
            
            console.log(html_content);

            $(`#messages`).html(html_content);

        },
        error: function(error) {
            console.log('Error fetching doctor chat data:', error);
            $('.chats_overview').html(`
            <hr><br>
            <h2>Sorry some error occurred !!! </h2>
            `);
        }
    });
});