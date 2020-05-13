# Contributors: Julie Do 014101748, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649, Tiffany Lam 015181853
# Course: CECS 470
# 
# Description: This python file models the client objects/documents being stored in our database. 
# In other words, it sets the structure for all of our client documents stored and retrieved from
# the database, such as the values the document holds, restrictions on each value, relationships between
# different values and different models, and other such rules.
# 
# The client model models clients and includes all relevant information. The client model in particular
# references all users of all types, and specializes into two further classes, called Owner and Patron.
# This inheritance rule is particular to mongoengine and may not be inherent in Mongo Database. The Owner
# Client is able to own restaurants and thus has a list of restaurants. The Patron Client may review and has
# certain profile values. These two classes inherit the general information from the Client Document, which
# includes a first name, last name, email, and id.

# general imports
from datetime import datetime

# mongoengine imports
from mongoengine import Document
from mongoengine import PULL
from mongoengine.fields import (StringField, ListField, LazyReferenceField,  ObjectIdField, EmailField)

# Client Document Structure
class Client(Document):
    # The client objects are saved in the database to the collection known as clients. Inheritance is allowed
    # for specialization into Patron and Owner classes. These classes are different by the automated _cls value
    # which determines the different inheriting classes.
    meta = { 'collection': 'clients', 'allow_inheritance': True}

    # The _id is an inherent value to any Mongo document, and is typically automatically generated. However here, it
    # is linked to the user by the firebase authentication id and set manually.
    _id = StringField(primary_key=True, required=True)
    fname = StringField(required=True)
    lname = StringField(required=True)
    avatar = StringField()
    # The email must be unique.
    email = EmailField(unique=True, required=True)

# Patron Document Structure
class Patron(Client):
    # Reviews is a list of references to all reviews created by the user. The patron also contains special
    # profiling values.
    reviews = ListField(LazyReferenceField('Review'))
    about = StringField()
    tags = ListField(StringField(max_length=50), default=[])
    
# Owner Document Structure
class Owner(Client):
    # The owner contains a list of their restaurants.
    restaurants = ListField(LazyReferenceField('Restaurant'))