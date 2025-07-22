from app.models import db, Campaign, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, timedelta

def seed_campaigns():
    campaign1 = Campaign(
        title='Smart Plant Pot',
        description='A smart pot that waters your plant automatically.',
        goal=5000,
        end_date=date.today() + timedelta(days=30),
        genre='Technology',
        image_url='https://via.placeholder.com/300x200.png?text=Campaign+Image', #placeholder imaged
        creator_id=1
    )

    campaign2 = Campaign(
        title='Fantasy Comic Series',
        description='Help launch Volume 2 of this fantasy epic.',
        goal=3000,
        end_date=date.today() + timedelta(days=20),
        genre='Art',
        image_url='https://via.placeholder.com/300x200.png?text=Campaign+Image', # placeholder imaged
        creator_id=2
    )

    db.session.add_all([campaign1, campaign2])
    db.session.commit()

def undo_campaigns():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campaigns RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campaigns"))

    db.session.commit()
