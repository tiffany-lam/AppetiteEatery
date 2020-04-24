from flask import Blueprint, Response, Request, jsonify
from backend.models.usermodel import Patron, Owner

user = Blueprint('user', __name__)

# /api/user/<id>
@restaurant.route('/<id>', methods=['GET', 'PUT'])
def retrieve_user():
    if request.method == 'PUT':
        user = request.form['user']

    # return Response(some db object, mimetype="application/json", status=200)