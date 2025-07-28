from flask import Blueprint, jsonify, request
from app.models import Project, User, db, Category # 1. Import the Category model
from flask_login import login_required, current_user
from datetime import datetime

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
def get_all_projects():
    projects = Project.query.all()
    return {'projects': [project.to_dict() for project in projects]}   


@project_routes.route('/<int:id>')
def get_project(id):
    project = Project.query.get(id)
    if not project:
        return {'error': 'Project is not found'}, 404
    
    return project.to_dict()


@project_routes.route('/', methods=['POST'])
@login_required
def create_project():
    data = request.get_json()
    
    
    category_name = data.get('category')

    # Create the new project instance
    new_project = Project(
        title = data['title'],
        description=data['description'],
        goal=data['goal'],
        deadline=datetime.fromisoformat(data['deadline']),
        category=category_name, 
        image_url=data.get('image_url'),
        user_id=current_user.id
    )

    
    if category_name:
        category = Category.query.filter(Category.name == category_name).first()
        
        if category:
            new_project.categories.append(category)

    db.session.add(new_project)
    db.session.commit()
    
    return new_project.to_dict(), 201




@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
    project = Project.query.get(id)
    if not project:
        return {'error': 'Project not found'}, 404
    if project.user_id != current_user.id:
        return {'error': 'Not authorized'}, 403
    
    data = request.get_json()
    
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.goal = data.get('goal', project.goal)
    project.category = data.get('category', project.category)
    project.image_url = data.get('image_url', project.image_url)
    
    if data.get('deadline'):
        project.deadline = datetime.fromisoformat(data['deadline'])
    
    db.session.commit()
    return project.to_dict()


@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    project = Project.query.get(id)
    if not project:
        return {'error': 'Project not found'}, 404
    if project.user_id != current_user.id:
        return {'error': 'Not authorized'}, 403
    
    db.session.delete(project)
    db.session.commit()
    return {'message': 'Project deleted successfully'}