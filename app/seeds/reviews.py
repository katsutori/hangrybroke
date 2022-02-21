from app.models import db, Review

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    # Ramen
    ramen_review1 = Review(rating=5, review='Wow. This is quick, easy, and amazing. If you can afford a $3 pack of ramen, this recipe gets a luxurious upgrade!', recipe_id=1, user_id=1)
    ramen_review2 = Review(rating=3, review='This recipe is okay. Lettuce should be left out, because vegetables tastes like sad.', recipe_id=1, user_id=2)
    ramen_review3 = Review(rating=5, review='This is the king of college foods. It takes less than ten minutes to prepare but nutritious enough to get you through one art appreciation class.', recipe_id=1, user_id=3)

    db.session.add(ramen_review1)
    db.session.add(ramen_review2)
    db.session.add(ramen_review3)

    # Cereal
    cereal_review1 = Review(rating=5, review='What can I say? This is Honey Nut Cheerios with nanners. It is the best.', recipe_id=3, user_id=1)
    cereal_review2 = Review(rating=5, review='I can eat this stuff all day. Takes less than a minute to get together.', recipe_id=3, user_id=2)
    cereal_review3 = Review(rating=4, review="I would have given this recipe five stars, but it should have used near rotten bananas instead.", recipe_id=3, user_id=3)

    db.session.add(cereal_review1)
    db.session.add(cereal_review2)
    db.session.add(cereal_review3)

    # Grilled Cheese
    ch_review1 = Review(rating=5, review='This is grilled cheese. How can you go wrong?', recipe_id=4, user_id=1)
    ch_review2 = Review(rating=1, review='This recipe is so hard to follow. I cannot tell when cheese is almost bad, and I have eaten mold one too many times because of this.', recipe_id=4, user_id=2)

    db.session.add(ch_review1)
    db.session.add(ch_review2)

    # Spamich
    spam_review1 = Review(rating=5, review='Spam and bread. That is all I need to get my day going. One day, I will be able to afford to put cheese on this.', recipe_id=5, user_id=1)
    spam_review2 = Review(rating=4, review='Spam is good. Bread is good. Spam and bread together? That is just awesome.', recipe_id=5, user_id=3)

    db.session.add(spam_review1)
    db.session.add(spam_review2)

    # Vienna Bread
    ss_review1 = Review(rating=3, review='This recipe is a bit lack luster. It could really use a sauce.', recipe_id=2, user_id=1)
    ss_review2 = Review(rating=2, review='Vienna Sausages are great by themselves. Why ruin them with bread? Come on, OP!', recipe_id=2, user_id=2)

    db.session.add(ss_review1)
    db.session.add(ss_review2)

    # Water Bread
    w_review1 = Review(rating=1, review='Why does my bread always come out soggy?', recipe_id=6, user_id=1)
    w_review2 = Review(rating=1, review='I tried this recipe. I dipped the bread in water, and it still came out tasting like bread, just wet. Come on, bro. Who comes up with these recipes?', recipe_id=6, user_id=3)

    db.session.add(w_review1)
    db.session.add(w_review2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
