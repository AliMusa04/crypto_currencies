import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const favSlice = createSlice({
  name: "fav",
  initialState: {
    value: [],
  },
  reducers: {
    addToFav: (state, action) => {
      if (state.value.find((item) => item.id === action.payload.id)) {
        return alert("This coin is already available");
      } else state.value.push(action.payload);
      toast.success("Added to Favourites");
    },
    DeleteFav: (state, action) => {
      let target = state.value.findIndex(
        (value) => value.id === action.payload
      );
      state.value.splice(target, 1);
      toast.success("Deleted successfully!");
    },
    DeleteAll: (state) => {
      state.value = [];
    },
  },
});

export const { addToFav, DeleteFav, DeleteAll } = favSlice.actions;
