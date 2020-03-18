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
