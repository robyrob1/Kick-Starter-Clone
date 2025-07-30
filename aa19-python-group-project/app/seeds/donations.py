from app.models import db, Donation, environment, SCHEMA
from sqlalchemy.sql import text

def seed_donations():
    donation1 = Donation(
        user_id=2,  # marnie
        project_id=1,  # Smart Plant Pot
        amount=25
    )

    donation2 = Donation(
        user_id=3,  # bobbie
        project_id=2,  # Fantasy Comic Series
        amount=50
    )

    db.session.add_all([donation1, donation2])
    db.session.commit()

def undo_donations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.donations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM donations"))

    db.session.commit()
