from flask import Blueprint, Response, request, jsonify

# Models
from ..models.restaurantmodel import Restaurant, Details, Hours, Hour
from ..models.usermodel import Owner

# JSON
from bson import ObjectId
import json

# S3 Access
import boto3
from ..config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

restaurant = Blueprint('restaurant', __name__)

# /api/restaurant
# GET - returns all restaurants (unpopulated)
# POST - save a restaurant with relevant data
@restaurant.route('', methods=['GET', 'POST'])
def add_restaurant():

    if request.method == 'POST':

        hours = Hours(sunday=Hour(_from=request.json['hours']['sunday']['from'], _to=request.json['hours']['sunday']['to']),
                      monday=Hour(
                          _from=request.json['hours']['monday']['from'], _to=request.json['hours']['monday']['to']),
                      tuesday=Hour(
                          _from=request.json['hours']['tuesday']['from'], _to=request.json['hours']['tuesday']['to']),
                      wednesday=Hour(
                          _from=request.json['hours']['wednesday']['from'], _to=request.json['hours']['wednesday']['to']),
                      thursday=Hour(
                          _from=request.json['hours']['thursday']['from'], _to=request.json['hours']['thursday']['to']),
                      friday=Hour(
                          _from=request.json['hours']['friday']['from'], _to=request.json['hours']['friday']['to']),
                      saturday=Hour(_from=request.json['hours']['saturday']['from'], _to=request.json['hours']['saturday']['to']))

        details = Details(parking=request.json['details']['parking'],
                          reservation=request.json['details']['reservation'],
                          petsAllowed=request.json['details']['petsAllowed'],
                          takeout=request.json['details']['takeout'],
                          wifi=request.json['details']['wifi'],
                          waitTime=request.json['details']['waitTime'])

        restaurant = Restaurant(restaurantName=request.json['restaurantName'],
                                restaurantTags=request.json['restaurantTags'],
                                description=request.json['description'],
                                dateOpen=request.json['dateOpen'],
                                ownerid=request.json['ownerid'],
                                address=request.json['address'],
                                address2=request.json['address2'],
                                city=request.json['city'],
                                zipcode=request.json['zipcode'],
                                state=request.json['state'],
                                location=request.json['location'],
                                hours=hours,
                                details=details,
                                website=request.json['website'])

        restaurant.save()
        id = restaurant.id

        owner = restaurant.ownerid.fetch()
        owner.restaurants.append(id)
        owner.save()

        return restaurant.to_json(), 200

    elif request.method == 'GET':

        restaurants_collection = Restaurant.objects()

        if (restaurants_collection == None):
            return str(restaurants_collection), 404

        else:
            restaurants_json = restaurants_collection.to_json()
            return restaurants_json, 200
    else:
        return "API not found", 404

