from flask import Blueprint, Response, request, jsonify
from backend.models.restaurantmodel import Restaurant, Details, Hours

restaurant = Blueprint('restaurant', __name__)

# /api/restaurant
@restaurant.route('', methods=['GET', 'PUT', 'POST'])
def add_restaurant():
    if request.method == 'POST':
        hours = Hours(sunday = request.form['sunday'],
                    monday = request.form['monday'],
                    tuesday = request.form['tuesday'],
                    wednesday = request.form['wednesday'],
                    thursday = request.form['thursday'],
                    friday = request.form['friday'],
                    saturday = request.form['saturday'])

        # print(hours.to_json())

        details = Details(parking = request.form['parking'],
                        reservation = request.form['reservation'],
                        petsAllowed = request.form['petsAllowed'],
                        takeout = request.form['takeout'],
                        wifi = request.form['wifi'],
                        waitTime = request.form['waitTime'])

        # print(details.to_json())

        restaurant = Restaurant(restaurantName = request.form['restaurantName'],
                                restaurantTags = request.form.getlist('restaurantTags[]'),
                                description = request.form['description'],
                                dateOpen = request.form['dateOpen'],
                                ownerid = request.form['ownerid'],
                                address = request.form['address'],
                                city = request.form['city'],
                                zipcode = request.form['zipcode'],
                                state = request.form['state'],
                                location = [float(i) for i in request.form.getlist('location[]')],
                                hours = hours,
                                website = request.form['website'],
                                menu = request.form.getlist('menu[]'))

        restaurant.save()
        # print(restaurant.to_json())
        return restaurant.to_json(), 200