from app.models import db, Project, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_projects():
    # Get users
    demo = User.query.filter(User.email == 'demo@aa.io').first()
    terry = User.query.filter(User.email == 'terry@aa.io').first()
    sam = User.query.filter(User.email == 'sam@aa.io').first()

    # Make some projects
    project1 = Project(
        title="Smart Water Bottle",
        description="A water bottle that tracks how much you drink and shows temperature",
        goal=25000,
        current_amount=8750,
        deadline=datetime.now() + timedelta(days=22),
        category="Technology",
        image_url="",
        user_id=demo.id if demo else 1
    )

    project2 = Project(
        title="Fantasy Board Game",
        description="Board game with miniatures and cool fantasy stuff",
        goal=50000,
        current_amount=42300,
        deadline=datetime.now() + timedelta(days=12),
        category="Games",
        image_url="",
        user_id=terry.id if terry else 1
    )

    project3 = Project(
        title="Wooden Desk Organizer",
        description="Bamboo desk organizer with wireless charging built in",
        goal=15000,
        current_amount=6200,
        deadline=datetime.now() + timedelta(days=35),
        category="Art",
        image_url="",
        user_id=sam.id if sam else 1
    )

    project4 = Project(
        title="Food Truck Documentary",
        description="Documentary about food truck owners and their stories",
        goal=12000,
        current_amount=3400,
        deadline=datetime.now() + timedelta(days=28),
        category="Film & Video",
        image_url="",
        user_id=demo.id if demo else 1
    )

    project5 = Project(
        title="Folk Music Album",
        description="Help me record my album in a mountain cabin studio",
        goal=8000,
        current_amount=5650,
        deadline=datetime.now() + timedelta(days=18),
        category="Music",
        image_url="",
        user_id=terry.id if terry else 1
    )

    project6 = Project(
        title="Craft Beer Brewery",
        description="Start a local craft brewery with unique flavors",
        goal=30000,
        current_amount=11200,
        deadline=datetime.now() + timedelta(days=40),
        category="Food & Drink",
        image_url="",
        user_id=sam.id if sam else 1
    )

    project7 = Project(
        title="Space Cats Comic Book",
        description="Graphic novel about cats in space having adventures",
        goal=20000,
        current_amount=16800,
        deadline=datetime.now() + timedelta(days=25),
        category="Art",
        image_url="",
        user_id=demo.id if demo else 1
    )

    project8 = Project(
        title="Smart Garden Pod",
        description="Grow herbs and vegetables indoors with automated system",
        goal=35000,
        current_amount=21500,
        deadline=datetime.now() + timedelta(days=31),
        category="Technology",
        image_url="",
        user_id=terry.id if terry else 1
    )

    project9 = Project(
        title="Indie Racing Game",
        description="Retro-style racing game with custom tracks",
        goal=18000,
        current_amount=7300,
        deadline=datetime.now() + timedelta(days=42),
        category="Games",
        image_url="",
        user_id=sam.id if sam else 1
    )

    project10 = Project(
        title="Solar Power Bank",
        description="Portable power bank that charges with solar panels",
        goal=40000,
        current_amount=32100,
        deadline=datetime.now() + timedelta(days=8),
        category="Technology",
        image_url="",
        user_id=demo.id if demo else 1
    )

    # Add them all to database
    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.add(project5)
    db.session.add(project6)
    db.session.add(project7)
    db.session.add(project8)
    db.session.add(project9)
    db.session.add(project10)
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
    
    db.session.commit()