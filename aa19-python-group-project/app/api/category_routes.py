from flask import Blueprint, jsonify
from app.models import Category

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
def get_categories():
    """
    Get all categories
    """
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])