from flask import Blueprint, Response, request, jsonify
from backend.models.restaurantmodel import Restaurant, Details, Hours, Hour
from backend.models.usermodel import Owner
from bson import ObjectId
import json

import boto3
from backend.config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

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
                                website = request.json['website'])
                                # menu = request.json['menu'])
                                # images = request.json['images'])

        restaurant.save()
        print(restaurant.to_json())

        id = restaurant.id
        print(id)

        owner = Owner.objects.objects.with_id(restaurant.ownerid)
        owner.restaurant.append(id)
        owner.save()

        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id = S3_ACCESS_KEY_ID,
            aws_secret_access_key = S3_SECRET_ACCESS_KEY
        )

        imagefiles = request.files.getlist("images[]")
        imageurls = []

        for image in imagefiles:
            print(f"Dealing with image {image.filename}")
            s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{id}/{image.filename}', Body=image)
            imageurls.append(f'restaurant/{id}/{image.filename}')
            print(f"Finished with image {image.filename}")

        menufiles = request.files.getlist("menu[]")
        menuurls = []

        for image in menufiles:
            print(f"Dealing with image {image.filename}")
            s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{id}/{image.filename}', Body=image)
            menuurls.append(f'restaurant/{id}/{image.filename}')
            print(f"Finished with image {image.filename}")
        
        restaurant.update(images = imageurls)
        restaurant.update(menu = menuurls)

        print(restaurant.to_json())

        return restaurant.to_json(), 200

    elif request.method == 'GET':

        restaurants_collection = Restaurant.objects()

        if (restaurants_collection == None):
            return str(restaurants_collection), 404

        else: 
            restaurants_json = restaurants_collection.to_json()
            return restaurants_json, 200

# /api/restaurant
@restaurant.route('/<id>', methods=['GET', 'PUT', 'DELETE'])
def update_restaurant(id):
    if request.method == 'GET':
        restaurant = Restaurant.objects.with_id(id)

        if (restaurant == None):
            return str(restaurant), 404

        else:
            updated_restaurant = restaurant.to_mongo().to_dict()
            updated_restaurant['reviews'] = []

            for review in restaurant.reviews:
                updated_review = review.fetch().to_mongo().to_dict()
                updated_review['user'] = review.fetch().user.fetch().to_mongo().to_dict()
                updated_restaurant['reviews'].append(updated_review)

            updated_restaurant['ownerid'] = restaurant.ownerid.fetch().to_mongo().to_dict()

            return json.dumps(updated_restaurant, default=str), 200

    elif request.method == 'PUT':
        restaurant = Restaurant.objects.with_id(id)

        if (restaurant == None or len(request.args) == 0):
            return str(restaurant), 404

        else: 

            s3_resource = boto3.resource(
                "s3",
                aws_access_key_id = S3_ACCESS_KEY_ID,
                aws_secret_access_key = S3_SECRET_ACCESS_KEY
            )

            if (request.files):
                files = request.files.getlist("images[]")
                filenames = []

                for image in files:
                    print(f"Dealing with image {image.filename}")
                    s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{id}/{image.filename}', Body=image)
                    filenames.append(f'restaurant/{id}/{image.filename}')
                    print(f"Finished with image {image.filename}")

                print(restaurant.images)

                restaurant.images.append(filenames)
                restaurant.save()

            if (request.args["images"] and (request.args["images"] != restaurant.images)):
                for image in restaurant.images not in request.args["images"]:
                    s3_resource.Bucket(S3_BUCKET).delete_objects(Key=image)
            
            for key in request.args:
                restaurant.update(**{key: request.args[key]})

            return restaurant.to_json(), 200

    elif request.method == 'DELETE':
        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id = S3_ACCESS_KEY_ID,
            aws_secret_access_key = S3_SECRET_ACCESS_KEY
        )

        print("Called delete")

        s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'restaurants/{id}').delete()

        restaurant = Restaurant.objects.with_id(id)
        restaurant.delete()

        return f'{id} deleted successfully', 200

    else:
        return "API not found", 404

#
@restaurant.route('/img-upload/<_id>', methods=['POST', 'PUT'])
def upload_images(_id):
    print("Img upload called")
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )

    files = request.files.getlist("images[]")

    restaurant = Restaurant.objects.with_id(_id)

    for image in files:
        print(f"Dealing with image {image.filename}")
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{_id}/{image.filename}', Body=image)
        if f'restaurant/{_id}/{image.filename}' not in restaurant.images:
            restaurant.images.append(f'restaurant/{_id}/{image.filename}')
        print(f"Finished with image {image.filename}")

    restaurant.save()

    print(restaurant.images)

    return restaurant.to_json(), 200

# /api/restaurant/img-get/<_id>
# <img src="http://127.0.0.1:5000/api/restaurant/img-get/<_id>"
@restaurant.route('/img-get/<_id>', methods=['GET'])
def get_image(_id):
    print("Img get called")
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id = S3_ACCESS_KEY_ID,
        aws_secret_access_key = S3_SECRET_ACCESS_KEY
    )

    fileurl = request.args['url']

    image = s3_resource.Object(S3_BUCKET, fileurl).get()

    return image['Body'].read(), { "Content-Type": "image/png, image/jpg"}
