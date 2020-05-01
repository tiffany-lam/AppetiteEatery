from flask import Blueprint, Response, request, jsonify
from backend.models.usermodel import Client, Patron, Owner

import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

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

@user.route('/<id>', methods=['DELETE'])
def delete_client():
    print(request.method)
    if request.method == 'DELETE':
        client = Client.objects.objects.with_id(id)

        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id = S3_ACCESS_KEY_ID,
            aws_secret_access_key = S3_SECRET_ACCESS_KEY
        )

        if client._cls == 'Client.Patron':
            if client.reviews:
                for review in client.reviews:
                    s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'restaurant/{review.fetch().restaurant}/reviews/{client._id}').delete()
            
            client.delete()

        elif client._cls == 'Client.Owner':
            if client.restaurants:
                for restaurant in client.restaurants:
                    s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'restaurant/{restaurant.fetch()._id}').delete()

                client.delete()