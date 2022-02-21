from app.models import db, Photo

# Adds a demo user, you can add other users here if you want
def seed_photos():
    ramen = Photo(url='https://whelp.s3.amazonaws.com/ramen.jpg', recipe_id=1, user_id=1)
    cereal = Photo(url='https://whelp.s3.amazonaws.com/chereal.jpg', recipe_id=3, user_id=1)
    vienna = Photo(url='https://whelp.s3.amazonaws.com/vienna.jpg', recipe_id=2, user_id=1)
    gc = Photo(url='https://whelp.s3.amazonaws.com/moldy.jpg', recipe_id=4, user_id=1)
    spam = Photo(url='https://whelp.s3.amazonaws.com/spam.jpg', recipe_id=5, user_id=1)
    bread = Photo(url='https://whelp.s3.amazonaws.com/breadwater.jpg', recipe_id=6, user_id=1)

    db.session.add(ramen)
    db.session.add(cereal)
    db.session.add(vienna)
    db.session.add(gc)
    db.session.add(spam)
    db.session.add(bread)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
