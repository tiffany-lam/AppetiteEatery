from flask import Blueprint, Response, request, jsonify
from backend.models.usermodel import Patron, Owner

user = Blueprint('user', __name__)

# /api/user/patron
@user.route('/patron', methods=["POST"])
def add_patron():
    print(request.method)
    if request.method == 'POST':
        # Alternative: Patron(_id = request.form['id'], fname = request.form['fname'] ... )
        patron = Patron()

        patron._id = request.form['id']
        patron.fname = request.form['fname']
        patron.lname = request.form['lname']
        patron.email = request.form['email']

        patron.save()

        return patron.to_json(), 200

# /api/user/owner
@user.route('/owner', methods=["POST"])
def add_owner():
    print(request.method)
    if request.method == 'POST':
        # Alternative: Owner(_id = request.form['id'], fname = request.form['fname'] ... )
        owner = Owner()

        owner._id = request.form['id']
        owner.fname = request.form['fname']
        owner.lname = request.form['lname']
        owner.email = request.form['email']

        owner.save()

        return owner.to_json(), 200