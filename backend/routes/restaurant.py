from flask import Blueprint, Response, request, jsonify
from backend.models.restaurantmodel import Restaurant, Details, Hours, Hour
from bson import ObjectId
restaurant = Blueprint('restaurant', __name__)

# /api/restaurant
@restaurant.route('', methods=['GET', 'POST'])
def get_restaurant():
    # print(request.method)
    # print(request.json)
    if request.method == 'POST':
        # hours = Hours(sunday = request.form['sunday'],
        #             monday = request.form['monday'],
        #             tuesday = request.form['tuesday'],
        #             wednesday = request.form['wednesday'],
        #             thursday = request.form['thursday'],
        #             friday = request.form['friday'],
        #             saturday = request.form['saturday'])

        hours = Hours(sunday = Hour(_from=request.json['hours']['sunday']['from'], _to=request.json['hours']['sunday']['to']),
            monday = Hour(_from=request.json['hours']['monday']['from'], _to=request.json['hours']['monday']['to']),
            tuesday = Hour(_from=request.json['hours']['tuesday']['from'], _to=request.json['hours']['tuesday']['to']),
            wednesday = Hour(_from=request.json['hours']['wednesday']['from'], _to=request.json['hours']['wednesday']['to']),
            thursday = Hour(_from=request.json['hours']['thursday']['from'], _to=request.json['hours']['thursday']['to']),
            friday = Hour(_from=request.json['hours']['friday']['from'], _to=request.json['hours']['friday']['to']),
            saturday = Hour(_from=request.json['hours']['saturday']['from'], _to=request.json['hours']['saturday']['to']))

        # print(hours.to_json())

        # details = Details(parking = request.form['parking'],
        #                 reservation = request.form['reservation'],
        #                 petsAllowed = request.form['petsAllowed'],
        #                 takeout = request.form['takeout'],
        #                 wifi = request.form['wifi'],
        #                 waitTime = request.form['waitTime'])

        details = Details(parking = request.json['details']['parking'],
                        reservation = request.json['details']['reservation'],
                        petsAllowed = request.json['details']['petsAllowed'],
                        takeout = request.json['details']['takeout'],
                        wifi = request.json['details']['wifi'],
                        waitTime = request.json['details']['waitTime'])

        # print(details.to_json())

        # restaurant = Restaurant(restaurantName = request.form['restaurantName'],
        #                         restaurantTags = request.form.getlist('restaurantTags[]'),
        #                         description = request.form['description'],
        #                         dateOpen = request.form['dateOpen'],
        #                         ownerid = request.form['ownerid'],
        #                         address = request.form['address'],
        #                         city = request.form['city'],
        #                         zipcode = request.form['zipcode'],
        #                         state = request.form['state'],
        #                         location = [float(i) for i in request.form.getlist('location[]')],
        #                         hours = hours,
        #                         website = request.form['website'],
        #                         menu = request.form.getlist('menu[]'),
        #                         images = request.form.getlist('images[]'))

        restaurant = Restaurant(restaurantName = request.json['restaurantName'],
                                restaurantTags = request.json['restaurantTags'],
                                description = request.json['description'],
                                dateOpen = request.json['dateOpen'],
                                ownerid = request.json['ownerid'],
                                address = request.json['address'],
                                city = request.json['city'],
                                zipcode = request.json['zipcode'],
                                state = request.json['state'],
                                location = request.json['location'],
                                hours = hours,
                                details = details,
                                website = request.json['website'],
                                menu = request.json['menu'],
                                images = request.json['images'])

        restaurant.save()
        # print(restaurant.to_json())
        return restaurant.to_json(), 200

    elif request.method == 'GET':

        restaurants_collection = Restaurant.objects()

        if (restaurants_collection == None):
            return str(restaurants_collection), 404

        else: 
            restaurants_json = restaurants_collection.to_json()
            return restaurants_json, 200

# /api/restaurant
@restaurant.route('/<id>', methods=['GET', 'PUT'])
def update_restaurant(id):
    if request.method == 'GET':
        restaurant = Restaurant.objects.with_id(id)

        if (restaurant == None):
            return str(restaurant), 404

        else:
            return restaurant.to_json(), 200

    elif request.method == 'PUT':
        restaurant = Restaurant.objects.with_id(id)

        if (restaurant == None or len(request.args) == 0):
            return str(restaurant), 404

        else: 
            
            for key in request.args:
                restaurant.update(**{key: request.args[key]})

            return restaurant.to_json(), 200


    