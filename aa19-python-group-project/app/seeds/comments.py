from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        user_id=2,  # marnie
        campaign_id=1,  # Smart Plant Pot
        content="This is such a cool idea! I’ve always wanted something like this."
    )

    comment2 = Comment(
        user_id=3,  # bobbie
        campaign_id=2,  # Fantasy Comic Series
        content="I loved Volume 1! Can’t wait to see what happens next!"
    )

    db.session.add_all([comment1, comment2])
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
