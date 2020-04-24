from flask import Blueprint, Response, Request, jsonify
from backend.models.review-model import Review

review = Blueprint('review', __name__)

# /api/review/<id>
@review.route('/<id>', methods=['GET'])
def retrieve_review:
    if request.method == 'GET':
        review = request.form['review']

    # return Response(some db object, mimetype="application/json", status=200)