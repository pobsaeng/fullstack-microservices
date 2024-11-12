// Function to load state from localStorage with a dynamic key
export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;  // If no saved state, return undefined to initialize store with default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage with a dynamic key
export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
