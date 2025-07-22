from flask import Blueprint, jsonify
from app.models import Category, db

category_routes = Blueprint('categories', __name__)

# GET /api/categories
@category_routes.route('/', methods=['GET'])
def get_all_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])