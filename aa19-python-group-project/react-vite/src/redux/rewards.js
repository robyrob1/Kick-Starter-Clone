const SET_REWARDS = 'rewards/setRewards';

const setRewards = (rewards) => ({ type: SET_REWARDS, payload: rewards });

// Thunks
export const fetchRewardsForProject = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/rewards/project/${projectId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setRewards(data));
  }
};

export const deleteReward = (rewardId) => async (dispatch, getState) => {
  const response = await fetch(`/api/rewards/${rewardId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    // After deletion, refresh rewards for the current project
    const state = getState();
    const projectId = state.projects.currentProject?.id;
    if (projectId) {
      dispatch(fetchRewardsForProject(projectId));
    }
  }
};

// Reducer
const initialState = {
  rewards: [],
};

function rewardsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REWARDS:
      return { ...state, rewards: action.payload };
    default:
      return state;
  }
}

export default rewardsReducer;
