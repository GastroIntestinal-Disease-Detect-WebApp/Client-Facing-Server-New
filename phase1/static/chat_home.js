function get_chats_overview(){
    const participant_id = document.getElementById("participant_id").value;
    $.ajax({
        url: `http://127.0.0.1:8000/chat/${participant_id}`,
        method: 'GET',
        success: function (chat) {
            var html_content = `
            <br><br><h2>All the Chats for the given doctor are : </h2><br><hr><br>
            `;
            
            chat.forEach(individualChat => {
                html_content = html_content.concat(`
                <h3>Chat Thread ID: ${individualChat.chat_thread_id}</h3>
                <h4>Chat title: ${individualChat.chat_title}</h4>
                <h4>Participant Doctors Id : ${individualChat.participants[0]} , ${individualChat.participants[1]}</h4>
                <a href="http://127.0.0.1:8001/chat_room/${individualChat.chat_thread_id}/${participant_id}">Click Here to View Chat in this thread</a>
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