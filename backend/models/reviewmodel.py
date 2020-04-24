from datetime import datetime
from mongoengine import Document
from mongoengine import CASCADE
from mongoengine.fields import (
    StringField, DateTimeField, IntField, ListField, GeoPointField, URLField, 
    LazyReferenceField, StringField, EmbeddedDocument, EmbeddedDocumentField,
    BooleanField, ObjectIdField
)
from backend.models.usermodel import Patron
from backend.models.restaurantmodel import Restaurant

def _validate_rating(rating):
    if (rating < 1 and rating > 5):
        raise ValidationError('Invalid rating: greater than 5 or less than 1')

class Review(Document):
    user = LazyReferenceField('Patron', required=True, reverse_delete_rule=CASCADE)
    restaurant = LazyReferenceField('Restaurant', required=True, reverse_delete_rule=CASCADE)
    rating = IntField(required=True, validation=_validate_rating)
    date = DateTimeField(required=True)
    content = StringField(required=True, max_length=1500)
