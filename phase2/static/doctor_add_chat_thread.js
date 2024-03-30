function createChatThread() {
    const doctor_id1 = document.getElementById("doctor_id1").value;
    const doctor_id2 = document.getElementById("doctor_id2").value;
    const chat_title = document.getElementById("chat_title").value;

    participants = [doctor_id1, doctor_id2]

    json_object_to_send = {
        "participants":participants,
        "chat_title": chat_title
    }

    $.ajax({
        url: 'http://127.0.0.1:8000/create_chat_thread',
        type: 'POST',
        contentType: 'application/json', 
        data: JSON.stringify(json_object_to_send), // Convert object to a JSON string
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
        error: function(error) {
            // This function is called if the request fails
            console.log('Error:', error);
        }
    });

}