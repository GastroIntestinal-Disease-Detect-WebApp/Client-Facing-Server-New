function getPatientDataById(){
    var patient_id = document.getElementById("patient_id").value;
    $.ajax({
        url: `http://127.0.0.1:8000/patient/${patient_id}`,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem("access_token")}`);
        },
        success: function (patient) {

            var patientHtml =`
            <hr><br>
            <h2>Fetched Patient Data:</h3><br>
            <div class="patient">
                <h2>${patient.first_name} ${patient.last_name} (Blood Group: ${patient.blood_group})</h2>
                <h3>Patient Id: ${patient.id}</h3>
                <p>Doctor Assigned: ${patient.doctor_assigned}</p>
                <p>Birth Date: ${patient.birth_date}</p>
                <p>Last Visit Date: ${patient.last_visit_date}</p>
                <p>Mobile: ${patient.mobile_number}</p>
                <p>Email: ${patient.email_id}</p>
                <div class="patient-images">
                    <br>
                    <h3>Operation Images</h3>
                    ${patient.images.map(image => `
                        <h4>Image</h4>
                        <div class="patient-image">
                            <p>Image Link : <a href="${image.image_link}" target="_blank">View Image</a></p>
                            <p>Doctor's Comment: ${image.doctor_comment}</p>
                            <p>Model Response: ${image.response_from_model}</p>
                        </div><br>
                    `).join('')}
                </div>

                <div>
                    <br><br><h3>Medical History</h3>
                    <p>Allergies: ${patient.medical_history.allergies.join(', ')}</p>
                    <div>Surgeries: 
                        <ul>
                            ${patient.medical_history.surgeries.map(surgery => `<li>${surgery.surgery_name} on ${surgery.surgery_date}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div>Medications: 
                        <ul>
                            ${patient.medical_history.medication.map(med => `<li>${med.medicine_name}: ${med.medicine_reason}, ${med.medicine_frequency}, ${med.is_lifetime ? 'Lifetime' : 'Temporary'}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <br>
            <hr>
            <br>`

            
            $('.patient_detail_container').html(patientHtml);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            if(jqXHR.status === 404)
            {
                $('.patient_detail_container').html(`
                <hr><br>
                <h2>Sorry the Patient with id = "${patient_id}" does not exist</h2>
                `);
            }
            else if (jqXHR.status === 401)
            {
                window.location.href = "http://127.0.0.1:8001/static/login.html"
            }
            
            
        }
    });

}