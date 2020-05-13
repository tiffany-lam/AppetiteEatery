# Contributors: Julie Do 014101748, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649, Tiffany Lam 015181853
# Course: CECS 470
# 
# Description: This python file models the review objects/documents being stored in our database. 
# In other words, it sets the structure for all of our review documents stored and retrieved from
# the database, such as the values the document holds, restrictions on each value, relationships between
# different values and different models, and other such rules.
# 
# The review model models reviews attached to particular restaurants rating the quality of the restaurant
# via a rating value, attached images, and a message.

# general imports
from datetime import datetime

# mongoengine imports
from mongoengine import Document
from mongoengine import CASCADE
from mongoengine import PULL
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField, GeoPointField, URLField, 
    LazyReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField,
    BooleanField, ObjectIdField
)

# relevant model imports
from ..models.usermodel import Patron
from ..models.restaurantmodel import Restaurant

# validation function ensuring that a rating passed into a review must be between the inclusive range of 1-5
def _validate_rating(rating):
    if (rating < 1 and rating > 5):
        raise ValidationError('Invalid rating: greater than 5 or less than 1')

# Review Document Structure
class Review(Document):
    # Review documents are saved in the collection 'reviews'
    meta = { 'collection': 'reviews'}

    # The review references the user who created the review and the restaurant the review was created for.
    # Both references include a rule that deletes the review should either of the references be deleted themselves.
    user = LazyReferenceField('Patron', required=True, reverse_delete_rule=CASCADE)
    restaurant = LazyReferenceField('Restaurant', required=True, reverse_delete_rule=CASCADE)

    # General content values of the review
    rating = IntField(required=True, validation=_validate_rating)
    date = DateTimeField(required=True)
    content = StringField(required=True, max_length=1500)
    # Images contains a list of urls used to access images from the s3 bucket
    images = ListField(StringField())

# Should the review be deleted, any references to the review in patron or restaurants will be pulled from the list.
Review.register_delete_rule(Patron, 'reviews', PULL)
Review.register_delete_rule(Restaurant, 'reviews', PULL)