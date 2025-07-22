from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Donation

donation_routes = Blueprint("donations", __name__)

@donation_routes.route('/<int:campaign_id>', methods=["GET"])
def get_donations(campaign_id):
    donations = Donation.query.filter_by(campaign_id=campaign_id).all()
    return [donation.to_dict() for donation in donations]

@donation_routes.route('/<int:campaign_id>', methods=["POST"])
@login_required
def make_donation(campaign_id):
    data = request.get_json()
    donation = Donation(
        user_id=current_user.id,
        campaign_id=campaign_id,
        amount=data["amount"]
    )
    db.session.add(donation)
    db.session.commit()
    return donation.to_dict()

