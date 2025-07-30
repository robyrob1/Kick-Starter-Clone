import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDonation, updateDonation } from "../../redux/donations";

function DonationModal({ projectId, donationToEdit, onClose }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(donationToEdit ? donationToEdit.amount : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (donationToEdit) {
      // EDIT
      await dispatch(updateDonation(donationToEdit.id, amount));
    } else {
      // CREATE
      await dispatch(createDonation({ project_id: projectId, amount }));
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{donationToEdit ? "Edit Donation" : "Make a Donation"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit">{donationToEdit ? "Update" : "Donate"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonationModal;
