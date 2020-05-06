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
@restaurant.route('/<id>', methods=['GET', 'PUT', 'DELETE'])
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
        if f'restaurant/{id}/{image.filename}' not in restaurant.images:
            restaurant.images.append(f'restaurant/{id}/{image.filename}')
        print(f"Finished with image {image.filename}")

    files = request.files.getlist("menu[]")

    for image in files:
        print(f'Dealing with image {image.filename}')
        s3_resource.Bucket(S3_BUCKET).put_object(
            Key=f'restaurants/{id}/{image.filename}', Body=image)
        if f'restaurant/{id}/{image.filename}' not in restaurant.menu:
            restaurant.menu.append(f'restaurant/{id}/{image.filename}')
        print(f'Finished with image {image.filename}')

    restaurant.save()

    return restaurant.to_json(), 200


@restaurant.route('/owner/<id>', methods=['GET'])
def getOwnerRestaurants(id):
    ownerObjects = Owner.objects.with_id(id)

    resultObject = dict()
    resultObject["results"] = []

    for test in ownerObjects['restaurants']:
        resultObject['results'].append(test.fetch().to_mongo().to_dict())

    return json.dumps(resultObject, default=str), 200
