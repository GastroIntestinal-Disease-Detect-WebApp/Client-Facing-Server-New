from pydantic import EmailStr,Field,BaseModel

class UserModel(BaseModel):

    email:EmailStr = Field(default=None)
    name:str = Field(default=None)
    password:str = Field(default=None)

    class Config:
        the_schema = {
            "user_demo":{
                "name":"Booker",
                "email":"booker@gmail.com",
                "password":"123"
            }
        }

class UserLoginModel(BaseModel):

    email:EmailStr = Field(default=None)
    password:str = Field(default=None)

    class Config:
        the_schema = {
            "user_demo":{
                "email":"booker@gmail.com",
                "password":"123"
            }
        }