# /api/restaurant/<id>
# GET - return a specific restaurant's information deeply based on id
# PUT - updated a specific restaurant's information
# DELETE - delete a specific restaurant
@restaurant.route('/<id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def modify_restaurant(id):
    if request.method == 'GET':
        restaurant = Restaurant.objects.with_id(id)

        if (restaurant == None):
            return str(restaurant), 404

        else:
            updated_restaurant = restaurant.to_mongo().to_dict()
            updated_restaurant['reviews'] = []

            for review in restaurant.reviews:
                updated_review = review.fetch().to_mongo().to_dict()
                updated_review['user'] = review.fetch(
                ).user.fetch().to_mongo().to_dict()
                updated_restaurant['reviews'].append(updated_review)

            updated_restaurant['ownerid'] = restaurant.ownerid.fetch(
            ).to_mongo().to_dict()

            return json.dumps(updated_restaurant, default=str), 200

    elif request.method == 'PUT':
        restaurant = Restaurant.objects.with_id(id)

        if (restaurant == None or (not bool(request.files) and len(request.args) == 0)):
            return str(restaurant), 404

        else:
            s3_resource = boto3.resource(
                "s3",
                aws_access_key_id=S3_ACCESS_KEY_ID,
                aws_secret_access_key=S3_SECRET_ACCESS_KEY
            )

            if bool(request.files):
                files = request.files.getlist("images[]")

                for image in files:
                    # print(f"Dealing with image {image.filename}")
                    if f'restaurants/{id}/{image.filename}' not in restaurant.images:
                        s3_resource.Bucket(S3_BUCKET).put_object(
                            Key=f'restaurants/{id}/{image.filename}', Body=image)
                        restaurant.images.append(
                            f'restaurants/{id}/{image.filename}')
                    # print(f"Finished with image {image.filename}")

                restaurant.save()

                files = request.files.getlist("menu[]")

                for menu in files:
                    print(f"Dealing with menu {menu.filename}")
                    if f'restaurants/{id}/{menu.filename}' not in restaurant.menu:
                        s3_resource.Bucket(S3_BUCKET).put_object(
                            Key=f'restaurants/{id}/{menu.filename}', Body=image)
                        restaurant.menu.append(
                            f'restaurants/{id}/{menu.filename}')
                    print(f"Finished with menu {menu.filename}")

                restaurant.save()

            if ("images[]" in request.args and (request.args.getlist("images[]") != restaurant.images)):
                images = request.args.getlist("images[]")
                restaurantimages = restaurant.images
                for image in restaurantimages:
                    if image in images:
                        print(f'deleting {image}')
                        s3_resource.Object(S3_BUCKET, image).delete()
                        restaurant.images.remove(image)

                restaurant.save()

            if ("menu[]" in request.args and (request.args.getlist("menu[]") != restaurant.menu)):
                menu = request.args.getlist("menu[]")
                restaurantmenu = restaurant.menu
                for image in restaurantmenu:
                    if image in menu:
                        print(f'deleting {image}')
                        s3_resource.Object(S3_BUCKET, image).delete()
                        restaurant.menu.remove(image)

                restaurant.save()

            print(request.args)
            for key in request.args:
                if (key != "images[]" and key != "menu[]"):
                    restaurant.update(**{key: request.args[key]})

            return restaurant.to_json(), 200

    elif request.method == 'POST':
        restaurant = Restaurant.objects.with_id(id)
        print("here")

        restaurant.restaurantName = request.json['restaurantName']
        restaurant.restaurantTags = request.json['restaurantTags']
        restaurant.description = request.json['description']
        restaurant.website = request.json['website']
        print("here2")
        restaurant.hours.sunday._from = request.json['hours']['sunday']['_from']
        restaurant.hours.sunday._to = request.json['hours']['sunday']['_to']
        restaurant.hours.monday._from = request.json['hours']['monday']['_from']
        restaurant.hours.monday._to = request.json['hours']['monday']['_to']
        restaurant.hours.tuesday._from = request.json['hours']['tuesday']['_from']
        restaurant.hours.tuesday._to = request.json['hours']['tuesday']['_to']
        restaurant.hours.wednesday._from = request.json['hours']['wednesday']['_from']
        restaurant.hours.wednesday._to = request.json['hours']['wednesday']['_to']
        restaurant.hours.thursday._from = request.json['hours']['thursday']['_from']
        restaurant.hours.thursday._to = request.json['hours']['thursday']['_to']
        restaurant.hours.friday._from = request.json['hours']['friday']['_from']
        restaurant.hours.friday._to = request.json['hours']['friday']['_to']
        restaurant.hours.saturday._from = request.json['hours']['saturday']['_from']
        restaurant.hours.saturday._to = request.json['hours']['saturday']['_to']
        print("here4")
        restaurant.details.parking = request.json['details']['parking']
        restaurant.details.reservation = request.json['details']['reservation']
        restaurant.details.petsAllowed = request.json['details']['petsAllowed']
        restaurant.details.takeout = request.json['details']['takeout']
        restaurant.details.wifi = request.json['details']['wifi']
        restaurant.details.waitTime = request.json['details']['waitTime']

        originalImages = restaurant.images
        newImages = request.json['images']

        originalMenu = restaurant.menu
        newMenu = request.json['menu']

        updatedImages = [image for image in originalImages not in newImages]
        updatedMenu = [menu for menu in originalMenu not in newMenu]

        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id=S3_ACCESS_KEY_ID,
            aws_secret_access_key=S3_SECRET_ACCESS_KEY
        )

        for image in updatedImages:
            s3_resource.Object(S3_BUCKET, image).delete()

        for image in updatedMenu:
            s3_resource.Object(S3_BUCKET, image).delete()

        restaurant.images = newImages
        restaurant.menu = newMenu

        print(restaurant.to_json())

        restaurant.save()

        return restaurant.to_json(), 200

    elif request.method == 'DELETE':
        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id=S3_ACCESS_KEY_ID,
            aws_secret_access_key=S3_SECRET_ACCESS_KEY
        )

        s3_resource.Bucket(S3_BUCKET).objects.filter(
            Prefix=f'restaurants/{id}').delete()

        restaurant = Restaurant.objects.with_id(id)

        # owner = restaurant.ownerid.fetch()
        # owner.restaurants.remove(id)

        # owner.save()
        restaurant.delete()

        return f'{id} deleted successfully', 200

    else:
        return "API not found", 404

