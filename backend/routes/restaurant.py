# Contributors: Julie Do 014101748, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649, Tiffany Lam 015181853
# Course: CECS 470
# 
# Description: This python file contains routes that access, modify, or delete the restaurant documents of 
# our database. 

# general imports
from flask import Blueprint, Response, request, jsonify
from datetime import datetime, timedelta
import random
from bson import ObjectId
import json

# relevant model imports
from ..models.restaurantmodel import Restaurant, Details, Hours, Hour
from ..models.usermodel import Owner
from ..models.reviewmodel import Review

# S3 Access
import boto3
from ..config import S3_USERNAME, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

# Instantiate restaurant blueprint
restaurant = Blueprint('restaurant', __name__)

# Function gets all restaurants in our databse and returns them all
def get_all_restaurants():
    # get all restaurant objects
    restaurants_collection = Restaurant.objects()

    # if object is empty, return string saying None
    if (restaurants_collection == None):
        return str(restaurants_collection), 404

    # otherwise format all objects to json and return
    else:
        restaurants_json = restaurants_collection.to_json()
        return restaurants_json, 200

# /api/restaurant
# GET - returns all restaurants (unpopulated)
# POST - save a restaurant with relevant data
@restaurant.route('', methods=['GET', 'POST'])
def add_restaurant():
    if request.method == 'POST':
        # constructor for hours document takes all values allowed for an hours document
        hours = Hours(sunday=Hour(_from=request.json['hours']['sunday']['from'], _to=request.json['hours']['sunday']['to']),
                      monday=Hour(_from=request.json['hours']['monday']['from'], _to=request.json['hours']['monday']['to']),
                      tuesday=Hour(_from=request.json['hours']['tuesday']['from'], _to=request.json['hours']['tuesday']['to']),
                      wednesday=Hour(_from=request.json['hours']['wednesday']['from'], _to=request.json['hours']['wednesday']['to']),
                      thursday=Hour(_from=request.json['hours']['thursday']['from'], _to=request.json['hours']['thursday']['to']),
                      friday=Hour(_from=request.json['hours']['friday']['from'], _to=request.json['hours']['friday']['to']),
                      saturday=Hour(_from=request.json['hours']['saturday']['from'], _to=request.json['hours']['saturday']['to']))
        # constructor for details document takes all values allowed for a details document
        details = Details(parking=request.json['details']['parking'],
                          reservation=request.json['details']['reservation'],
                          petsAllowed=request.json['details']['petsAllowed'],
                          takeout=request.json['details']['takeout'],
                          wifi=request.json['details']['wifi'],
                          waitTime=request.json['details']['waitTime'])
        # constructor for restaurant document takes all values allowed for a restaurant document
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
        # saves the restaurant
        restaurant.save()
        id = restaurant.id
        # add the restaurant to the owners list of restaurant
        owner = restaurant.ownerid.fetch()
        owner.restaurants.append(id)
        owner.save()
        # return the newly created restaurant
        return restaurant.to_json(), 200

    elif request.method == 'GET':
        # return all restaurants
        return get_all_restaurants();

    else:
        return "API not found", 404

# function gets a singular restaurant and returns the restaurant populated deeply with reviews
def get_a_restaurant(id):
    # gets the desired restaurant
    restaurant = Restaurant.objects.with_id(id)

    # if restaurant not found, return a string None
    if (restaurant == None):
        return str(restaurant), 404

    # else if restaurant is found
    else:
        # convert restaurant object to a dictionary and edit key reviews to be an empty array
        updated_restaurant = restaurant.to_mongo().to_dict()
        updated_restaurant['reviews'] = []
        # iterate through all restaurant reviews and deeply populate with the reviews content,
        # and the reviews associated user, and append to reviews array 
        for review in restaurant.reviews:
            updated_review = review.fetch().to_mongo().to_dict()
            updated_review['user'] = review.fetch().user.fetch().to_mongo().to_dict()
            updated_restaurant['reviews'].append(updated_review)

        # populate the restaurants owner id with the restaurant owner information
        updated_restaurant['ownerid'] = restaurant.ownerid.fetch().to_mongo().to_dict()
        # return restaurant that is now deeply populated with reviews, users, and the owner as a json
        return json.dumps(updated_restaurant, default=str), 200

