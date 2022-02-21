from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Recipe, Category, Photo, db, Review, Ingredient, User
from app.forms import NewIngredientForm
from sqlalchemy.orm import joinedload

ingredient_routes = Blueprint('ingredients', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@ingredient_routes.route('', methods=['GET'])
def all_ingredients():

    ingredients = Ingredient.query.all()

    return {"data": [ingredient.to_dict() for ingredient in ingredients]}

@ingredient_routes.route('', methods=['POST'])
@login_required
def add_ingredient():
    data = request.json
    form = NewIngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        ingredient = Ingredient(**data)
        db.session.add(ingredient)
        db.session.commit()
        return ingredient.to_dict()

    return  {'errors': validation_errors_to_error_messages(form.errors)}, 401

@ingredient_routes.route('/<int:ing_id>', methods=['PATCH'])
@login_required
def edit_ingredient(ing_id):

    data = request.json
    form = NewIngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        ingredient_to_update = Ingredient.query.filter(Ingredient.id == ing_id).one()

        ingredient_to_update.name = data['name']
        db.session.commit()

        return data
    return { "errors": validation_errors_to_error_messages(form.errors)}, 401


@ingredient_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
    remove = Ingredient.query.get(id)
    db.session.delete(remove)
    db.session.commit()
    return remove.to_dict()
