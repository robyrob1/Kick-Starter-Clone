import { useState } from 'react';
import './RewardModal.css';

function RewardsModal({ projectId, rewardCreated, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors('');

    if (!title) {
      setFormErrors('Please enter a title');
      return;
    }
    if (!description) {
      setFormErrors('Please enter a description');
      return;
    }
    if (!pledgeAmount || isNaN(pledgeAmount) || Number(pledgeAmount) <= 0) {
      setFormErrors('Please enter a valid pledge amount');
      return;
    }

    setIsSubmitting(true);

    try {
      const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrf_token='))?.split('=')[1] || '';

      const response = await fetch('/api/rewards/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          project_id: projectId,
          title: title.trim(),
          description: description.trim(),
          pledge_amount: Number(pledgeAmount),
          estimated_delivery: estimatedDelivery && estimatedDelivery.trim() !== '' ? estimatedDelivery : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reward');
      }

      const newReward = await response.json();
      if (rewardCreated) {
        rewardCreated(newReward);
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setFormErrors(error.message || 'Error creating reward');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rewards-modal">
      <h2>Add a Reward</h2>
      {formErrors && <div className="form-error-message">{formErrors}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reward-title">Title</label>
          <input
            id="reward-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Reward title"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="reward-description">Description</label>
          <textarea
            id="reward-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Reward description"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pledge-amount">Pledge Amount</label>
          <input
            id="pledge-amount"
            type="number"
            value={pledgeAmount}
            onChange={(e) => setPledgeAmount(e.target.value)}
            placeholder="Minimum pledge amount"
            min="1"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estimated-delivery">Estimated Delivery (days)</label>
          <input
            id="estimated-delivery"
            type="number"
            value={estimatedDelivery}
            onChange={(e) => setEstimatedDelivery(e.target.value)}
            placeholder="Number of days"
            min="0"
          />
        </div>
        <div className="modal-buttons">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Reward...' : 'Add Reward'}
          </button>
          <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RewardsModal;
