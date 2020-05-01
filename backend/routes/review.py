from flask import Blueprint, Response, request, jsonify

# Models
from backend.models.reviewmodel import Review

# JSON
from flask import jsonify

# S3 Access
import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

review = Blueprint('review', __name__)

# /api/review
# POST - upload a new review
@review.route('', methods=['POST'])
def add_review():
    
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

        review.save()

        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id = S3_ACCESS_KEY_ID,
            aws_secret_access_key = S3_SECRET_ACCESS_KEY
        )

        files = request.files.getlist("images[]")
        id = review._id

        for image in files:
            # print(f'Dealing with image {image.filename}')
            s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{review.restaurant}/reviews/{id}/{image.filename}', Body=image)
            review.images.append(f'restaurant/{review.restaurant}/reviews/{id}/{image.filename}')
            # print(f'Finished with image {image.filename}')

        review.save()

        return review.to_json(), 200

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