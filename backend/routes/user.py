from flask import Blueprint, Response, request, jsonify
from ..models.usermodel import Client, Patron, Owner
import json

import json

import boto3
from ..config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

user = Blueprint('user', __name__)

# /api/user/patron
@user.route('/patron', methods=['POST'])
def add_patron():
    print(request.method)
    if request.method == 'POST':
        # Alternative: Patron(_id = request.form['id'], fname = request.form['fname'] ... )
        patron = Patron()

        # patron._id = request.form['id']
        # patron.fname = request.form['fname']
        # patron.lname = request.form['lname']
        # patron.email = request.form['email']

        patron._id = request.json['id']
        patron.fname = request.json['fname']
        patron.lname = request.json['lname']
        patron.email = request.json['email']

        patron.save()

        return patron.to_json(), 200

# /api/user/owner
@user.route('/owner', methods=['POST'])
def add_owner():
    print(request.method)
    if request.method == 'POST':
        # Alternative: Owner(_id = request.form['id'], fname = request.form['fname'] ... )
        owner = Owner()

        # owner._id = request.form['id']
        # owner.fname = request.form['fname']
        # owner.lname = request.form['lname']
        # owner.email = request.form['email']

        owner._id = request.json['id']
        owner.fname = request.json['fname']
        owner.lname = request.json['lname']
        owner.email = request.json['email']

        owner.save()

        return owner.to_json(), 200


@user.route('/img-upload/<id>', methods=['POST', 'PUT'])
def upload_images(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )

    avatar = request.files["avatar"]
    client = Client.objects.with_id(id)

    s3_resource.Bucket(S3_BUCKET).objects.filter(
        Prefix=f'clients/{client._id}').delete()
    s3_resource.Bucket(S3_BUCKET).put_object(
        Key=f'clients/{client._id}/{avatar.filename}', Body=avatar)

    client.avatar = f'clients/{client._id}/{avatar.filename}'
    client.save()

    return client.to_json(), 200


@user.route('/test/<id>', methods=['GET'])
def get_client(id):
    client = Client.objects.with_id(id)

    print(client.to_json())
    for review in client.reviews:
        print(review.fetch().to_json())

    return "safjaksdf", 200


@user.route('/<id>', methods=['DELETE', 'GET'])
def delete_client(id):
    if request.method == 'DELETE':
        client = Client.objects.with_id(id)

        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id=S3_ACCESS_KEY_ID,
            aws_secret_access_key=S3_SECRET_ACCESS_KEY
        )

        if client._cls == 'Client.Patron':
            if client.reviews:
                for review in client.reviews:
                    s3_resource.Bucket(S3_BUCKET).objects.filter(
                        Prefix=f'restaurant/{review.fetch().restaurant}/reviews/{client.id}').delete()
                    # restaurant = review.restaurant.fetch()
                    # restaurant.reviews.remove(review.id)

            s3_resource.Bucket(S3_BUCKET).objects.filter(
                Prefix=f'clients/{client.id}/').delete()
            client.delete()

            return f'{id} patron deleted successfully', 200

        elif client._cls == 'Client.Owner':
            if client.restaurants:
                for restaurant in client.restaurants:
                    s3_resource.Bucket(S3_BUCKET).objects.filter(
                        Prefix=f'restaurant/{restaurant.fetch().id}').delete()

            s3_resource.Bucket(S3_BUCKET).objects.filter(
                Prefix=f'clients/{client.id}/').delete()
            client.delete()

            return f'{id} owner deleted successfully', 200

        else:
            return "Client delete failed", 200
    elif request.method == 'GET':
        print(f'ID {id}')
        client = Client.objects.with_id(id)
        print(client)
        print(client.to_json())

        return client.to_json(), 200


@user.route('/<id>', methods=['GET'])
def getPatron(id):
    print("-----Getting User from ID-------")
    patron = Client.objects.with_id(id)

    print(patron)
    print(patron.to_json())

    return patron.to_json(), 200

    # patronObject = dict()
    # patronsObject["user"] = []

    # for patron in patrons:
    #     patronsObject['results'].append(patron.to_mongo().to_dict())
    #     print("each patron", patron.to_mongo().to_dict())

    # return json.dumps(patronsObject, default=str), 200

@user.route('/getPatronReviews/<id>', methods=['GET'])
def getPatronReviews(id):
    print("T E S T I N G 1 2 3")
    patron = Client.objects.with_id(id)

    reviews = dict()
    reviews["reviews"] = []

    for review in patron['reviews']:
        # reviews["reviews"].append(review.fetch().to_mongo().to_dict())
        reviewObj = review.fetch()
        restaurantName = reviewObj.restaurant.fetch().restaurantName
        updatedReview = reviewObj.to_mongo().to_dict()
        updatedReview['restaurant'] = restaurantName
        reviews["reviews"].append(updatedReview)
 
    print("H E R E")
    print(reviews)
    return json.dumps(reviews, default=str), 200
  
    # print("testing 123")
    # reviews = Review.objects(user = id)
    # print(reviews.to_json())
    # reviews.to_json(), 200


@user.route('/exists/<id>', methods=['GET'])
def user_exist(id):
    client = Client.objects.with_id(id)

    if client == None:
        return (json.dumps(False), 200)
    else:
        return (json.dumps(True), 200)

@user.route('/modify_patron/<id>', methods=['POST'])
def modify_patron(id):
    print("printtttt")
    patron = Patron.objects.with_id(id)

    print(patron.to_json())
    print(request.json)

    patron.fname=request.json['fname']
    patron.lname=request.json['lname']
    patron.about=request.json['about']
    patron.tags=request.json['tags']

    patron.save()

    return patron.to_json(), 200
