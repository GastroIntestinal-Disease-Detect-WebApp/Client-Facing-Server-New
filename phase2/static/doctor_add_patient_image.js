$(document).ready(function () {
    $('#uploadForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the normal form submission
        var formData = new FormData(this); // Create a FormData object, passing the form as a parameter

        $.ajax({
            url: 'http://127.0.0.1:8001/upload/', // Endpoint where the data will be posted
            type: 'POST',
            data: formData, // Data to be sent in the request
            contentType: false, // Necessary for file uploads
            processData: false, // Necessary for file uploads
            
            success: function (response) {

if(response.status === "success")
{
    alert(`Image Uploaded successfully !!!!!
    File name: ${response.filename}
    Patient Id: ${response.patient_id}
    Image Link: ${response.image_link}`);
    $('.image_link_container').append(`
    <h3>Image Uploaded Successfully : </h3>
    <h4>Image Link Generated: ${response.image_link}</h4><br>
    <h4><a href="${response.image_link}">Click here to view the image</a></h4>
    `);

    console.log(response);
}
else if(response.status === "patient_dne")
{
    alert(`Patient with Patient Id: ${response.patient_id} does not exist !!!! `)
}
else if(response.status === "failure")
{
    alert("Image Upload Failure !!! There was some internal error !")
}

            },
            error: function () {
                alert('Upload failed.');
            }
        });
    });
});