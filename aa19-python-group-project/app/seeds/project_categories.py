from app.models import db, ProjectCategory, Project, Category
from sqlalchemy.sql import text

def seed_project_categories():
    # Projects and categories must be seeded already
    
    # Example: Connect Project 1 and 2 to Category 1 and 2
    pc1 = ProjectCategory(project_id=1, category_id=1)
    pc2 = ProjectCategory(project_id=1, category_id=2)
    pc3 = ProjectCategory(project_id=2, category_id=1)
    pc4 = ProjectCategory(project_id=3, category_id=3)

    db.session.add_all([pc1, pc2, pc3, pc4])
    db.session.commit()


def undo_project_categories():
    db.session.execute(text("DELETE FROM project_categories"))
    db.session.commit()