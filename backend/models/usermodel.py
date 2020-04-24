from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (StringField, ListField, LazyReferenceField,  ObjectIdField, EmailField)

# from backend.models.reviewmodel import Review
# from backend.models.restaurantmodel import Restaurant

class Client(Document):
    _id = ObjectIdField(primary_key=True)
    fname = StringField(required=True)
    lname = StringField(required=True)
    email = EmailField(unique=True, required=True)

    meta = {'allow_inheritance': True}

class Patron(Client):
    reviews = ListField(LazyReferenceField('Review'))

class Owner(Client):
    restaurantid = ListField(LazyReferenceField('Restaurant'))