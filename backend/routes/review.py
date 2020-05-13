# Contributors: Julie Do 014101748, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649, Tiffany Lam 015181853
# Course: CECS 470
# 
# Description: This python file contains routes that access, modify, or delete the review documents of 
# our database. 

# general imports
from flask import Blueprint, Response, request, jsonify

# relevant model imports
from ..models.reviewmodel import Review
from ..models.usermodel import Patron
from ..models.restaurantmodel import Restaurant

# S3 Access
import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

# Instantiate review blueprint
review = Blueprint('review', __name__)

# /api/review
# POST - upload a new review
@review.route('', methods=['POST'])
def add_review():
    if request.method == 'POST':
        # constructor for a review takes in required values
        review = Review(user = request.json['user'], 
                restaurant = request.json['restaurant'],
                rating = request.json['rating'],
                date = request.json['date'],
                content = request.json['content'])
        # save new review
        review.save()
        # fetch the patron who posted the review and append it to the patrons list of reviews
        patron = review.user.fetch()
        patron.reviews.append(review.id)
        # save the modified patron
        patron.save()
        # fetch the restaurant associated with the review and append the review to the restaurants
        # list of reviews
        restaurant = review.restaurant.fetch()
        restaurant.reviews.append(review.id)
        # save the modified restaurant
        restaurant.save()
        # return the new review
        return review.to_json(), 200

# /api/review/img-upload/<id>
# POST/PUT - upload images associated with a review to the s3 bucket and save the image urls in the review
@review.route('/img-upload/<id>', methods=['POST', 'PUT'])
def upload_images(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )
    # get all file images and find the associated review
    files = request.files.getlist("images[]")
    review = Review.objects.with_id(id)
    restaurantid = review.restaurant.fetch().id
    # upload an image associated with the review to the s3 bucket and append its url to the review's list of images
    for image in files:
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{restaurantid}/reviews/{id}/{image.filename}', Body=image)
        review.images.append(f'restaurants/{restaurantid}/reviews/{id}/{image.filename}')
    # save the modified review
    review.save()
    # return the modified review
    return review.to_json(), 200

# /api/review/<id>
# DELETE - route that deletes a review and all it's associated images
@review.route('<id>', methods=['DELETE'])
def delete_review(id):
    if request.method == 'DELETE':
        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id = S3_ACCESS_KEY_ID,
            aws_secret_access_key = S3_SECRET_ACCESS_KEY
        )
        # find the specific review
        review = Review.objects.with_id(id)
        # delete all images associated with the review in the s3 bucket and then delete the review
        s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'{review.restaurant}/reviews/{id}' ).delete()
        review.delete()

        return f'{id} delete successfully', 200