from flask import Flask, render_template
from pymongo import MongoClient
import os

app = Flask(__name__, static_url_path='',
            static_folder='build', template_folder='build')

client = MongoClient(os.getenv('MONGODB_URI'))


@app.route('/')
def hello():
    return render_template('index.html')


@app.route("/api/<name>")
def home_page(name):
    db = client["appetite-eatery-db"]
    db.test.insert_one({"name": name})
    # print(os.getenv('MONGODB_URI'))
    # print(name)

    return "hello"


if __name__ == "__main__":
    app.run()
