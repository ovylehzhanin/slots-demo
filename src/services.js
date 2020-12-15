const { BASE_URL } = window;

export function getUserInfo(userId) {
  return fetch(`${BASE_URL}/init?uid=${userId}`)
    .then(response => response.json())
    .catch(e => console.error(e));
};

export function makeSpin(userId, bet) {
  return fetch(`${BASE_URL}/spin?uid=${userId}&bet=${bet}`)
    .then(response => response.json())
    .catch(e => console.error(e));
};
