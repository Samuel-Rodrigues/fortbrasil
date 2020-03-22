export function setEstablishment(establishments) {
  return {
    type: 'SET_ESTABLISHMENT',
    establishments,
  };
}

export function addStablishmentRequest(establishment) {
  return {
    type: 'ADD_ESTABLISHMENT/REQUEST',
    establishment,
  };
}

export function addStablishmentSuccess(establishment) {
  return {
    type: 'ADD_ESTABLISHMENT/SUCCESS',
    establishment,
  };
}

export function deleteStablishmentRequest(establishment) {
  return {
    type: 'DELETE_ESTABLISHMENT/REQUEST',
    establishment,
  };
}

export function deleteStablishmentSuccess(establishment) {
  return {
    type: 'DELETE_ESTABLISHMENT/SUCCESS',
    establishment,
  };
}

export function updateStablishmentRequest(establishment, updateEstablishment) {
  return {
    type: 'UPDATE_ESTABLISHMENT/REQUEST',
    establishment,
    updateEstablishment,
  };
}

export function updateStablishmentSuccess(establishment, updateEstablishment) {
  return {
    type: 'UPDATE_ESTABLISHMENT/SUCCESS',
    establishment,
    updateEstablishment,
  };
}
