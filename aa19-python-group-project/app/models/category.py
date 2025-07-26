from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    # Relationship to the join table
    project_categories = db.relationship(
        "ProjectCategory",
        back_populates="category",
        cascade="all, delete-orphan"
    )

    # Relationship directly to the Project model
    projects = db.relationship(
        "Project",
        secondary="project_categories",
        back_populates="categories"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }