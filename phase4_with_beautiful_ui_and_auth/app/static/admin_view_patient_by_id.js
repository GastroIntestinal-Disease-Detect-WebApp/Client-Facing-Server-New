console.log(sessionStorage.getItem("access_token"));

function getPatientDataById() {
    var patient_id = document.getElementById("patient_id").value;
    $.ajax({
        url: `http://127.0.0.1:8000/patient/${patient_id}`,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem("access_token")}`);
        },
        success: function(patient) {
            var patientHtml = `
                <div class="patient">
                    <div class="top-start">
                        <h2>${patient.first_name} ${patient.last_name}</h2>
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
                </div>
            `;
            $('#patient-container').html(patientHtml);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log('Error fetching patient data:', errorThrown);
            if (jqXHR.status == 404)
            {
                $('#patient-container').html('<h3>Invalid Patient Id</h3>');
            }
            
        }
    });
}
