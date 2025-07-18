from .db import db, environment, SCHEMA, add_prefix_for_prod

# class ProjectCategory(db.Model):
#     __tablename__ = 'project_categories'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
#     category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")), nullable=False)

    # Relationships
    # This line depends on the existence of a Project model:
    # project = db.relationship("Project", back_populates="project_categories")

    # category = db.relationship("Category", back_populates="project_categories")