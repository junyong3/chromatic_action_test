export enum LocalStorageKey {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export function getItem(key: string) {
  return localStorage.getItem(key)
}

export function setItem(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}
