from flask import Blueprint, Response, request, jsonify

# Models
from ..models.reviewmodel import Review
from ..models.usermodel import Patron
from ..models.restaurantmodel import Restaurant

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
        review = Review(user = request.json['user'], 
                restaurant = request.json['restaurant'],
                rating = request.json['rating'],
                date = request.json['date'],
                content = request.json['content'])
        print(review.to_json())
        review.save()
        print(review.to_json())
        patron = review.user.fetch()
        patron.reviews.append(review.id)

        patron.save()

        restaurant = review.restaurant.fetch()
        restaurant.reviews.append(review.id)

        restaurant.save()

        return review.to_json(), 200

@review.route('/img-upload/<id>', methods=['POST'])
def upload_images(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )
    
    files = request.files.getlist("images[]")
    review = Review.objects.with_id(id)
    restaurantid = review.restaurant.fetch().id

    for image in files:
        print(f'Dealing with image {image.filename}')
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{restaurantid}/reviews/{id}/{image.filename}', Body=image)
        review.images.append(f'restaurants/{restaurantid}/reviews/{id}/{image.filename}')
        print(f'Finished with image {image.filename}')

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

        # restaurant = review.restaurant.fetch()
        # restaurant.reviews.remove(review.id)

        # user = review.user.fetch()
        # user.reviews.remove(review.id)

        # restaurant.save()
        # user.save()
        review.delete()

        return f'{id} delete successfully', 200