from app.models import db, Ingredient

# Adds a demo user, you can add other users here if you want
def seed_ingredients():
    # Ramen
    ramen_water = Ingredient(name='Water', recipe_id=1)
    ramen_ramen = Ingredient(name='Ramen', recipe_id=1)
    ramen_lettuce = Ingredient(name='Romaine Lettuce', recipe_id=1)

    db.session.add(ramen_water)
    db.session.add(ramen_ramen)
    db.session.add(ramen_lettuce)

    # Cereal
    cereal_cereal = Ingredient(name='Honey Nut Cheerio', recipe_id=3)
    cereal_milk = Ingredient(name='Milk', recipe_id=3)
    cereal_banana = Ingredient(name="Banana", recipe_id=3)

    db.session.add(cereal_cereal)
    db.session.add(cereal_milk)
    db.session.add(cereal_banana)

    # Grilled Cheese
    ch_bread = Ingredient(name='Bread', recipe_id=4)
    ch_cheese = Ingredient(name='Almost bad cheese', recipe_id=4)

    db.session.add(ch_bread)
    db.session.add(ch_cheese)

    # Spamich
    spam_bread = Ingredient(name='Bread', recipe_id=5)
    spam_spam = Ingredient(name='Spam', recipe_id=5)

    db.session.add(spam_bread)
    db.session.add(spam_spam)

    # Vienna Bread
    ss_bread = Ingredient(name='Bread', recipe_id=2)
    ss_ss = Ingredient(name='Vienna Sausage', recipe_id=2)

    db.session.add(ss_bread)
    db.session.add(ss_ss)

    # Water Bread
    w_bread = Ingredient(name='Bread', recipe_id=6)
    w_water = Ingredient(name='Water', recipe_id=6)

    db.session.add(w_bread)
    db.session.add(w_water)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
