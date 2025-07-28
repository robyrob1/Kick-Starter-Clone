import { useState, useEffect } from 'react';
import './RewardModal.css';

function RewardsModal({ projectId, rewardCreated, onClose, existingReward }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState('');

  useEffect(() => {
    if (existingReward) {
      setTitle(existingReward.title || '');
      setDescription(existingReward.description || '');
      setPledgeAmount(existingReward.pledge_amount ? existingReward.pledge_amount.toString() : '');
      if (existingReward.estimated_delivery) {
        const now = new Date();
        const estDate = new Date(existingReward.estimated_delivery);
        const diffTime = estDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setEstimatedDelivery(diffDays > 0 ? diffDays.toString() : '0');
      } else {
        setEstimatedDelivery('');
      }
    } else {
      setTitle('');
      setDescription('');
      setPledgeAmount('');
      setEstimatedDelivery('');
    }
  }, [existingReward]);

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

      const method = existingReward ? 'PUT' : 'POST';
      const url = existingReward ? `/api/rewards/${existingReward.id}` : '/api/rewards/';

      const response = await fetch(url, {
        method: method,
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
        estimated_delivery: estimatedDelivery && estimatedDelivery.trim() !== '' ? new Date(Date.now() + Number(estimatedDelivery) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      }),
      });

      if (!response.ok) {
        throw new Error(existingReward ? 'Failed to update reward' : 'Failed to create reward');
      }

      const reward = await response.json();
      if (rewardCreated) {
        rewardCreated(reward);
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setFormErrors(error.message || (existingReward ? 'Error updating reward' : 'Error creating reward'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rewards-modal">
      <h2>{existingReward ? 'Edit Reward' : 'Add a Reward'}</h2>
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
            {isSubmitting ? (existingReward ? 'Updating Reward...' : 'Adding Reward...') : (existingReward ? 'Update Reward' : 'Add Reward')}
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
