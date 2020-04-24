from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField GeoPointField, URLField, 
    ReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField
)

class Restaurant(Document):
    meta = { 'collection': 'restaurants'}
    restaurantName = StringField(required = True)
    restaurantTags = ListField(StringField())
    description = StringField()
    dateOpen = DateTimeField()
    ownerid = LazyReferenceField()
    reviews = ListField(LazyReferenceField())
    address = StringField()
    city = StringField()
    zipcode = IntField()
    state = StringField()
    location = GeoPointField()
    hours = {
        sunday: StringField(),
        monday: StringField(),
        tuesday: StringField(),
        wednesday: StringField(),
        thursday: StringField(),
        friday: StringField(),
        saturday: StringField()
    }
    website: URLField()
    menu: ListField(URLField()])
    details: EmbeddedDocumentField()

class Hours(EmbeddedDocument):
            sunday: StringField()
        monday: StringField()
        tuesday: StringField()
        wednesday: StringField()
        thursday: StringField()
        friday: StringField()
        saturday: StringField()