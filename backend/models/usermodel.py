from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (StringField, ListField, LazyReferenceField,  ObjectIdField, EmailField)

class Client(Document):
    meta = { 'collection': 'clients', 'allow_inheritance': True}

    _id = ObjectIdField(primary_key=True)
    fname = StringField(required=True)
    lname = StringField(required=True)
    avatar = StringField()
    email = EmailField(unique=True, required=True)

class Patron(Client):
    reviews = ListField(LazyReferenceField('Review'))

class Owner(Client):
    restaurants = ListField(LazyReferenceField('Restaurant'))