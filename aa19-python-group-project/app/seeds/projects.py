from app.models import db, Project, User, Category, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

# 1. Update the function to accept users and categories
def seed_projects(users, categories):
    # 2. Get the specific user and category objects from the lists passed in
    demo, sam, terry = users
    technology, art, games, music, film_video, food_drink = categories

    # --- Project Definitions ---
    project1 = Project(
        title="Smart Water Bottle",
        description="A water bottle that tracks how much you drink and shows temperature",
        goal=25000,
        current_amount=8750,
        deadline=datetime.now() + timedelta(days=22),
        category="Technology",
        image_url="",
        user_id=demo.id
    )
    project1.categories.append(technology) # 3. Link the category

    project2 = Project(
        title="Fantasy Board Game",
        description="Board game with miniatures and cool fantasy stuff",
        goal=50000,
        current_amount=42300,
        deadline=datetime.now() + timedelta(days=12),
        category="Games",
        image_url="",
        user_id=terry.id
    )
    project2.categories.append(games)

    project3 = Project(
        title="Wooden Desk Organizer",
        description="Bamboo desk organizer with wireless charging built in",
        goal=15000,
        current_amount=6200,
        deadline=datetime.now() + timedelta(days=35),
        category="Art",
        image_url="",
        user_id=sam.id
    )
    project3.categories.append(art)

    project4 = Project(
        title="Food Truck Documentary",
        description="Documentary about food truck owners and their stories",
        goal=12000,
        current_amount=3400,
        deadline=datetime.now() + timedelta(days=28),
        category="Film & Video",
        image_url="",
        user_id=demo.id
    )
    project4.categories.append(film_video)

    project5 = Project(
        title="Folk Music Album",
        description="Help me record my album in a mountain cabin studio",
        goal=8000,
        current_amount=5650,
        deadline=datetime.now() + timedelta(days=18),
        category="Music",
        image_url="",
        user_id=terry.id
    )
    project5.categories.append(music)

    project6 = Project(
        title="Craft Beer Brewery",
        description="Start a local craft brewery with unique flavors",
        goal=30000,
        current_amount=11200,
        deadline=datetime.now() + timedelta(days=40),
        category="Food & Drink",
        image_url="",
        user_id=sam.id
    )
    project6.categories.append(food_drink)

    project7 = Project(
        title="Space Cats Comic Book",
        description="Graphic novel about cats in space having adventures",
        goal=20000,
        current_amount=16800,
        deadline=datetime.now() + timedelta(days=25),
        category="Art",
        image_url="",
        user_id=demo.id
    )
    project7.categories.append(art)

    project8 = Project(
        title="Smart Garden Pod",
        description="Grow herbs and vegetables indoors with automated system",
        goal=35000,
        current_amount=21500,
        deadline=datetime.now() + timedelta(days=31),
        category="Technology",
        image_url="",
        user_id=terry.id
    )
    project8.categories.append(technology)

    project9 = Project(
        title="Indie Racing Game",
        description="Retro-style racing game with custom tracks",
        goal=18000,
        current_amount=7300,
        deadline=datetime.now() + timedelta(days=42),
        category="Games",
        image_url="",
        user_id=sam.id
    )
    project9.categories.append(games)

    project10 = Project(
        title="Solar Power Bank",
        description="Portable power bank that charges with solar panels",
        goal=40000,
        current_amount=32100,
        deadline=datetime.now() + timedelta(days=8),
        category="Technology",
        image_url="",
        user_id=demo.id
    )
    project10.categories.append(technology)

    project11 = Project(
        title="Community Mural Project",
        description="A large-scale public mural painted by local artists and community members.",
        goal=15000,
        current_amount=7800,
        deadline=datetime.now() + timedelta(days=45),
        category="Art",
        image_url="",
        user_id=sam.id
    )
    project11.categories.append(art)

    project12 = Project(
        title="Digital Art Workshop for Kids",
        description="Free weekend workshops to teach children the basics of digital illustration.",
        goal=8000,
        current_amount=8000,
        deadline=datetime.now() + timedelta(days=10),
        category="Art",
        image_url="",
        user_id=terry.id
    )
    project12.categories.append(art)

    project13 = Project(
        title="Cozy Farming RPG 'Stardew Valley'",
        description="An indie role-playing game about inheriting a farm and building a new life.",
        goal=25000,
        current_amount=19500,
        deadline=datetime.now() + timedelta(days=60),
        category="Games",
        image_url="",
        user_id=demo.id
    )
    project13.categories.append(games)

    project14 = Project(
        title="Escape Room Board Game",
        description="A tabletop board game that simulates the escape room experience.",
        goal=30000,
        current_amount=35000,
        deadline=datetime.now() + timedelta(days=2),
        category="Games",
        image_url="",
        user_id=sam.id
    )
    project14.categories.append(games)

    project15 = Project(
        title="Debut Vinyl Album Pressing",
        description="Funding to press a limited edition run of our band's debut album on vinyl.",
        goal=12000,
        current_amount=9500,
        deadline=datetime.now() + timedelta(days=25),
        category="Music",
        image_url="",
        user_id=terry.id
    )
    project15.categories.append(music)

    project16 = Project(
        title="Short Animated Film 'The Lighthouse'",
        description="An animated short film about a lonely lighthouse keeper.",
        goal=50000,
        current_amount=41200,
        deadline=datetime.now() + timedelta(days=38),
        category="Film & Video",
        image_url="",
        user_id=demo.id
    )
    project16.categories.append(film_video)

    project17 = Project(
        title="Artisanal Hot Sauce Launch",
        description="Help us launch our line of small-batch, artisanal hot sauces.",
        goal=18000,
        current_amount=18300,
        deadline=datetime.now() + timedelta(days=5),
        category="Food & Drink",
        image_url="",
        user_id=sam.id
    )
    project17.categories.append(food_drink)

    project18 = Project(
        title="Mobile Coffee Cart",
        description="A mobile coffee cart to bring specialty espresso to local events.",
        goal=22000,
        current_amount=15000,
        deadline=datetime.now() + timedelta(days=50),
        category="Food & Drink",
        image_url="",
        user_id=terry.id
    )
    project18.categories.append(food_drink)

    # 4. Use add_all for efficiency
    all_projects = [
        project1, project2, project3, project4, project5, project6, project7,
        project8, project9, project10, project11, project12, project13, project14,
        project15, project16, project17, project18
    ]
    db.session.add_all(all_projects)
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
    
    db.session.commit()