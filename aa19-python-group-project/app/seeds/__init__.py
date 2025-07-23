from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from app.models.db import db, environment, SCHEMA
from .categories import seed_categories, undo_categories
from .project_categories import seed_project_categories, undo_project_categories

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Undo all seeds first to avoid duplicates
    undo_project_categories()
    undo_categories()
    undo_users()
    undo_projects()

    # Then seed fresh
    seed_users()
    seed_categories()
    seed_projects()
    seed_project_categories()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_project_categories()
    undo_projects()
    undo_categories()
    undo_users()
