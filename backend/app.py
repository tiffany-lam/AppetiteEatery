from flask import Flask, render_template
from pymongo import MongoClient
import os

from bson import ObjectId
from flask import jsonify

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


@app.route('/random')
def boring():
    print("random")


@app.route("/api/<name>")
def home_page(name):
    db = client["appetite-eatery-db"]
    db.test.insert_one({"name": name})
    return f"Check database for name: {name}"

@app.route("/api/restaurant/get/<_id>")
def restaurant_get(_id):
    db = client["appetite-eatery-db"]
    restaurant = db.restaurants.find_one({ "_id" : ObjectId(_id) })
    return str(restaurant)

@app.errorhandler(404)
def page_not_found(e):
    # your processing here
    print("REROUTING TO REACT APP @ index.html")
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
