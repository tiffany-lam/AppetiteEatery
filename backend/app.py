from flask import Flask, render_template
from pymongo import MongoClient
import os

app = Flask(__name__, static_url_path='',
            static_folder='build', template_folder='build')

MONGODB_URI = os.getenv('MONGODB_URI')
client = MongoClient(os.getenv('MONGODB_URI'))

print('---------------------------------------------------------------')
print('PRINTING ENVIRONMENT VARIABLES')
print(f"MONGODB_URI={os.getenv('MONGODB_URI')}")
print(f"FLASK_APP={os.getenv('FLASK_APP')}")
print(f'CWD: {os.getcwd()}')
print('---------------------------------------------------------------')

@app.route('/')
def hello():
    return render_template('index.html')

@app.route("/api/<name>")
def home_page(name):
    db = client["appetite-eatery-db"]
    db.test.insert_one({"name": name})

    return f"Check database for name: {name}"

if __name__ == "__main__":
    app.run()
