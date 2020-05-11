# Critical Imports
from flask import Flask, render_template, request
from flask_cors import CORS

# Database Imports
from mongoengine import connect

# Miscellaneous Imports
import os
from flask import jsonify

# Route Imports
from .routes.restaurant import restaurant
from .routes.user import user
from .routes.review import review

# S3 Access
import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

# Email Import
from flask_mail import Mail, Message

# Flask App Initialization
app = Flask(__name__, static_url_path='',
            static_folder='build', template_folder='build')

# Flask Email
app.config.update(dict(
    MAIL_SERVER = os.getenv('MAIL_SERVER'),
    MAIL_PORT = os.getenv('MAIL_PORT'),
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
))

mail = Mail(app)

# For development only
CORS(app)

# Add Routes mounted at associated location - view routes with app.url_map
app.register_blueprint(restaurant, url_prefix='/api/restaurant')
app.register_blueprint(user, url_prefix='/api/user')
app.register_blueprint(review, url_prefix='/api/review')

# Register and open database connection to MongoDB with credentials
MONGODB_URI = os.getenv('MONGODB_URI')
db_client = connect('appetite-eatery-db', host=(os.getenv('MONGODB_URI')))

# print('---------------------------------------------------------------')
# print('PRINTING ENVIRONMENT VARIABLES')
# print(f"MONGODB_URI={os.getenv('MONGODB_URI')}")
# print(f"FLASK_APP={os.getenv('FLASK_APP')}")
# print(f'CWD: {os.getcwd()}')
# print(f"S3_BUCKET={os.getenv('S3_BUCKET')}")
# print(f"S3_ACCESS_KEY_ID={os.getenv('S3_ACCESS_KEY_ID')}")
# print(f"S3_SECRET_ACCESS_KEY={os.getenv('S3_SECRET_ACCESS_KEY')}")
# print('---------------------------------------------------------------')

@app.route('/')
def render_index():
    return render_template('index.html')

# /api/img-get
# <img src="http://127.0.0.1:5000/api/img-get?url={ROUTE}"
# GET - return requested image body as binary using requested query parameter
@app.route('/api/img-get', methods=['GET'])
def get_image():
    # Initialize AWS S3_Resource instance within route
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )

    # Get requested file url of image
    fileurl = request.args['url']

    # Load image with requested url from AWS S3 Bucket
    image = s3_resource.Object(S3_BUCKET, fileurl).get()

    # Return image body (only available as png or jpg image)
    return image['Body'].read(), {"Content-Type": "image/png, image/jpg"}

# /api/email
# POST - sends an email from appetite-eatery gmail to included sender
@app.route('/api/email', methods=['POST'])
def process_email():
    name = request.json['name']
    sender = request.json['sender']
    subject = request.json['subject']
    body = request.json['body']

    print(name)
    print(sender)
    print(subject)
    print(body)

    msg = Message(subject, sender = (name, sender), recipients=[os.getenv('MAIL_USERNAME')])
    msg.body = body
    print(msg)

    mail.send(msg)
    return "Mail sent!", 200
    
# Error Handling Route - catches all requests to any non-existent route and returns
# react index of error page
@app.errorhandler(404)
def page_not_found(e):
    # your processing here
    print("REROUTING TO REACT APP @ index.html")
    return render_template('index.html')

# Testing Route - Prints all available urls
@app.route("/api/urls")
def view_routes():
    urls = {}

    for rule in app.url_map.iter_rules():
        if rule.endpoint != "static":
            urls[rule.rule] = app.view_functions[rule.endpoint].__doc__

    return jsonify(urls)

# Run Flask App
if __name__ == "__main__":
    app.run()
