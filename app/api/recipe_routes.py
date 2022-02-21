from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Recipe, Category, Photo, db, Review, Ingredient, User
from app.forms import NewRecipeForm
from sqlalchemy.orm import joinedload

recipe_routes = Blueprint('recipes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@recipe_routes.route('', methods=['GET'])
def all_recipes():
    recipe_data = Recipe.query \
                                .options(joinedload(Recipe.ingredients)) \
                                .options(joinedload(Recipe.user)) \
                                .options(joinedload(Recipe.reviews).options(joinedload(Review.user))) \
                                .options(joinedload(Recipe.categories)) \
                                .options(joinedload(Recipe.photos)) \
                                .all()

    data = []

    for recipe in recipe_data:
        ingredients = [ingredient.to_dict() for ingredient in recipe.ingredients]
        # reviews_set = [review.to_dict() for review in recipe.reviews]
        review_set = get_reviews(recipe.reviews)
        category_set = [category.to_dict() for category in recipe.categories]
        photo_set = [photo.to_dict() for photo in recipe.photos]

        each = {
            "id": recipe.id,
            "name": recipe.name,
            "description": recipe.description,
            "instructions": recipe.instructions,
            "user_id": recipe.user_id,
            "time_created": recipe.time_created,
            "time_update": recipe.time_updated,
            "user": recipe.user.to_dict(),
            "ingredients": ingredients,
            "reviews": review_set,
            "categories": category_set,
            "photos": photo_set
        }

        data.append(each)
    return {"data": data}


def get_reviews(reviews):
    data =[]
    for review in reviews:
        user_data = get_user(review.user)

        review_set = {
            'id': review.id,
            'rating': review.rating,
            "recipe_id": review.recipe_id,
            "review": review.review,
            "time_created": review.time_created,
            "time_updates": review.time_updated,
            "user_id": review.user_id,
            "user": user_data
        }

        data.append(review_set)
    return data


def get_user(user):
    data = []

    user_set = {
            "id": user.id,
            "username": user.username
        }

    data.append(user_set)
    return data


@recipe_routes.route('/new', methods=['POST'])
@login_required
def create_recipe():
    data = request.json
    form = NewRecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        cat = Category.query.filter(Category.name == data['category']).one()
        data.pop('category')
        data.pop('ingredient_one')
        recipe = Recipe(**data)
        recipe.categories.append(cat)
        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@recipe_routes.route('/new/ingredient', methods=['POST'])
@login_required
def create_ingredient():
    data = request.json
    ingredient = Ingredient(**data)
    db.session.add(ingredient)
    db.session.commit()
    return ingredient.to_dict()

@recipe_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
    remove = Recipe.query.get(id)
    db.session.delete(remove)
    db.session.commit()
    return remove.to_dict()


@recipe_routes.route('/edit/<int:id>', methods=['PATCH'])
@login_required
def patch_recipe(id):
    data = request.json
    form = NewRecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cat = Category.query.filter(Category.name == data['category']).one()
        data.pop('category')
        data.pop('ingredient_one')
        recipe = Recipe.query.options(joinedload(Recipe.categories)).get(id)
        recipe.name = data['name']
        recipe.description = data['description']
        recipe.instructions = data['instructions']
        recipe.categories.remove(recipe.categories[0])
        recipe.categories.append(cat)
        db.session.commit()
        return recipe.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@recipe_routes.route('/ingredient/<int:id>', methods=['PATCH'])
@login_required
def edit_ingredient(id):
    data = request.json
    ingredient = Ingredient.query.get(id)
    ingredient.name = data['name']
    db.session.commit()
    return ingredient.to_dict()

@recipe_routes.route('/ingredient/<int:id>', methods=['DELETE'])
@login_required
def del_ingredient(id):
    remove = Ingredient.query.get(id)
    db.session.delete(remove)
    db.session.commit()
    return remove.to_dict()
