from flask import Blueprint, jsonify, request
from app.models.rewards import Reward
from app.models.db import db

reward_routes = Blueprint('rewards', __name__)

# Create a new reward
from datetime import datetime

@reward_routes.route('/', methods=['POST'])
def create_reward():
    data = request.get_json()
    estimated_delivery = data.get('estimated_delivery')
    if estimated_delivery:
        estimated_delivery = datetime.strptime(estimated_delivery, '%Y-%m-%d').date()
    reward = Reward(
        project_id=data.get('project_id'),
        title=data.get('title'),
        description=data.get('description'),
        pledge_amount=data.get('pledge_amount'),
        estimated_delivery=estimated_delivery
    )
    db.session.add(reward)
    db.session.commit()
    return jsonify(reward.to_dict()), 201

# Get rewards for a project
@reward_routes.route('/project/<int:project_id>', methods=['GET'])
def get_rewards_for_project(project_id):
    rewards = Reward.query.filter_by(project_id=project_id).all()
    return jsonify([reward.to_dict() for reward in rewards])

# Update an existing reward
@reward_routes.route('/<int:id>', methods=['PUT'])
def update_reward(id):
    reward = Reward.query.get_or_404(id)
    data = request.get_json()
    estimated_delivery = data.get('estimated_delivery')
    if estimated_delivery:
        estimated_delivery = datetime.strptime(estimated_delivery, '%Y-%m-%d').date()
    reward.title = data.get('title', reward.title)
    reward.description = data.get('description', reward.description)
    reward.pledge_amount = data.get('pledge_amount', reward.pledge_amount)
    reward.estimated_delivery = estimated_delivery if estimated_delivery else reward.estimated_delivery
    db.session.commit()
    return jsonify(reward.to_dict())

# Delete a reward
@reward_routes.route('/<int:id>', methods=['DELETE'])
def delete_reward(id):
    reward = Reward.query.get_or_404(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({'message': 'Reward deleted successfully'})

