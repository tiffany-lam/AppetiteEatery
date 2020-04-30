from flask import Blueprint, Response, request, jsonify
from backend.models.reviewmodel import Review

from flask import jsonify

import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

review = Blueprint('review', __name__)

# /api/review
@review.route('', methods=['POST'])
def add_review():
    print(request.method)
    if request.method == 'POST':

        files = request.files.getlist("images[]")
        fileurls = upload_images(request.json['restaurant'], files)

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
                content = request.json['content'],
                images = fileurls)

        print(review.to_json())
        review.save()

        return review.to_json(), 200

def upload_images(_id, files):
    print("Img upload called")
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )

    filenames = []

    for image in files:
        print(f"Dealing with image {image.filename}")
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{_id}/{image.filename}', Body=image)
        filenames.append(f'restaurant/{_id}/{image.filename}')
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