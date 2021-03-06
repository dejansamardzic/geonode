import { createAction } from 'redux-actions';
import { fetch, sequenceInterval } from '../../../../utils';
import apiUrl from '../../../../backend';
import { WS_RESPONSE_SEQUENCE } from '../constants';


const reset = createAction(
  WS_RESPONSE_SEQUENCE,
  () => ({ status: 'initial' })
);


export const begin = createAction(
  WS_RESPONSE_SEQUENCE,
  () => ({ status: 'pending' })
);


const success = createAction(
  WS_RESPONSE_SEQUENCE,
  response => ({
    response,
    status: 'success',
  })
);


const fail = createAction(
  WS_RESPONSE_SEQUENCE,
  error => ({
    status: 'error',
    error,
  })
);


const get = (service, argInterval) =>
  (dispatch) => {
    dispatch(begin());
    const interval = sequenceInterval(argInterval);
    let url = `${apiUrl}/metric_data/response.time/?ows_service=${service}`;
    url += `&last=${argInterval}&interval=${interval}`;
    fetch({ url })
      .then(response => {
        dispatch(success(response));
        return response;
      })
      .catch(error => {
        dispatch(fail(error.message));
      });
  };

const actions = {
  reset,
  begin,
  success,
  fail,
  get,
};

export default actions;
