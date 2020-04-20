import os
from dotenv import load_dotenv
project_folder = './'  # adjust as appropriate
load_dotenv(os.path.join(project_folder, '.env'))

print(os.getenv('MONGODB_URI'))
print(os.getenv('FLASK_APP'))