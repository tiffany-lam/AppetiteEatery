from flask import Flask, render_template
# from pymongo import MongoClient
from mongoengine import connect
import os

# from bson import ObjectId
from flask import jsonify

# Testing Purposes Only
from backend.models.testmodel import Test

# Route Imports

from backend.routes.restaurant import restaurant
from backend.routes.user import user
from backend.routes.review import review

app = Flask(__name__, static_url_path='',
            static_folder='build', template_folder='build')

# Add Routes mounted at associated location - view routes with app.url_map
app.register_blueprint(restaurant, url_prefix='/api/restaurant')
app.register_blueprint(user, url_prefix='/api/user')
app.register_blueprint(review, url_prefix='/api/review')

MONGODB_URI = os.getenv('MONGODB_URI')
# client = MongoClient(os.getenv('MONGODB_URI'))
db_client = connect('appetite-eatery-db', host=(os.getenv('MONGODB_URI')))

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

# Testing Route - Print all test documents
@app.route("/api/test")
def test():
    test_collection = Test.objects()
    test_json = test_collection.to_json()

    return test_json

# Testing Route - Inserts test document of param name 
@app.route("/api/<name>")
def add_test(name):
    test = Test()
    test.name = name
    test.save()
    return f"Check database for name: {name}"

# Testing Route - Prints all available urls
@app.route("/api/urls")
def view_routes():
    urls = {}

    for rule in app.url_map.iter_rules():
        if rule.endpoint != "static":
            urls[rule.rule] = app.view_functions[rule.endpoint].__doc__

    return jsonify(urls)

# @app.route("/api/<name>")
# def home_page(name):
#     db = client["appetite-eatery-db"]
#     db.test.insert_one({"name": name})
#     return f"Check database for name: {name}"

@app.errorhandler(404)
def page_not_found(e):
    # your processing here
    print("REROUTING TO REACT APP @ index.html")
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
