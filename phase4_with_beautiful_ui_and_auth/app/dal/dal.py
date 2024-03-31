import motor.motor_asyncio
import os
from datetime import datetime

async def insert_token_into_logged_out_tokens_db(access_token):
    client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
    db_connection = client.logged_out_tokens
    logged_out_tokens_collection = db_connection.get_collection("logged_out_tokens_coll")
    
    response = await logged_out_tokens_collection.insert_one(
        {
            "date_time_of_logout": datetime.now(),
            "access_token": access_token
        }
    )
    
    client.close()
    return response.acknowledged
