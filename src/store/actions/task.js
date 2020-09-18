import {
  GET_TASK_SESSION_BY_ID,
  GET_TASK_BY_TITLE,
  POST_TASK_SESSIONS,
  UPDATE_TASK_SESSION,
  GET_TASKSTABLE_SESSIONS,
} from './types/task';

const getTaskSessionById = (id) => {
  return {
    type: GET_TASK_SESSION_BY_ID,
    payload: id,
  };
};

const getTaskByTitle = (title) => {
  return {
    type: GET_TASK_BY_TITLE,
    payload: title,
  };
};

const postTaskSession = (values) => {
  return {
    type: POST_TASK_SESSIONS,
    payload: values,
  };
};

const updateTaskSession = (values) => {
  return {
    type: UPDATE_TASK_SESSION,
    payload: values,
  };
};

const getTasksTable = () => {
  return {
    type: GET_TASKSTABLE_SESSIONS,
  };
};

export { getTaskSessionById, getTaskByTitle, postTaskSession, updateTaskSession, getTasksTable };
