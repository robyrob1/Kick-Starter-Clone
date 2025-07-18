@category_routes.route('/')
def get_categories():
    categories = Category.query.all()
    return [category.to_dict() for category in categories]