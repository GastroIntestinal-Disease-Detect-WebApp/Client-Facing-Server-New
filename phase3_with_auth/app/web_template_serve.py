from fastapi import FastAPI, Request, Form, Depends, File, UploadFile, Cookie
from typing import Optional
from starlette.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
import uvicorn
from fastapi.staticfiles import StaticFiles
from datetime import datetime
import requests
import random
# from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# origins = [
#     "http://127.0.0.1:8001"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )



templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/temp_check")
def welcome():
    return "Welcome"

# all the below routes are used to serve dynamically generated html templates using jinja.
@app.get("/admin/view-patient",response_class=HTMLResponse)
def view_all_patients(request:Request):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    return templates.TemplateResponse("view_all_patients.html",{"request":request, "current_time":current_time})



@app.post("/upload/")
async def upload_patient_image(patient_id: str = Form(...), file: UploadFile = File(...), doctor_comment: Optional[str] = Form(None),access_token: str = Cookie(None)):
    print(access_token)
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # generate link for the image (so basically generate the image name)
    now = datetime.now()
    current_time = now.strftime("%H%M%S%f")
    random_image_name = 'Image-' + current_time + str(random.randint(100000, 999999))
    image_link = "http://127.0.0.1:8001/static/med_images/" + random_image_name
    
    image_data_to_insert_into_db = {
            "image_link": image_link,
            "doctor_comment": doctor_comment,
            "response_from_model": "None"
        }
    
    api_url = f"http://127.0.0.1:8000/patient_image_data/{patient_id}"
    response = requests.post(api_url,json=image_data_to_insert_into_db,headers=headers)
    
    print(type(response.status_code))

    print(response)
    print(response.json())
    if response.json()["detail"] == "Image added successfully":
        
        # add the image to the filesystem:
        file_path = f"./static/med_images/{random_image_name}"
        with open(file_path, "wb") as file_object:
            content = await file.read()
            file_object.write(content)
        
        return {
            "patient_id": patient_id,
            "filename": random_image_name,
            "image_link": image_link,
            "status": "success"
        }
    
    elif response.json()["detail"] == "You don't have permission to access this patient's profile OR this patient with given ID does not exist":
        return{
            "status":"You don't have permission to access this patient's profile OR this patient with given ID does not exist",
            "patient_id":patient_id
        }
        
    elif response.json()["detail"] == "Update failed":
        return{
            "status":"failure"
        }
        
    elif response.status_code == 401:
        return {
            "status":"Doctor token is not valid"
        }


@app.get("/chat_room/{chat_thread_id}/{main_doctor_id}",response_class=HTMLResponse)
def get_chat_room(chat_thread_id: str, request: Request, main_doctor_id: str):
    # checking if the patient exists:
    api_url = f"http://127.0.0.1:8000/chat_thread/{chat_thread_id}"
    chat = requests.get(api_url).json()
    return templates.TemplateResponse("chat_room.html",{"request":request, "chat_thread_id": chat_thread_id, "main_doctor_id": main_doctor_id})



# @app.get("/admin/view-patient/{id}",response_class=HTMLResponse)
# def view_patient_by_id(id: str):

@app.get("/cookie_check")
def cookie_checker(access_token: str = Cookie(None)):
    print(access_token)
    return "hey"


if __name__ == "__main__":
    uvicorn.run("web_template_serve:app",reload=True,port=8001)



# all the below routes discussed below are used to serve static files:

# Note: since admin_home.html is a static file, we are serving it via the /static route and this is why we are not creating a route for /admin alag se 
# this is why below commented code is not needed now
# @app.get("/admin",response_class=HTMLResponse)
# def admin_home(request:Request):
#     return templates.TemplateResponse("admin_home.html",{"request":request})

# similarly view_all_patients.js is also a static file and is served via the /static route
# thus there is no need to create a seperate route here to serve it
# @app.get("/admin/view_all_patients.js", response_class=FileResponse)
# def view_patients_js():
#     return FileResponse("./templates/view_all_patients.js", media_type='application/javascript')
