import produce from 'immer';
import * as Toast from '../../../components/Toast/index';

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
        Toast.loading(false);
        Toast.successIcon('Criado');
      });
    case 'UPDATE_ESTABLISHMENT/SUCCESS':
      return produce(state, draft => {
        const index = state.indexOf(action.establishment);
        console.log('INDEX: ', index);
        console.log('DRAFT: ', draft);
        draft[index] = action.updateEstablishment;
        console.log('DRAFT 2 : ', draft);
      });
    default:
      return state;
  }
}

export default establishment;
