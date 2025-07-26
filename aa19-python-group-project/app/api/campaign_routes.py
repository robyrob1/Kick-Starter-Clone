from flask import Blueprint, request
from app.models import db, Campaign
from flask_login import login_required, current_user
from datetime import date

campaign_routes = Blueprint('campaigns', __name__)

@campaign_routes.route('/')
def get_all_campaigns():
    campaigns = Campaign.query.all()
    return [campaign.to_dict() for campaign in campaigns]

@campaign_routes.route('/<int:id>')
def get_campaign(id):
    campaign = Campaign.query.get(id)
    return campaign.to_dict()

@campaign_routes.route('/', methods=['POST'])
@login_required
def create_campaign():
    data = request.get_json()
    campaign = Campaign(
        title=data['title'],
        description=data['description'],
        goal=data['goal'],
        end_date=date.fromisoformat(data['endDate']),
        genre=data.get('genre'),
        image_url=data.get('imageUrl'),
        creator_id=current_user.id
    )
    db.session.add(campaign)
    db.session.commit()
    return campaign.to_dict()

@campaign_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_campaign(id):
    data = request.get_json()
    campaign = Campaign.query.get(id)
    campaign.title = data['title']
    campaign.description = data['description']
    campaign.goal = data['goal']
    campaign.end_date = date.fromisoformat(data['endDate'])
    campaign.genre = data.get('genre')
    campaign.image_url = data.get('imageUrl')
    db.session.commit()
    return campaign.to_dict()

@campaign_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_campaign(id):
    campaign = Campaign.query.get(id)
    db.session.delete(campaign)
    db.session.commit()
    return {'message': 'Campaign deleted'}
