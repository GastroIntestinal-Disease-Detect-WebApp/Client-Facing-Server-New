$(document).ready(function() {
    $('#submitBtn').click(function() {
        var formData = new FormData($('#uploadForm')[0]);
        console.log(formData);
        console.log(typeof(formData));
        $.ajax({
            url: 'http://127.0.0.1:8001/upload_patient_image_to_server/', // Replace with your FastAPI endpoint
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                console.log('Success:', data);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });



    });
});


        // const url = 'http://127.0.0.1:8001/upload_patient_image_to_server';
      
        // const fetchOptions = {
        //   method: 'post',
        //   body: formData
        // };
      
        // fetch(url, fetchOptions);