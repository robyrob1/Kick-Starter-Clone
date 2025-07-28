from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    sam = User(
        username='sam', email='sam@aa.io', password='password')
    terry = User(
        username='terry', email='terry@aa.io', password='password')

    # Create a list of the new users
    all_users = [demo, sam, terry]
    
    # Use add_all to add them to the session efficiently
    db.session.add_all(all_users)
    db.session.commit()
    
    # Return the list of users so they can be used in other seed files
    return all_users


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
