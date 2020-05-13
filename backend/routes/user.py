# Contributors: Julie Do 014101748, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649, Tiffany Lam 015181853
# Course: CECS 470
# 
# Description: This python file contains routes that access, modify, or delete the user documents of 
# our database. 

# general imports
from flask import Blueprint, Response, request, jsonify
import json

# relevant model imports
from ..models.usermodel import Client, Patron, Owner

# S3 imports
import boto3
from ..config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

# Instantiate user blueprint
user = Blueprint('user', __name__)

# /api/user/patron
# POST - route creates a new patron user with the sent values, and returns the new user
@user.route('/patron', methods=['POST'])
def add_patron():
    if request.method == 'POST':
        # create an empty patron object
        patron = Patron()
        # modify the values of the patron object as desired
        patron._id = request.json['id']
        patron.fname = request.json['fname']
        patron.lname = request.json['lname']
        patron.email = request.json['email']
        # save modified patron
        patron.save()
        # return modified patron
        return patron.to_json(), 200

# /api/user/owner
# POST - route creates a new owner with the sent values, and returns the new owner
@user.route('/owner', methods=['POST'])
def add_owner():
    if request.method == 'POST':
        # create an empty owner object
        owner = Owner()
        # modify the values of the owner object as desired
        owner._id = request.json['id']
        owner.fname = request.json['fname']
        owner.lname = request.json['lname']
        owner.email = request.json['email']
        # save modified owner
        owner.save()
        # return modified patron
        return owner.to_json(), 200

# /api/user/img-ipload/<id>
# POST/PUT - route uploads a new image associated with a user as the user's avatar
# to the S3 bucket and saves the url in the users document
@user.route('/img-upload/<id>', methods=['POST', 'PUT'])
def upload_images(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )
    # get the avatar image from the request and get the specific client
    avatar = request.files["avatar"]
    client = Client.objects.with_id(id)
    # delete the old avatar image associated with the client and upload the new one
    s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'clients/{client._id}').delete()
    s3_resource.Bucket(S3_BUCKET).put_object(Key=f'clients/{client._id}/{avatar.filename}', Body=avatar)
    # change the avatar url of the client and save the modified client
    client.avatar = f'clients/{client._id}/{avatar.filename}'
    client.save()
    # return the modified client
    return client.to_json(), 200

# Function to delete patron - deletes a patron object and all related s3 images.
def delete_patron(id):
    client = Client.objects.with_id(id)
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )
    # get all reviews in the client and delete their associated images
    if client.reviews:
        for review in client.reviews:
            s3_resource.Bucket(S3_BUCKET).objects.filter(
                Prefix=f'restaurant/{review.fetch().restaurant}/reviews/{client.id}').delete()
    # then delete all images associated with the client
    s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'clients/{client.id}/').delete()
    # then delete the client
    client.delete()

    return f'{id} patron deleted successfully', 200

# Function to delete owner - deletes an owner object and all related s3 images.
def delete_owner(id):
    client = Client.objects.with_id(id)
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )
    # get all restaurants belonging to an owner and delete all related images
    if client.restaurants:
        for restaurant in client.restaurants:
            s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'restaurant/{restaurant.fetch().id}').delete()
    # delete the images related to the owner
    s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'clients/{client.id}/').delete()
    # delete teh owner
    client.delete()

    return f'{id} owner deleted successfully', 200

# /api/user/<id>
# DELETE - route deletes a user through their id
@user.route('/<id>', methods=['DELETE'])
def delete_client(id):
    if request.method == 'DELETE':
        client = Client.objects.with_id(id)

        if client._cls == 'Client.Patron':
            delete_patron(id)

        elif client._cls == 'Client.Owner':
            delete_owner(id)

        else:
            return "Client delete failed", 200

# /api/user/<id>
# GET - route returns a user through their id
@user.route('/<id>', methods=['GET'])
def getClient(id):
    client = Client.objects.with_id(id)

    return client.to_json(), 200

# /api/user/getPatronReviews/<id>
# GET - route returns a deeply populated list of a patrons reviews
@user.route('/getPatronReviews/<id>', methods=['GET'])
def getPatronReviews(id):
    patron = Client.objects.with_id(id)
    # get the specific client
    reviews = dict()
    reviews["reviews"] = []
    # deeply populate the patrons reviews
    for review in patron['reviews']:
        reviewObj = review.fetch()
        restaurantName = reviewObj.restaurant.fetch().restaurantName
        updatedReview = reviewObj.to_mongo().to_dict()
        updatedReview['restaurant'] = restaurantName
        reviews["reviews"].append(updatedReview)
    # return populated patron information
    return json.dumps(reviews, default=str), 200

# /api/user/exists/<id>
# GET - route returns true or false depending on whether or not a client has been found/is associated with the id
@user.route('/exists/<id>', methods=['GET'])
def user_exist(id):
    client = Client.objects.with_id(id)

    if client == None:
        return (json.dumps(False), 200)
    else:
        return (json.dumps(True), 200)

# /api/user/modify_patron/<id>
# POST - route modifies a patron's values and returns the modified document
@user.route('/modify_patron/<id>', methods=['POST'])
def modify_patron(id):
    # get a specific patron 
    patron = Patron.objects.with_id(id)
    # modify the values of the specific patron
    patron.fname=request.json['fname']
    patron.lname=request.json['lname']
    patron.about=request.json['about']
    patron.tags=request.json['tags']
    # save modified patron
    patron.save()
    # return modified patron
    return patron.to_json(), 200
