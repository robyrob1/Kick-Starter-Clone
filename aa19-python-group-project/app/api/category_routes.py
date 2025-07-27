from flask import Blueprint, jsonify, request, abort
from app.models import db, Category

category_routes = Blueprint('categories', __name__, url_prefix='/api/categories')

# GET /api/categories
@category_routes.route('/', methods=['GET'])
def get_all_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

# POST /api/categories
@category_routes.route('/', methods=['POST'])
def create_category():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return abort(400, description="Category name is required")

    existing = Category.query.filter_by(name=name).first()
    if existing:
        return abort(409, description="Category already exists")

    new_category = Category(name=name)
    db.session.add(new_category)
    db.session.commit()

    return jsonify(new_category.to_dict()), 201

# PUT /api/categories/<int:category_id>
@category_routes.route('/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return abort(404, description="Category not found")

    data = request.get_json()
    name = data.get('name')

    if not name:
        return abort(400, description="Category name is required")

    existing = Category.query.filter(Category.name == name, Category.id != category_id).first()
    if existing:
        return abort(409, description="Another category with this name exists")

    category.name = name
    db.session.commit()

    return jsonify(category.to_dict())

# DELETE /api/categories/<int:category_id>
@category_routes.route('/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return abort(404, description="Category not found")

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "Category deleted"}), 200

@category_routes.route('/<int:category_id>/projects')
def get_projects_for_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return {'error': 'Category not found'}, 404

   
    projects = [project.to_dict() for project in category.projects]
    return jsonify(projects)