# /api/restaurant/img-upload/<id>
# PUT, POST - update/upload a new image for a restaurant
@restaurant.route('/img-upload/<id>', methods=['POST', 'PUT'])
def upload_images(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )

    files = request.files.getlist("images[]")
    print(len(files))
    restaurant = Restaurant.objects.with_id(id)

    for image in files:
        print(f"Dealing with image {image.filename}")
        s3_resource.Bucket(S3_BUCKET).put_object(
            Key=f'restaurants/{id}/{image.filename}', Body=image)
        if f'restaurants/{id}/{image.filename}' not in restaurant.images:
            restaurant.images.append(f'restaurants/{id}/{image.filename}')
        print(f"Finished with image {image.filename}")

    files = request.files.getlist("menu[]")

    for image in files:
        print(f'Dealing with image {image.filename}')
        s3_resource.Bucket(S3_BUCKET).put_object(
            Key=f'restaurantss/{id}/{image.filename}', Body=image)
        if f'restaurants/{id}/{image.filename}' not in restaurant.menu:
            restaurant.menu.append(f'restaurants/{id}/{image.filename}')
        print(f'Finished with image {image.filename}')

    restaurant.save()

    return restaurant.to_json(), 200


@restaurant.route('/search/<searchvalue>', methods=['GET'])
def search(searchvalue):
    #restaurants_collection = Restaurant.objects()
    resultObject = dict()
    # all the results that we want
    resultObject["search_results"] = []

    # restaurant_collection is an array of restaurants
    # for restaurant in restaurants_collection:
    # if the restaurant list contains (case insensitive) the search value
    # if (restaurant['restaurantName']).lower() in searchvalue.lower():
    # print(restaurant['restaurantName'])
    # resultObject['search_results'].append(restaurant.to_mongo().to_dict())
    for restaurant in Restaurant.objects(restaurantName__icontains=searchvalue):
        resultObject['search_results'].append(restaurant.to_mongo().to_dict())

    return json.dumps(resultObject, default=str), 200


@restaurant.route('/owner/<id>', methods=['GET'])
def getOwnerRestaurants(id):

    ownerObjects = Owner.objects.with_id(id)

    resultObject = dict()
    resultObject["results"] = []

    for test in ownerObjects['restaurants']:
        resultObject['results'].append(test.fetch().to_mongo().to_dict())

    return json.dumps(resultObject, default=str), 200
