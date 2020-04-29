from flask import Blueprint, Response, request, jsonify
from backend.models.reviewmodel import Review

from flask import jsonify

review = Blueprint('review', __name__)

# /api/review
@review.route('', methods=['POST'])
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
                content = request.json['content'],
                images = request.json['images[]'])

        print(review.to_json())
        review.save()

        return review.to_json(), 200