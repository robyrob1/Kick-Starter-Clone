from flask.cli import AppGroup
from .users import seed_users, undo_users
from .campaigns import seed_campaigns, undo_campaigns
from .comments import seed_comments, undo_comments
from .donations import seed_donations, undo_donations

from .projects import seed_projects, undo_projects
from app.models.db import db, environment, SCHEMA
from .categories import seed_categories, undo_categories
from .project_categories import seed_project_categories, undo_project_categories
from .rewards import seed_rewards, undo_rewards


# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will truncate all tables prefixed with 
        # the schema name.
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add other TRUNCATE commands here for other tables
        db.session.commit()

    
    # The undo commands need to run for all environments to ensure a clean slate.
    # The logic within each undo function already handles the difference
    # between development (DELETE) and production (TRUNCATE).
    undo_rewards()
    undo_project_categories()
    undo_projects()
    undo_donations()
    undo_comments()
    undo_campaigns()
    undo_categories()
    undo_users()
    
    # Now, seed the data into the empty tables
    seeded_users = seed_users()
    seeded_categories = seed_categories()
    seed_projects(seeded_users, seeded_categories)
    seed_project_categories()
    seed_rewards()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Run undo commands in the reverse order of creation
    undo_rewards()
    undo_project_categories()
    undo_projects()
    undo_donations()
    undo_comments()
    undo_campaigns()
    undo_categories()
    undo_users()