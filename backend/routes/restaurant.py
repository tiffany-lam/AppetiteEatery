from flask import Blueprint, Response, Request, jsonify
from backend.models.restaurantmodel import Restaurant, Details, Hours

restaurant = Blueprint('restaurant', __name__)

# /api/restaurant/<id>
@restaurant.route('/<id>', methods=['GET', 'PUT'])
def retrieve_restaurant():
    if request.method == 'PUT':
        restaurantName = request.form['name']

    # return Response(some db object, mimetype="application/json", status=200)