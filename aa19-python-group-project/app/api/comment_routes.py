from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment

comment_routes = Blueprint("comments", __name__)

@comment_routes.route('/<int:campaign_id>', methods=["GET"])
def get_comments(campaign_id):
    comments = Comment.query.filter_by(campaign_id=campaign_id).all()
    return [comment.to_dict() for comment in comments]

@comment_routes.route('/<int:campaign_id>', methods=["POST"])
@login_required
def post_comment(campaign_id):
    data = request.get_json()
    comment = Comment(
        user_id=current_user.id,
        campaign_id=campaign_id,
        content=data["content"]
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
