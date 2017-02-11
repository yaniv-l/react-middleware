export default function ({ dispatch }) {
  return next => action => {
    //console.log(action); // For debug
    // If the action does not have a payload,
    // or does not have the .then promise property
    // we do not care about him and sent it on
    if (!action.payload || !action.payload.then) {
      //console.log('Inside if - action is a promise');  // For Debug
      return next(action);
    }
    //console.log('out of if - we have a promise ');  // For Dubug
    // Make sure the action's promise get resolved
    action.payload
      // Create action with the old type, but replace the promise with the
      // response data:
      // take all what the action currently have: ""...action"
      // and extend it with the response as payload: "payload: response"
      .then(response => {
        const newAction = { ...action, payload: response };
        // Send the newAction through all of the middleware again
        // We'll dispatch an action whenever we're doing any modification to an
        // action or payload inside the middleware
        dispatch(newAction);
      });
  };
}

/*
// The above function signature is equivalent to the below es5 style signature
export default function({ dispatch }) {
  return function(next) {
    return function(action) {
      console.log(action);

      next(action);
    };
  };
}
*/
