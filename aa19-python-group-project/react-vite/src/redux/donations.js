import { csrfFetch } from "./csrf";

/* ----------------- ACTION TYPES ----------------- */
const LOAD_PROJECT_DONATIONS = "donations/LOAD_PROJECT_DONATIONS";
const LOAD_USER_DONATIONS = "donations/LOAD_USER_DONATIONS";
const ADD_DONATION = "donations/ADD_DONATION";
const UPDATE_DONATION = "donations/UPDATE_DONATION";
const REMOVE_DONATION = "donations/REMOVE_DONATION";
const CLEAR_PROJECT_DONATIONS = "donations/CLEAR_PROJECT_DONATIONS";

/* ----------------- ACTION CREATORS ----------------- */
const loadProjectDonations = (donations) => ({
  type: LOAD_PROJECT_DONATIONS,
  donations,
});

const loadUserDonations = (donations) => ({
  type: LOAD_USER_DONATIONS,
  donations,
});

const addDonation = (donation) => ({
  type: ADD_DONATION,
  donation,
});

const updateDonationAction = (donation) => ({
  type: UPDATE_DONATION,
  donation,
});

const removeDonation = (donationId) => ({
  type: REMOVE_DONATION,
  donationId,
});

export const clearProjectDonations = () => ({
  type: CLEAR_PROJECT_DONATIONS,
});

/* ----------------- THUNKS ----------------- */

// Get donations for a project
export const fetchDonationsForProject = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/donations/project/${projectId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadProjectDonations(data));
  }
};

// Get donations for current user
export const fetchUserDonations = () => async (dispatch) => {
  const res = await fetch(`/api/donations/user`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserDonations(data));
  }
};

// Create donation
export const createDonation = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/donations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addDonation(data));
    return data;
  }
};

// Update donation
export const updateDonation = (donationId, amount) => async (dispatch) => {
  const res = await csrfFetch(`/api/donations/${donationId}`, {
    method: "PUT",
    body: JSON.stringify({ amount }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateDonationAction(data));
    return data;
  }
};

// Delete donation
export const deleteDonation = (donationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/donations/${donationId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeDonation(donationId));
  }
};

/* ----------------- REDUCER ----------------- */
const initialState = {
  projectDonations: [],
  userDonations: [],
};

export default function donationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT_DONATIONS:
      return { ...state, projectDonations: action.donations };
    case LOAD_USER_DONATIONS:
      return { ...state, userDonations: action.donations };
    case ADD_DONATION:
      return {
        ...state,
        projectDonations: [...state.projectDonations, action.donation],
      };
    case UPDATE_DONATION:
      return {
        ...state,
        projectDonations: state.projectDonations.map((d) =>
          d.id === action.donation.id ? action.donation : d
        ),
        userDonations: state.userDonations.map((d) =>
          d.id === action.donation.id ? action.donation : d
        ),
      };
    case REMOVE_DONATION:
      return {
        ...state,
        projectDonations: state.projectDonations.filter(
          (d) => d.id !== action.donationId
        ),
        userDonations: state.userDonations.filter(
          (d) => d.id !== action.donationId
        ),
      };
    case CLEAR_PROJECT_DONATIONS:
      return { ...state, projectDonations: [] };
    default:
      return state;
  }
}
