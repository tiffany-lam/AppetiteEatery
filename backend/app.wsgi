import os
project_folder = '/home/ubuntu/cecs470-web-app-project-team6/backend'

activate_this = '/home/ubuntu/cecs470-web-app-project-team6/backend/venv/bin/activate_this.py' 

with open(activate_this) as f:
        exec(f.read(), dict(__file__=activate_this))

import sys
import logging

from dotenv import load_dotenv
load_dotenv(os.path.join(project_folder, '.env'))
print('---------------------------------------------------------------')
print('LOADING ENVIRONMENT VARIABLES IN WSGI')
print(f"MONGODB_URI={os.getenv('MONGODB_URI')}")
print(f"FLASK_APP={os.getenv('FLASK_APP')}")
print(f'CWD: {os.getcwd()}')
print('---------------------------------------------------------------')

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/html/appetite-eatery/")
sys.path.append('/var/www/html/appetite-eatery/models')
sys.path.append('/var/www/html/appetite-eatery/routes')

from app import app as application
