from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe, Category


class NewIngredientForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    submit = SubmitField('submit')
