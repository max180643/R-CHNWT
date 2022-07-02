/**
 * @param {string} key - A key to identify the data.
 * @returns {any|null} returns the value associated with the key if its exists and is not expired. Returns `null` otherwise
 */
const getCache = (key: string): any | null => {
  const data = localStorage.getItem(key)
  // if no value exists associated with the key, return null
  if (!data) {
    return null
  }
  const item = JSON.parse(data)
  // if TTL has expired, remove the item from localStorage and return null
  if (Date.now() > item.ttl) {
    localStorage.removeItem(key);
    return null;
  }
  // return data if not expired
  return item.value;
}

/**
 * @param {string} key - A key to identify the value.
 * @param {any} value - A value associated with the key.
 * @param {number} ttl - Time to live in seconds.
 */
const setCache = (key: string, value: any, ttl: number) => {
  const data = {
    value: value,
    ttl: Date.now() + (ttl * 1000)
  }
  // store data in LocalStorage 
  localStorage.setItem(key, JSON.stringify(data))
}

export { getCache, setCache }