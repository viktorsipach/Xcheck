import { combineReducers } from 'redux';

import { reducer as reduxFormReducer } from 'redux-form';

import users from './users';
import tasks from './tasks/tasks';
import tasksTableData from './tasks/tasks-table';
import reviews from './reviews';
import login from './login';
import crossCheckSessionsData from './cross-check-sessions/cross-check-sessions-data';
import crossCheckSessions from './cross-check-sessions/cross-check-sessions';
import crossCheckSession from './cross-check-sessions/cross-check-session';
import reviewRequestsData from './review-requests/review-requests-data';
import reviewRequest from './review-requests/review-request';
import values from './values';
import reviewRequests from './review-requests/review-requests';

const rootReducer = combineReducers({
  users,
  tasks,
  crossCheckSessionsData,
  crossCheckSessions,
  reviews,
  tasksTableData,
  form: reduxFormReducer.plugin({
    crossCheckSession,
    reviewRequest,
  }),
  login,
  reviewRequestsData,
  reviewRequests,
  values,
  taskCreation: reduxFormReducer.plugin({
    tasks,
  }),
});

export default rootReducer;
