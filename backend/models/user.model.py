from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField GeoPointField, URLField, 
    ReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField,
    BooleanField, ObjectIdField
)

class Client(Document):
    _id: ObjectIdField(primary_key=True)
    fname: StringField()
    lname: StringField()
    email: StringField()

    meta = {'allow_inheritance': True}

class Patron(Client):
    reviews: ListField(LazyReferenceField(reverse_delete_rule=CASCADE))

class Owner(Client):
    restaurantid: LazyReferenceField(reverse_delete_rule=CASCADE)