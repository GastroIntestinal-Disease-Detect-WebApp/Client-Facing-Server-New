let global_no_of_allergies = 0
let global_no_of_surgeries = 0
let global_no_of_medications = 0

function generatePatientDetailsForm(){

    const no_of_allergies = document.getElementById("no_of_allergies").value;
    const no_of_surgeries = document.getElementById("no_of_surgeries").value;
    const no_of_medications = document.getElementById("no_of_medications").value;
    
    global_no_of_allergies = no_of_allergies;
    global_no_of_medications = no_of_medications;
    global_no_of_surgeries = no_of_surgeries;


    let html_of_allergies = ``;

    for (let index = 1; index <= no_of_allergies; index++) {
        const html_to_add = `
            <label>Allergy ${index} :</label><br><br>
            <label>Allergy Name :</label><br><br>
            <input type="text" id="allergy${index}_name" name="allergy${index}_name"><br><br><br>
        `
        html_of_allergies = html_of_allergies.concat(html_to_add)
    }

    let html_of_surgeries = ``;

    for (let index = 1; index <= no_of_surgeries; index++) {
        const html_to_add = `
        <h4>Surgery ${index}</h4><br>
        <label>Surgery Name :</label><br><br>
        <input type="text" id="surgery${index}_name" name="surgery${index}_name"><br><br>
        <label>Surgery Date :</label><br><br>
        <input type="date" id="surgery${index}_date" name="surgery${index}_date"><br><br><br>
        `
        html_of_surgeries = html_of_surgeries.concat(html_to_add)
    }

    let html_of_medications = ``;

    for (let index = 1; index <= no_of_medications; index++) {
        const html_to_add = `
        <h4>Medication ${index}</h4>
        <label>Medicine Name :</label><br><br>
        <input type="text" id="medicine${index}_name" name="medicine${index}_name"><br><br>
        <label>Medicine Reason :</label><br><br>
        <input type="text" id="medicine${index}_reason" name="medicine${index}_reason"><br><br>
        <label>Medicine Is Lifetime ? :</label><br><br>
        <input type="text" id="medicine${index}_islifetime" name="medicine${index}_islifetime"><br><br>
        <label>Medicine Frequency:</label><br><br>
        <input type="text" id="medicine${index}_frequency" name="medicine${index}_frequency"><br><br>
        `
        html_of_medications = html_of_medications.concat(html_to_add)
    }

    const html_of_form = `
    <br>
    <h2>Step 2: Now Fill the required details of the patient below : </h2>
    <br><br><br>
        <form action="" style="text-align: center;">
            <label>First Name :</label><br><br>
            <input type="text" id="first_name" name="first_name"><br><br><br>

            <label>Last Name :</label><br><br>
            <input type="text" id="last_name" name="last_name"><br><br><br>

            <label>Birth Date :</label><br><br>
            <input type="date" id="birth_date" name="birth_date"><br><br><br>

            <label>Address :</label><br><br>
            <input type="text" id="address" name="address" size="70"><br><br><br>

            <label>Last Visit Date :</label><br><br>
            <input type="date" id="last_visit_date" name="last_visit_date"><br><br><br>

            <label>Mobile Number :</label><br><br>
            <input type="tel" id="mobile_number" name="mobile_number"><br><br><br>

            <label>Email Id :</label><br><br>
            <input type="email" id="email_id" name="email_id"><br><br><br>

            <label>Blood Group</label><br><br>
            <input type="text" id="blood_group" name="blood_group"><br><br><br>

            <label>Gender :</label><br><br>
            <input type="text" id="gender" name="gender"><br><br><br>

            <label>Doctor Assigned:</label><br><br>
            <input type="text" id="doctor_assigned" name="doctor_assigned"><br><br><br>

            <h3>Allergies: </h3><br>
            ${html_of_allergies}

            <h3>Surgeries: </h3><br>
            ${html_of_surgeries}
            
            <h3>Medications</h3><br>
            ${html_of_medications}

            </form>
            <br>
            <button onclick="submit_patient_details()">Submit</button>

    `
    $(".form_container").append(html_of_form);
    $(".initial-inputs").html(``);
}

function submit_patient_details(){

    const no_of_allergies = global_no_of_allergies;
    const no_of_surgeries = global_no_of_surgeries;
    const no_of_medications = global_no_of_medications;


    // const no_of_allergies = document.getElementById("no_of_allergies").value;
    // const no_of_surgeries = document.getElementById("no_of_surgeries").value;
    // const no_of_medications = document.getElementById("no_of_medications").value;

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const birth_date = document.getElementById("birth_date").value;
    const address = document.getElementById("address").value;
    const last_visit_date = document.getElementById("last_visit_date").value;
    const mobile_number = document.getElementById("mobile_number").value;
    const email_id = document.getElementById("email_id").value;
    const blood_group = document.getElementById("blood_group").value;
    const gender = document.getElementById("gender").value;
    const doctor_assigned = document.getElementById("doctor_assigned").value;

    const allergies = [];

    for (let index = 1; index <= no_of_allergies; index++) {
        const element = document.getElementById(`allergy${index}_name`).value
        allergies.push(element)
        
    }

    const surgeries = []
    for (let index = 1; index <= no_of_surgeries; index++) {
        const surgery_name = document.getElementById(`surgery${index}_name`).value;
        const surgery_date = document.getElementById(`surgery${index}_date`).value;
        const surgery_object = {
            "surgery_name": surgery_name,
            "surgery_date": surgery_date
        }
        surgeries.push(surgery_object)
        
    }

    const medication = []
    for (let index = 1; index <= no_of_medications; index++) {
        const medicine_name = document.getElementById(`medicine${index}_name`).value;
        const medicine_reason = document.getElementById(`medicine${index}_reason`).value;
        const medicine_islifetime = document.getElementById(`medicine${index}_islifetime`).value;
        const medicine_frequency = document.getElementById(`medicine${index}_frequency`).value;
        const medication_object = {
                "medicine_name": medicine_name,
                "medicine_reason": medicine_reason,
                "is_lifetime": medicine_islifetime,
                "medicine_frequency": medicine_frequency
        }
        medication.push(medication_object)
        
    }

    const final_patient_object = {
        "first_name": first_name,
        "last_name": last_name,
        "birth_date": birth_date,
        "address": address,
        "last_visit_date": last_visit_date,
        "mobile_number": mobile_number,
        "email_id": email_id,
        "medical_history": {
            "allergies":allergies,
            "surgeries":surgeries,
            "medication":medication
        },
        "images": [],
        "blood_group": blood_group,
        "gender": gender,
        "doctor_assigned":doctor_assigned
    };

    console.log(final_patient_object)

    $.ajax({
        url: 'http://127.0.0.1:8000/patient',
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem("access_token")}`);
        },
        contentType: 'application/json', 
        data: JSON.stringify(final_patient_object), // Convert object to a JSON string
        success: function(response) {
            console.log('Response from server:');
            console.log(response);
            $(".form_container").html(`
            <br>
            <h2>Patient has been created Successfully !!!!</h2>
            <br>
            <h3>Id assigned to patient is : ${response.id} </h3>
            `);
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // This function is called if the request fails
            console.log(jqXHR.status);
            console.log('Error:', errorThrown);
            if (jqXHR.status === 401)
            {
                window.location.href = "http://127.0.0.1:8001/static/login.html"
            }
        }
    });

}