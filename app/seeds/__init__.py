from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .categories import seed_categories, undo_categories
from .ingredients import seed_ingredients, undo_ingredients
from .reviews import seed_reviews, undo_reviews
from .photos import seed_photos, undo_photos

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_recipes()
    seed_categories()
    seed_ingredients()
    seed_reviews()
    seed_photos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_recipes()
    undo_categories()
    undo_ingredients()
    undo_reviews()
    undo_photos()
    # Add other undo functions here
