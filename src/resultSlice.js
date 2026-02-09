import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  const data = localStorage.getItem("studentResults");
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (state) => {
  localStorage.setItem("studentResults", JSON.stringify(state));
};

const resultSlice = createSlice({
  name: "results",
  initialState: loadFromStorage(),
  reducers: {
    addResult: (state, action) => {
      state.push(action.payload);
      saveToStorage(state);
    },

    deleteResult: (state, action) => {
      const updated = state.filter(
        (student) => student.id !== action.payload
      );
      saveToStorage(updated);
      return updated;
    },

    updateResult: (state, action) => {
      const index = state.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
        saveToStorage(state);
      }
    }
  }
});

export const { addResult, deleteResult, updateResult } = resultSlice.actions;
export default resultSlice.reducer;
