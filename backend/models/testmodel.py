from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (
    StringField
)

class Test(Document):
    name = StringField()
