from .db import db, environment, SCHEMA

class Campaign(db.Model):
    __tablename__ = 'campaigns'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    genre = db.Column(db.String(50))
    image_url = db.Column(db.String)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', backref='campaigns')
    comments = db.relationship('Comment', back_populates='campaign', cascade='all, delete-orphan')
    donations = db.relationship('Donation', back_populates='campaign', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'goal': self.goal,
            'endDate': self.end_date.isoformat(),
            'genre': self.genre,
            'imageUrl': self.image_url,
            'creatorId': self.creator_id
        }
