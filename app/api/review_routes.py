from flask import Blueprint, request, render_template
from flask_login import current_user, login_required
from app.models import db, Review
from app.forms import ReviewForm
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
import json
import datetime

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages

@review_routes.route('/', methods=['GET'])
def get_reviews(recipe_id):
    reviews = Review.query.options(joinedload(Review.user)).filter(Review.recipe_id == recipe_id).order_by(desc(Review.time_created)).all()

    return {'reviews': [{ **review.to_dict(), 'user': review.user.to_dict() } for review in reviews]}


@review_routes.route('/', methods=['POST'])
@login_required
def post_review(recipe_id):
    data = request.json
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_review = Review(
            rating = data["rating"],
            review = data["review"],
            user_id = data["userId"],
            recipe_id = recipe_id,
        )

        db.session.add(new_review)
        db.session.commit()

        return data

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:review_id>/', methods=["PATCH"])
@login_required
def edit_review(recipe_id, review_id):

    data = request.json
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        review_to_update = Review.query.filter(Review.id == review_id).one()

        review_to_update.rating = data["rating"]
        review_to_update.review = data["review"]
        review_to_update.time_updated = datetime.datetime.now()

        db.session.commit()

        return data

    return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:review_id>/', methods=["DELETE"])
@login_required
def delete_review(recipe_id, review_id):
    Review.query.filter(Review.id == review_id).delete()

    db.session.commit()

    return { 'msg': 'Successfully deleted' }
