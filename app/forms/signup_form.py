from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def is_email(form, field):
    email = field.data
    if "@" not in email or "." not in email:
        raise ValidationError("You need to enter a valid email address.")

def is_proper_email(form, field):
    email = field.data
    for letter in email:
        if letter == "@":
            break
        elif letter == '.':
            raise ValidationError("You need to enter a properly formatted email address.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email, is_proper_email])
    password = StringField('password', validators=[DataRequired()])
