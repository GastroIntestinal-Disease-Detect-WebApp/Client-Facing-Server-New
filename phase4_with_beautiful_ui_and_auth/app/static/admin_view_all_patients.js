console.log(sessionStorage.getItem("access_token"));

$(document).ready(function() {
    
    document.getElementById("time-show").style.display = "none";

    $.ajax({
        url: 'http://127.0.0.1:8000/patient', // Adjust with your actual API endpoint
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem("access_token")}`);
        },
        success: function(patients) {
            // If the response is not an array, make it an array for consistency
            if (!Array.isArray(patients)) {
                patients = [patients];
            }

            patients.forEach(function(patient) {
                var patientHtml = `
                    <div class="patient">
                        <div class="top-start">
                            <h2>${patient.first_name} ${patient.last_name} </h2>
                            <h3>Patient Id: ${patient.id}</h3>
                            <p>Blood Group: ${patient.blood_group}</p>
                            <p>Doctor Assigned: ${patient.doctor_assigned}</p>
                            <p>Birth Date: ${patient.birth_date}</p>
                            <p>Last Visit Date: ${patient.last_visit_date}</p>
                            <p>Mobile: ${patient.mobile_number}</p>
                            <p>Email: ${patient.email_id}</p>
                        </div>
                        <div class="patient-section">
                            <h3>Medical History</h3>
                            <div class="history-block">
                                <h4>Allergies</h4>
                                <ul>
                                    ${patient.medical_history.allergies.map(allergy => `<li>${allergy}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="history-block">
                                <h4>Surgeries</h4>
                                <ul>
                                    ${patient.medical_history.surgeries.map(surgery => `<li>${surgery.surgery_name} on ${surgery.surgery_date}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="history-block">
                                <h4>Medications</h4>
                                <ul>
                                    ${patient.medical_history.medication.map(med => `<li>${med.medicine_name}: ${med.medicine_reason}, ${med.medicine_frequency}, ${med.is_lifetime ? 'Lifetime' : 'Temporary'}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="patient-images">
                            <h3>Operation Images</h3>
                            ${patient.images.map(image => `
                                <div class="patient-image">
                                    Link: <a href="${image.image_link}" target="_blank">View Image</a>
                                    <p>Doctor's Comment: ${image.doctor_comment}</p>
                                    <p>Model Response: ${image.response_from_model}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <br>
                    <hr>
                    <br>
                `;
                $('#patients-container').append(patientHtml);
            });
            
        },
        error: function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR.status);
            console.log('Error fetching patient data:', errorThrown);

            if(jqXHR.status === 404)
            {
                $('#patients-container').append('<p>Error fetching patient data.</p>');
            }

            else if (jqXHR.status === 401)
            {
                window.location.href = "http://127.0.0.1:8001/static/login.html"
            }

            
            
            
        }
    });
});





