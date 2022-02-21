from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe, Category


class NewRecipeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    instructions = StringField('Instructions', validators=[DataRequired()])
    category = SelectField('category', choices=["Lunch", "Breakfast", "Snack", "Dinner", "Soup", "Salad", "Drinks", "Dessert"], validators=[DataRequired()])
    user_id = IntegerField('user id')
    ingredient_one = StringField('First Ingredient')
    ingredient_two = StringField('Second Ingredient')
    ingredient_three = StringField('Third Ingredient')
    ingredient_four = StringField('Fourth Ingredient')
    ingredient_five = StringField('Fifth Ingredient')
    submit = SubmitField('submit')
