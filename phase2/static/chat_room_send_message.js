function get_to_when_from_and_chat_thread_id_is_given(main_doctor_id){
    participant_id0 = document.querySelector("#participant_id0").textContent;
    participant_id1 = document.querySelector("#participant_id1").textContent;
    // const currentUrl = window.location.href;
    // const segments = currentUrl.split('/');
    // main_doctor_id = segments.pop();
    if(main_doctor_id === participant_id0)
    {
        return participant_id1;
    }
    else
    {
        return participant_id0;
    }
}

function sendMessage() {
    const chat_thread_id = document.querySelector("#chat_thread_id").textContent;

    const main_doctor_id = document.querySelector("#main_doctor_id").textContent;

    console.log(chat_thread_id)
    const message = document.getElementById("newMessage").value
    console.log(message);

    const another_doctor_id = get_to_when_from_and_chat_thread_id_is_given(main_doctor_id)

    message_object = {
        "message": message,
        "from_": main_doctor_id,
        "to": another_doctor_id
    }
    
    $.ajax({
        url: `http://127.0.0.1:8000/chat_thread/${chat_thread_id}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(message_object),
        success: function (response) {
            if (response.status === "Chat message added successfully.")
            {
                alert(`Message sent successfully !!!!
Kindly Refresh the page to see the results and check for new messages !!!
                `)
            }
            else if (response.status === "Chat message adding failed")
            {
                alert("Sorry Message could not be sent !!!")
            }

        },
        error: function(error) {
            console.log('Error sending message: ', error);
            alert("An error occurred !!!!")
        }
    });

}


