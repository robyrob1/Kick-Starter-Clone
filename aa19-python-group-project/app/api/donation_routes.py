from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Donation

donation_routes = Blueprint('donations', __name__)

# ----------------- GET Donations -----------------

@donation_routes.route('/project/<int:project_id>')
def get_donations_for_project(project_id):
    """Get all donations for a project"""
    donations = Donation.query.filter_by(project_id=project_id).all()
    return jsonify([donation.to_dict() for donation in donations])

@donation_routes.route('/user')
@login_required
def get_donations_for_user():
    """Get all donations by the current user"""
    donations = Donation.query.filter_by(user_id=current_user.id).all()
    return jsonify([donation.to_dict() for donation in donations])

# ----------------- CREATE Donation -----------------

@donation_routes.route('', methods=['POST'])
@login_required
def create_donation():
    """Create a new donation"""
    data = request.get_json()
    donation = Donation(
        user_id=current_user.id,
        project_id=data['project_id'],
        amount=data['amount']
    )
    db.session.add(donation)
    db.session.commit()
    return donation.to_dict()

# ----------------- UPDATE Donation -----------------

@donation_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_donation(id):
    """Update a donation amount"""
    donation = Donation.query.get_or_404(id)
    if donation.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    donation.amount = data['amount']
    db.session.commit()
    return donation.to_dict()

# ----------------- DELETE Donation -----------------

@donation_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_donation(id):
    """Delete a donation"""
    donation = Donation.query.get_or_404(id)
    if donation.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(donation)
    db.session.commit()
    return jsonify({"message": "Donation deleted successfully"})
