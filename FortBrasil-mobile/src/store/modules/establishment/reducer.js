import produce from 'immer';

function establishment(state = [], action) {
  switch (action.type) {
    case 'SET_ESTABLISHMENT':
      return action.establishments;

    case 'DELETE_ESTABLISHMENT/SUCCESS':
      return produce(state, draft => {
        var index = state.indexOf(action.establishment);
        draft.splice(index, 1);
      });

    case 'ADD_ESTABLISHMENT/SUCCESS':
      return produce(state, draft => {
        draft.push(action.establishment);
      });
    default:
      return state;
  }
}

export default establishment;
