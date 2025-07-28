from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_rewards():
    # Get some projects to link rewards to
    project1 = db.session.execute(text("SELECT id FROM projects LIMIT 1")).fetchone()
    project2 = db.session.execute(text("SELECT id FROM projects LIMIT 1 OFFSET 1")).fetchone()
    project3 = db.session.execute(text("SELECT id FROM projects LIMIT 1 OFFSET 2")).fetchone()

    rewards = [
        Reward(
            project_id=project1[0] if project1 else 1,
            title="Early Bird Special",
            description="Get the product at a discounted price for early backers.",
            pledge_amount=50.00,
            estimated_delivery=datetime.now() + timedelta(days=90)
        ),
        Reward(
            project_id=project2[0] if project2 else 2,
            title="Collector's Edition",
            description="Limited edition with extra features and signed by the creator.",
            pledge_amount=100.00,
            estimated_delivery=datetime.now() + timedelta(days=120)
        ),
        Reward(
            project_id=project3[0] if project3 else 3,
            title="VIP Supporter",
            description="Includes a thank you note and VIP access to updates.",
            pledge_amount=200.00,
            estimated_delivery=datetime.now() + timedelta(days=60)
        )
    ]

    for reward in rewards:
        db.session.add(reward)
    db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))
    db.session.commit()
