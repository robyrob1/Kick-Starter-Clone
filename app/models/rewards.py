from .db import db, environment, SCHEMA
from datetime import datetime

class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    pledge_amount = db.Column(db.Numeric(10, 2), nullable=False)
    estimated_delivery = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'title': self.title,
            'description': self.description,
            'pledge_amount': float(self.pledge_amount),
            'estimated_delivery': self.estimated_delivery.isoformat() if self.estimated_delivery else None,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

