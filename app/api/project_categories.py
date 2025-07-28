from flask import Blueprint, request, jsonify, abort
from app.models import db, Project, Category, ProjectCategory
from flask_login import current_user

project_categories_bp = Blueprint('project_categories', __name__, url_prefix='/api/projects/<int:project_id>/categories')


def get_project_or_404(project_id):
    project = Project.query.get(project_id)
    if not project:
        abort(404, description="Project not found")
    return project

def check_ownership(project):
    if project.user_id != current_user.id:
        abort(403, description="Forbidden: You do not own this project")


@project_categories_bp.route('', methods=['GET'])
def get_categories(project_id):
    project = get_project_or_404(project_id)
    categories = [cat.to_dict() for cat in project.categories]  
    return jsonify(categories)


@project_categories_bp.route('', methods=['POST'])
def add_categories(project_id):
    project = get_project_or_404(project_id)
    check_ownership(project)

    data = request.get_json()
    
    category_ids = data.get('category_ids') or [data.get('category_id')]
    category_ids = [cid for cid in category_ids if cid]  # filter out None

    for cid in category_ids:
        category = Category.query.get(cid)
        if category and category not in project.categories:
            project.categories.append(category)

    db.session.commit()
    return jsonify({"message": "Categories added"}), 201


@project_categories_bp.route('', methods=['PUT'])
def update_categories(project_id):
    project = get_project_or_404(project_id)
    check_ownership(project)

    data = request.get_json()
    new_category_ids = data.get('category_ids', [])
    new_categories = Category.query.filter(Category.id.in_(new_category_ids)).all()
    project.categories = new_categories

    db.session.commit()
    return jsonify({"message": "Categories updated"}), 200


@project_categories_bp.route('/<int:category_id>', methods=['DELETE'])
def remove_category(project_id, category_id):
    project = get_project_or_404(project_id)
    check_ownership(project)

    category = Category.query.get(category_id)
    if not category or category not in project.categories:
        abort(404, description="Category not found on this project")

    project.categories.remove(category)
    db.session.commit()
    return jsonify({"message": "Category removed"}), 200