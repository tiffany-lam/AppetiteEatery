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

        print(hours.to_json())

        details = Details(parking = request.form['parking'],
                        reservation = request.form['reservation'],
                        petsAllowed = request.form['petsAllowed'],
                        takeout = request.form['takeout'],
                        wifi = request.form['wifi'],
                        waitTime = request.form['waitTime'])

        print(details.to_json())

        print(request.form['restaurantName'])
        print(request.form['restaurantTags'])
        print(request.form['description'])
        print(request.form['dateOpen'])
        print(request.form['ownerid'])
        print(request.form['address'])
        print(request.form['city'])
        print(request.form['zipcode'])
        print(request.form['state'])
        print(request.form['location'])
        print(request.form['website'])
        print(request.form['menu'])
        print("Proceeding")

        restaurant = Restaurant(restaurantName = request.form['restaurantName'],
                                # restaurantTags = request.form['restaurantTags'],
                                restaurantTags = ["testtag1", "testtag2"],
                                description = request.form['description'],
                                dateOpen = request.form['dateOpen'],
                                ownerid = request.form['ownerid'],
                                address = request.form['address'],
                                city = request.form['city'],
                                zipcode = request.form['zipcode'],
                                state = request.form['state'],
                                # location = request.form['location'],
                                location = (-71.20, 41.19),
                                hours = hours,
                                website = request.form['website'],
                                # menu = request.form['menu'])
                                menu = ["http://wwww.menu1.com", "http://wwww.menu2.com"])

        restaurant.save()
        print(restaurant.to_json())
        return restaurant.to_json(), 200