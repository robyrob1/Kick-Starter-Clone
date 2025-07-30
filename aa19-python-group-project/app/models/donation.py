from .db import db

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='donations')
    project = db.relationship('Project', back_populates='donations')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'projectId': self.project_id,
            'amount': self.amount
        }