# function edits all values in a restaurant, including images
def edit_a_restaurant(id):
        # retrieve specific restaurant by id
        restaurant = Restaurant.objects.with_id(id)
        # modify general restaurant information
        restaurant.restaurantName = request.json['restaurantName']
        restaurant.restaurantTags = request.json['restaurantTags']
        restaurant.description = request.json['description']
        restaurant.website = request.json['website']
        # modify restaurant hours
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
        # modify restaurant details
        restaurant.details.parking = request.json['details']['parking']
        restaurant.details.reservation = request.json['details']['reservation']
        restaurant.details.petsAllowed = request.json['details']['petsAllowed']
        restaurant.details.takeout = request.json['details']['takeout']
        restaurant.details.wifi = request.json['details']['wifi']
        restaurant.details.waitTime = request.json['details']['waitTime']
        # get original images of the restaurant as well as the new images
        originalImages = restaurant.images
        newImages = request.json['images']
        # get original menus of the restaurant as well as the new menus
        originalMenu = restaurant.menu
        newMenu = request.json['menu']

        # list all images or menus that are no longer in the original list of images/menus
        updatedImages = [image for image in originalImages if image not in newImages]
        updatedMenu = [menu for menu in originalMenu if menu not in newMenu]

        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id=S3_ACCESS_KEY_ID,
            aws_secret_access_key=S3_SECRET_ACCESS_KEY
        )
        # remove deleted images/images no longer in original list of images
        for image in updatedImages:
            s3_resource.Object(S3_BUCKET, image).delete()

        # remove deleted menus/menus no longer in the original list of menus
        for image in updatedMenu:
            s3_resource.Object(S3_BUCKET, image).delete()
        # modify the restaurant images and menus
        restaurant.images = newImages
        restaurant.menu = newMenu
        # save the update
        restaurant.save()
        # return the restaurant as a json
        return restaurant.to_json(), 200

# function deletes a restaurant and all related images
def delete_a_restaurant(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )
    # delete all of the restaurants images from the s3 bucket
    s3_resource.Bucket(S3_BUCKET).objects.filter(Prefix=f'restaurants/{id}').delete()
    # delete the associated restaurant
    restaurant = Restaurant.objects.with_id(id)
    restaurant.delete()

    return f'{id} deleted successfully', 200

