from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    goal = db.Column(db.Integer, nullable=False)
    current_amount = db.Column(db.Integer, default=0)
    deadline = db.Column(db.DateTime, nullable=False)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # --- Relationships ---

    # Connects the project to the user that created it
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='projects')

    # This connects the Project model directly to the ProjectCategory join table model.
    project_categories = db.relationship(
        "ProjectCategory",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    # This is the many-to-many relationship to the Category model, which uses the join table.
    categories = db.relationship(
        "Category",
        secondary="project_categories",
        back_populates="projects"
    )

    # --- to_dict Method ---
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'goal': self.goal,
            'current_amount': self.current_amount,
            'deadline': self.deadline.isoformat() if self.deadline else None,
            'category': self.category,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'creator': self.user.username if self.user else None,
            'categories': [category.name for category in self.categories] # Simplified to avoid recursion
        }
