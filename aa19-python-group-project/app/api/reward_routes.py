from flask import Blueprint, jsonify, request
from app.models.rewards import Reward
from app.models.db import db

reward_routes = Blueprint('rewards', __name__)

# Create a new reward
@reward_routes.route('/', methods=['POST'])
def create_reward():
    data = request.get_json()
    reward = Reward(
        project_id=data.get('project_id'),
        title=data.get('title'),
        description=data.get('description'),
        pledge_amount=data.get('pledge_amount'),
        estimated_delivery=data.get('estimated_delivery')
    )
    db.session.add(reward)
    db.session.commit()
    return jsonify(reward.to_dict()), 201

# Update an existing reward
@reward_routes.route('/<int:id>', methods=['PUT'])
def update_reward(id):
    reward = Reward.query.get_or_404(id)
    data = request.get_json()
    reward.title = data.get('title', reward.title)
    reward.description = data.get('description', reward.description)
    reward.pledge_amount = data.get('pledge_amount', reward.pledge_amount)
    reward.estimated_delivery = data.get('estimated_delivery', reward.estimated_delivery)
    db.session.commit()
    return jsonify(reward.to_dict())

# Delete a reward
@reward_routes.route('/<int:id>', methods=['DELETE'])
def delete_reward(id):
    reward = Reward.query.get_or_404(id)
    db.session.delete(reward)
    db.session.commit()
    return jsonify({'message': 'Reward deleted successfully'})

