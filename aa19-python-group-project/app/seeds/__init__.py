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
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_project_categories()
        undo_categories()
        undo_campaigns() 
        undo_users()
        undo_projects()
        undo_rewards()
    seed_users()
    seed_categories()
    seed_projects()
    seed_project_categories()
    # Add other seed functions here
    seed_rewards()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_project_categories()
    undo_projects()
    undo_categories()
    undo_campaigns()
    undo_users()
    undo_donations()
    undo_comments()
    # Add other undo functions here
    undo_rewards()
