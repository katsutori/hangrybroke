from app.models import db, Category

# Adds a demo user, you can add other users here if you want
def seed_categories():
    breakfast = Category(
        name='Breakfast')
    lunch = Category(
        name='Lunch')
    soup = Category(
        name='Soup')
    salad = Category(
        name='Salad')
    dinner = Category(
        name='Dinner')
    dessert = Category(
        name="Dessert")
    snack = Category(
        name='Snack')
    drink = Category(
        name='Drinks')


    db.session.add(soup)
    db.session.add(salad)
    db.session.add(drink)
    db.session.add(dessert)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
