import os
from dotenv import load_dotenv
project_folder = './'  # adjust as appropriate
load_dotenv(os.path.join(project_folder, '.env'))

# print(os.getenv('MONGODB_URI'))
# print(os.getenv('FLASK_APP')) 

S3_USERNAME = os.getenv('S3_USERNAME')
S3_BUCKET = os.getenv('S3_BUCKET')
S3_ACCESS_KEY_ID = os.getenv('S3_ACCESS_KEY_ID')
S3_SECRET_ACCESS_KEY = os.getenv('S3_SECRET_ACCESS_KEY')