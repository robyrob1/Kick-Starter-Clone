from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

# Categories
def seed_categories():
    categories = [
        Category(name="Technology"),
        Category(name="Art"),
        Category(name="Games"),
        Category(name="Music"),
        Category(name="Film & Video"),
        Category(name="Food & Drink"),
    ]

    db.session.add_all(categories)
    db.session.commit()
    
    # Return the list of categories so they can be used in other seed files
    return categories

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
    
    db.session.commit()
