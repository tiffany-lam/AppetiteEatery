from datetime import datetime
from mongoengine import Document
from mongoengine import PULL
from mongoengine.fields import (StringField, ListField, LazyReferenceField,  ObjectIdField, EmailField)

# from backend.models.reviewmodel import Review
# from backend.models.restaurantmodel import Restaurant

class Client(Document):
    meta = { 'collection': 'clients', 'allow_inheritance': True}

    # _id = ObjectIdField(primary_key=True)
    _id = StringField(primary_key=True, required=True)
    fname = StringField(required=True)
    lname = StringField(required=True)
    avatar = StringField()
    email = EmailField(unique=True, required=True)

class Patron(Client):
    # reviews = ListField(LazyReferenceField('Review'), reverse_delete_rule=PULL)
    reviews = ListField(LazyReferenceField('Review'))
    about = StringField()
    tags = ListField(StringField(max_length=50), default=[])

class Owner(Client):
    # restaurants = ListField(LazyReferenceField('Restaurant'), reverse_delete_rule=PULL)
    restaurants = ListField(LazyReferenceField('Restaurant'))

# Review.register_delete_rule(Patron, 'reviews', PULL)
# Restaurant.register_delete_rule(Owner, 'restaurants', PULL)