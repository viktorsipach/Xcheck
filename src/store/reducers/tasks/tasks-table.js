import {
  GET_TASKSTABLE_SESSIONS_SUCCESS,
  GET_TASKSTABLE_SESSIONS_FAILURE,
} from '../../actions/types/task';

const tasksTableData = (state = [], action) => {
  switch (action && action.type) {
    case GET_TASKSTABLE_SESSIONS_SUCCESS:
      return action.payload;

    case GET_TASKSTABLE_SESSIONS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default tasksTableData;
