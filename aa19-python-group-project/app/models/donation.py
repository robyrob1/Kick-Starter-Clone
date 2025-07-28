from .db import db

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='donations')
    campaign = db.relationship('Campaign', back_populates='donations')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'campaignId': self.campaign_id,
            'amount': self.amount
        }
