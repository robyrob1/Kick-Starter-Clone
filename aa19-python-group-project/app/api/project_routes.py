from flask import Blueprint, jsonify, request
from app.models import Project, User, db
from flask_login import login_required, current_user
from datetime import datetime

project_routes = Blueprint('projects', __name__)

# Home page, gets all of the projects
@project_routes.route('/')
def get_all_projects():
    projects = Project.query.all()
    return {'projects': [project.to_dict() for project in projects]}   

# This grabs the project by id
@project_routes.route('/<int:id>')
def get_all_projects(id):
    project = Project.query.get(id)
    if not project:
        return {'error': 'Project is not found'}, 404
    
    return project.to_dict()

@project_routes.route('/', methods=['POST'])
@login_required
def create_project():
    data = request.get_json()

    new_project = Project(
        title = 
    )