# /api/restaurant/<id>
# GET - return a specific restaurant's information deeply based on id
# POST - updated a specific restaurant's information
# DELETE - delete a specific restaurant
@restaurant.route('/<id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def modify_restaurant(id):
    if request.method == 'GET':
        return get_a_restaurant(id)

    elif request.method == 'POST':
        return edit_a_restaurant(id)

    elif request.method == 'DELETE':
        return delete_a_restaurant(id)

    else:
        return "API not found", 404


# creating a search for a word function
# this function looks for a whole word rather than a part of a word
def contains_word(sentence, searchWord):
    return f' {searchWord} ' in f' {sentence} '

# /api/restaurant/img-upload/<id>
# PUT, POST - update/upload a new image for a restaurant
@restaurant.route('/img-upload/<id>', methods=['POST', 'PUT'])
def upload_images(id):
    s3_resource = boto3.resource(
        "s3",
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY
    )

    # get all images uploaded
    files = request.files.getlist("images[]")
    restaurant = Restaurant.objects.with_id(id)

    # add images to s3 bucket and then append images to restaurant's list of images 
    for image in files:
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurants/{id}/{image.filename}', Body=image)
        if f'restaurants/{id}/{image.filename}' not in restaurant.images:
            restaurant.images.append(f'restaurants/{id}/{image.filename}')

    # get all menu files uploaded
    files = request.files.getlist("menu[]")

    # add menu to s3 bucket and then append menu to restaurant's list of menu
    for image in files:
        s3_resource.Bucket(S3_BUCKET).put_object(Key=f'restaurantss/{id}/{image.filename}', Body=image)
        if f'restaurants/{id}/{image.filename}' not in restaurant.menu:
            restaurant.menu.append(f'restaurants/{id}/{image.filename}')

    restaurant.save()

    return restaurant.to_json(), 200

# /api/restaurant/search/<searchvalue>
# GET - returns all restaurants of a related search value
@restaurant.route('/search/<searchvalue>', methods=['GET'])
def search(searchvalue):
    restaurants_collection = Restaurant.objects()
    resultObject = dict()

    # all the results that we want
    resultObject["search_results"] = []
    emptyObject = dict()

    # all the results that we want
    emptyObject["search_results"] = []

    if(searchvalue.lower() == "food"):
        for restaurant in restaurants_collection:
            resultObject['search_results'].append(
                restaurant.to_mongo().to_dict())

    # restaurant_collection is an array of restaurants
    # if the restaurant list contains (case insensitive) the search value
    for restaurant in restaurants_collection:
        if searchvalue.lower() in restaurant['restaurantName'].lower():
            updatedRestaurant = restaurant.to_mongo().to_dict()
            updatedRestaurant['average'] = Review.objects(
                restaurant=restaurant.id).average('rating')
            resultObject['search_results'].append(updatedRestaurant)
        # else, look in tags (they can't find any with the name, look in tags)
        else:
            for tag in restaurant['restaurantTags']:
                # call the function i created earlier, if the searchvalue is found in tag
                if searchvalue in tag:
                    updatedRestaurant = restaurant.to_mongo().to_dict()
                    updatedRestaurant['average'] = Review.objects(
                        restaurant=restaurant.id).average('rating')
                    resultObject['search_results'].append(updatedRestaurant)

    return json.dumps(resultObject, default=str), 200

# /api/restaurant/owner/<id>
# GET - returns all owners restaurants deeply populated
@restaurant.route('/owner/<id>', methods=['GET'])
def getOwnerRestaurants(id):
    ownerObjects = Owner.objects.with_id(id)

    resultObject = dict()
    resultObject["results"] = []

    for restaurant in ownerObjects['restaurants']:
        updatedRestaurant = restaurant.fetch().to_mongo().to_dict()
        updatedRestaurant['average'] = Review.objects(restaurant=restaurant.id).average('rating')
        resultObject['results'].append(updatedRestaurant)

    return json.dumps(resultObject, default=str), 200

# /api/restaurant/limelight
# GET - returns all restaurants satisifying a certain condition
@restaurant.route('/limelight', methods=['GET'])
def getLimelight():

    currentDateTime = datetime.now()
    oneMonthAgo = currentDateTime - timedelta(days=30)

    # gets all the restaurants created in the last 30 days
    restaurants = Restaurant.objects(
        dateOpen__lte=currentDateTime, dateOpen__gte=oneMonthAgo)

    # creates dictionary with a 'results' key which will receive an array
    # this wrapping is necessary becaus e flask does not send back basic lists properly
    resultObject = dict()
    resultObject["results"] = []

    # for a restaurant to be qualified to be on the 'limelight' page
    # the number reviews they have must not exceed a certain threshold (defined below)
    # original requirements was supposed to be 200 but for demonstration purposes,
    # 10 is more attainable
    maxNumOfReviewsForLimelight = 10

    for restaurant in restaurants:
        # for each restaurant that does not exceed the threshold and contains atleast 1 image:
        if len(restaurant.reviews) <= maxNumOfReviewsForLimelight and len(restaurant.images) != 0:
            # get the review average for that restaurant:
            updatedRestaurant = restaurant.to_mongo().to_dict()
            updatedRestaurant['reviewAverage'] = Review.objects(
                restaurant=restaurant.id).average('rating')

            # append the object to the resultObject's list
            resultObject['results'].append(updatedRestaurant)

    # randomly pick 9 uniqueq restaurants from the results to return:
    if len(resultObject['results']) > 9:
        resultObject['results'] = random.sample(resultObject['results'], 9)

    return json.dumps(resultObject, default=str), 200


@restaurant.route('/graduated', methods=['GET'])
def getGraduated():

    # gets all the restaurants:
    restaurants = Restaurant.objects()

    # creates dictionary with a 'results' key which will receive an array
    # this wrapping is necessary becaus e flask does not send back basic lists properly
    resultObject = dict()
    resultObject["results"] = []

    # for a restaurant to graduate they must have more than 10 reviews:
    # original requirements was supposed to be 200 but for demonstration purposes,
    # 10 is more attainable
    minNumOfReviewsTilGraduated = 10

    for restaurant in restaurants:
        # for each restaurant that does not exceed the threshold
        if len(restaurant.reviews) >= minNumOfReviewsTilGraduated:
            # get the review average for that restaurant:
            updatedRestaurant = restaurant.to_mongo().to_dict()
            updatedRestaurant['average'] = Review.objects(
                restaurant=restaurant.id).average('rating')

            # append the object to the resultObject's list
            resultObject['results'].append(updatedRestaurant)

    return json.dumps(resultObject, default=str), 200
