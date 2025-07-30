import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDonation } from "../../redux/donations";
import "./DonationModal.css"; // reuse styling from donation modal

function DonationEditModal({ donation, onClose }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(donation.amount);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    await dispatch(updateDonation(donation.id, amount));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Donation</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Donation Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonationEditModal;
