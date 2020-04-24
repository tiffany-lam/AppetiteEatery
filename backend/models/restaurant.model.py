from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField GeoPointField, URLField, 
    ReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField,
    BooleanField
)
from review.model import Review
from user.model import Owner


PARKING = ("Free", "Paid", "Unavailable")

class Hours(EmbeddedDocument):
    sunday: StringField()
    monday: StringField()
    tuesday: StringField()
    wednesday: StringField()
    thursday: StringField()
    friday: StringField()
    saturday: StringField()

class Details(EmbeddedDocument):
    parking: StringField(choices=PARKING)
    reservation: BooleanField()
    petsAllowed: BooleanField()
    takeout: BooleanField()
    wifi: BooleanField()
    waitTime: StringField()

DEFAULT_HOURS = Hours(sunday="", monday="", tuesday="", wednesday="", thursday="", friday="")
DEFAULT_DETAILS = Details(parking="Unavailable", reservation=False, petsAllowed=False, takeout=False, wifi=False, waitTime="")
class Restaurant(Document):
    meta = { 'collection': 'restaurants'}

    restaurantName = StringField(required=True)
    restaurantTags = ListField(StringField(required=True, max_length=50), required=True)
    description = StringField(required=True, max_length=2500)
    dateOpen = DateTimeField(required=True)

    ownerid = LazyReferenceField(Owner, required=True)
    reviews = ListField(LazyReferenceField(Review), default=list)

    address = StringField(required=True)
    city = StringField(required=True)
    zipcode = IntField(required=True)
    state = StringField(required=True)
    location = GeoPointField(required=True)

    hours = EmbeddedDocumentField(Hours, required=True, default=DEFAULT_HOURS)
    details: EmbeddedDocumentField()
    website: URLField()
    menu: ListField(URLField(required=True), required=True)
    
    limelightCondition: StringField(default="")
