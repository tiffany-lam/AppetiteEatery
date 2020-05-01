from flask import Blueprint, Response, request, jsonify
from backend.models.reviewmodel import Review

from flask import jsonify

import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

review = Blueprint('review', __name__)

# /api/review
@review.route('', methods=['POST', 'GET', 'DELETE'])
def add_review():
    print(request.method)
    if request.method == 'POST':

        # review = Review(user = request.form['user'], 
        #                 restaurant = request.form['restaurant'],
        #                 rating = request.form['rating'],
        #                 date = request.form['date'],
        #                 content = request.form['content'],
        #                 images = request.form.getlist('images[]'))

        review = Review(user = request.json['user'], 
                restaurant = request.json['restaurant'],
                rating = request.json['rating'],
                date = request.json['date'],
                content = request.json['content'])
                # images = fileurls)

        print(review.to_json())
        review.save()

        files = request.files.getlist("images[]")
        fileurls = upload_images(request.restaurant, request.user, files)

        review.images = fileurls
        review.save()

        return review.to_json(), 200

def upload_images(restaurantid, userid, files):
    print("Img upload called")
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )

    filenames = []

    for image in files:
        print(f"Dealing with image {image.filename}")
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{restaurantid}/reviews/{userid}/{image.filename}', Body=image)
        filenames.append(f'restaurants/{restaurantid}/reviews/{userid}/{image.filename}')
        print(f"Finished with image {image.filename}")

    return filenames

@review.route('/img-get/<_id>', methods=['GET'])
def get_image(_id):
    print("Img get called")
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )

    fileurl = request.args['url']

    image = s3_resource.Object(S3_BUCKET, fileurl).get()
    return image['Body'].read(), { "Content-Type": "image/png, image/jpg"}

@review.route('<id>', methods=['DELETE'])
def delete_review(id):
    print(request.method)
    if request.method == 'DELETE':
        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id = S3_ACCESS_KEY_ID,
            aws_secret_access_key = S3_SECRET_ACCESS_KEY
        )

        print("Called delete")

        review = Review.objects.with_id(id)

        s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'{review.restaurant}/reviews/{id}' ).delete()

        review.delete()

        return f'{id} delete successfully', 200