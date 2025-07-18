from app.models import db, Category
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

def undo_categories():
    db.session.execute("DELETE FROM categories")
    db.session.commit()