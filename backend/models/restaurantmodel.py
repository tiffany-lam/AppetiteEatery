from datetime import datetime
from mongoengine import Document
from mongoengine import CASCADE
from mongoengine import PULL
# from mongoengine import reverse_delete_rule
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField, GeoPointField, URLField,
    LazyReferenceField, ReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField,
    BooleanField
)

from ..models.usermodel import Owner

PARKING = ("free", "paid", "unavailable")


class Hour(EmbeddedDocument):
    _from = StringField()
    _to = StringField()


class Hours(EmbeddedDocument):
    # sunday = StringField()
    # monday = StringField()
    # tuesday = StringField()
    # wednesday = StringField()
    # thursday = StringField()
    # friday = StringField()
    # saturday = StringField()
    sunday = EmbeddedDocumentField(Hour)
    monday = EmbeddedDocumentField(Hour)
    tuesday = EmbeddedDocumentField(Hour)
    wednesday = EmbeddedDocumentField(Hour)
    thursday = EmbeddedDocumentField(Hour)
    friday = EmbeddedDocumentField(Hour)
    saturday = EmbeddedDocumentField(Hour)


class Details(EmbeddedDocument):
    parking = StringField(choices=PARKING)
    reservation = BooleanField()
    petsAllowed = BooleanField()
    takeout = BooleanField()
    wifi = BooleanField()
    waitTime = StringField()


DEFAULT_HOUR = Hour(_from="", _to="")
DEFAULT_HOURS = Hours(sunday=DEFAULT_HOUR, monday=DEFAULT_HOUR, tuesday=DEFAULT_HOUR,
                      wednesday=DEFAULT_HOUR, thursday=DEFAULT_HOUR, friday=DEFAULT_HOUR, saturday=DEFAULT_HOUR)
DEFAULT_DETAILS = Details(parking="unavailable", reservation=False,
                          petsAllowed=False, takeout=False, wifi=False, waitTime="")


class Restaurant(Document):
    meta = {'collection': 'restaurants'}

    restaurantName = StringField(required=True)
    restaurantTags = ListField(StringField(
        required=True, max_length=50), required=True)
    description = StringField(required=True, max_length=2500)
    dateOpen = DateTimeField(required=True)

    # ownerid = LazyReferenceField('Owner', required=True, reverse_delete_rule=CASCADE)
    # reviews = ListField(LazyReferenceField('Review', reverse_delete_rule=PULL), default=list)
    ownerid = LazyReferenceField(
        'Owner', required=True, reverse_delete_rule=CASCADE)
    reviews = ListField(LazyReferenceField('Review'), default=list)

    address = StringField(required=True)
    city = StringField(required=True)
    zipcode = IntField(required=True)
    state = StringField(required=True)
    location = GeoPointField(required=True)

    hours = EmbeddedDocumentField(Hours, required=True, default=DEFAULT_HOURS)
    details = EmbeddedDocumentField(Details)

    website = StringField()
    # menu = ListField(StringField(required=True), required=True)
    menu = ListField(StringField())
    images = ListField(StringField())

    # website = URLField()
    # menu = ListField(URLField(required=True), required=True)
    # images = ListField(URLField())

    limelightCondition = StringField(default="")


Restaurant.register_delete_rule(Owner, "restaurants", PULL)
