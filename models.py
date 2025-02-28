from flask_login import UserMixin
from sqlalchemy import Column, Integer, String
from extensions import db  # Import db from extensions.py

class User(UserMixin, db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(64), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(256))
