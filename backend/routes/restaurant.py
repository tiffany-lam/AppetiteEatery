from flask import Blueprint, Response, Request, jsonify
from backend.models.restaurantmodel import Restaurant, Details, Hours

restaurant = Blueprint('restaurant', __name__)

# /api/restaurant
@restaurant.route('', methods=['GET', 'PUT', 'POST'])
def add_restaurant():
    if request.method == 'POSTT':
        hours = Hours(sunday = request.form['sunday'].
                    monday = request.form['monday'],
                    tuesday = request.form['tuesday'],
                    wednesday = request.form['wednesday'],
                    thursday = request.form['thursday'],
                    friday = request.form['friday'],
                    saturday = request.form['saturday'])

        details = Details(parking = request.form['parking'],
                        reservation = request.form['reservartion'],
                        petsAllowed = request.form['petsAllowed'],
                        takeout = request.form['takeout'],
                        wifi = request.form['wifi'],
                        watiTime = request.form['waitTime'])

        restaurant = Restaurant(restaurantName = request.form['restaurantName'],
                                restaurantTags = request.form['restaurantTags'],
                                description = request.form['description'],
                                dateOpen = request.form['dateOpen'],
                                ownerid = request.form['ownerid'],
                                address = request.form['address'],
                                city = request.form['city'],
                                zipcode = request.form['zipcode'],
                                state = request.form['state'],
                                location = request.form['location'],
                                hours = hours,
                                website = request.form['website'],
                                menu = request.form['menu'],
                                limelightCondition = request.form['limelightCondition'])

        print(restaurant.to_json())
        return restaurant.to_json(), 200