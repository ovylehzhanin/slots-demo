const { APP_GLOBALS } = window;

export function getUserInfo(userId) {
  return fetch(`${APP_GLOBALS.BASE_URL}/init?uid=${userId}`)
    .then(response => response.json())
    .catch(e => console.error(e));
};

export function makeSpin(userId, bet) {
  return fetch(`${APP_GLOBALS.BASE_URL}/spin?uid=${userId}&bet=${bet}`)
    .then(response => response.json())
    .catch(e => console.error(e));
};
