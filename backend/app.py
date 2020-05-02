from flask import Flask, render_template, request
from flask_cors import CORS
# from pymongo import MongoClient
from mongoengine import connect
import os

# from bson import ObjectId
from flask import jsonify

# Testing Purposes Only
from .models.testmodel import Test
# from appetite-eatery.models.testmodel import Test

# Route Imports
from .routes.restaurant import restaurant
from .routes.user import user
from .routes.review import review

# S3 Access
import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

app = Flask(__name__, static_url_path='',
            static_folder='build', template_folder='build')

# For development only
CORS(app)

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
print(f"S3_BUCKET={os.getenv('S3_BUCKET')}")
print(f"S3_ACCESS_KEY_ID={os.getenv('S3_ACCESS_KEY_ID')}")
print(f"S3_SECRET_ACCESS_KEY={os.getenv('S3_SECRET_ACCESS_KEY')}")
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

# Testing Route - Updates test document by query
@app.route("/api/<name>", methods=['PUT'])
def update_test(name):

    test = Test.objects(name = name)

    for key in request.args:
        test.update(**{key: request.args[key]})

    return "updated", 200

# Testing Route - Prints all available urls
@app.route("/api/urls")
def view_routes():
    urls = {}

    for rule in app.url_map.iter_rules():
        if rule.endpoint != "static":
            urls[rule.rule] = app.view_functions[rule.endpoint].__doc__

    return jsonify(urls)

@app.route("/fronttest", methods=['POST'])
def test_frontend():
    print(request)
    print(request.json)
    print(request.json['tester'])
    print(request.json['testerarray'])
    print(request.json['testernested']['testernested1'])
    print(request.args)
    for key in request.args:
        print("key")
        print(key)
        print("value")
        print(request.args[key])

    return "i regret my life", 200

# @app.route("/api/<name>")
# def home_page(name):
#     db = client["appetite-eatery-db"]
#     db.test.insert_one({"name": name})
#     return f"Check database for name: {name}"

# /api/img-get
# <img src="http://127.0.0.1:5000/api/img-get?url="
# GET - return requested image
@restaurant.route('/api/img-get', methods=['GET'])
def get_image():
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )

    fileurl = request.args['url']
    image = s3_resource.Object(S3_BUCKET, fileurl).get()

    return image['Body'].read(), { "Content-Type": "image/png, image/jpg"}

@app.errorhandler(404)
def page_not_found(e):
    # your processing here
    print("REROUTING TO REACT APP @ index.html")
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
