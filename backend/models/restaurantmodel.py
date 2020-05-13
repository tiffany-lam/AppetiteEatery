# Contributors: Julie Do 014101748, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649, Tiffany Lam 015181853
# Course: CECS 470
# 
# Description: This python file models the restaurant objects/documents being stored in our database. 
# In other words, it sets the structure for all of our restaurant documents stored and retrieved from
# the database, such as the values the document holds, restrictions on each value, relationships between
# different values and different models, and other such rules.
# 
# The restaurant model models restaurants and includes all relevant information. These restaurant models
# must be owned by a user and can have many reviews.

# general imports
from datetime import datetime

# mongoengine imports
from mongoengine import Document
from mongoengine import CASCADE
from mongoengine import PULL
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField, GeoPointField, URLField,
    LazyReferenceField, ReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField,
    BooleanField
)

# relevant model imports
from ..models.usermodel import Owner

# allowed enumerated parking values
PARKING = ("free", "paid", "unavailable")

# Hour Document Structure
class Hour(EmbeddedDocument):
    # Each hour range has a from value, of when the hour range starts, and a to value, of where the
    # hour range ends.
    _from = StringField()
    _to = StringField()

# Hours Document Structure
class Hours(EmbeddedDocument):
    # The hours document contains the hours during which a restaurant is open for each day of the week.
    sunday = EmbeddedDocumentField(Hour)
    monday = EmbeddedDocumentField(Hour)
    tuesday = EmbeddedDocumentField(Hour)
    wednesday = EmbeddedDocumentField(Hour)
    thursday = EmbeddedDocumentField(Hour)
    friday = EmbeddedDocumentField(Hour)
    saturday = EmbeddedDocumentField(Hour)

# Details Document Structure
class Details(EmbeddedDocument):
    # Contains miscellaneous details attached to a restaurant, such as parking, reservation, etc.
    parking = StringField(choices=PARKING)
    reservation = BooleanField()
    petsAllowed = BooleanField()
    takeout = BooleanField()
    wifi = BooleanField()
    waitTime = StringField()

# Default values for default hour document, hours document, and details document.
DEFAULT_HOUR = Hour(_from="", _to="")
DEFAULT_HOURS = Hours(sunday=DEFAULT_HOUR, monday=DEFAULT_HOUR, tuesday=DEFAULT_HOUR,
                      wednesday=DEFAULT_HOUR, thursday=DEFAULT_HOUR, friday=DEFAULT_HOUR, saturday=DEFAULT_HOUR)
DEFAULT_DETAILS = Details(parking="unavailable", reservation=False,
                          petsAllowed=False, takeout=False, wifi=False, waitTime="")

# Restaurant Document Structure
class Restaurant(Document):
    # Restaurant documents are saved in the collection 'restaurants'
    meta = {'collection': 'restaurants'}

    # General required values for a restaurant document
    restaurantName = StringField(required=True)
    restaurantTags = ListField(StringField(max_length=50), default=[])
    description = StringField(required=True, max_length=2500)
    dateOpen = DateTimeField(required=True)

    # Referenced values for a restaurant document
    # If the owner of the restaurant is deleted, then the restaurant is also deleted. The
    # restaurant being deleted deletes all associated reviews, whose are then pulled from their
    # associated users.
    ownerid = LazyReferenceField(
        'Owner', required=True, reverse_delete_rule=CASCADE)
    reviews = ListField(LazyReferenceField('Review'), default=list)

    # Location values for a restaurant document
    address = StringField(required=True)
    address2 = StringField()

    city = StringField(required=True)
    zipcode = StringField(required=True)
    state = StringField(required=True)
    location = GeoPointField(required=True)

    # Details about the restaurant, such as hours open and other miscellaneous details
    hours = EmbeddedDocumentField(Hours, required=True, default=DEFAULT_HOURS)
    details = EmbeddedDocumentField(Details)

    # Website link, list of menus, and list of images
    # Menu and images contain a list of urls used to access images via S3 Bucket
    website = StringField()
    menu = ListField(StringField())
    images = ListField(StringField())

    # Limelight condition to display specific restaurant discount
    limelightCondition = StringField(default="")

# Delete rule registers so that if any restaurants are deleted, the value is pulled from any referencing owner.
Restaurant.register_delete_rule(Owner, "restaurants", PULL)
