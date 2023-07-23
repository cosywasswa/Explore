import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://api.spacexdata.com/v4/rockets';
const initialState = {
    rockets: [],
    isLoading: false,
    isError: false,
    reserved: false
  };

  export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async (thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  });

  const rocketSlice = new createSlice ({
    name: 'rocketList ',
    initialState,
    reducers: {
        reserveRocket: (state, action) => {
            const data = JSON.parse(localStorage.getItem('rockets')) || state.rockets;
            const updatedState = data.map((rocket) => {
              if (rocket.id !== action.payload) return rocket;
              return { ...rocket, reserved: true };
            });
            state.rockets = updatedState;
            localStorage.setItem('rockets', JSON.stringify(updatedState));
          },
          cancelReservation: (state, action) => {
            const data = JSON.parse(localStorage.getItem('rockets')) || state.rockets;
            const updatedState = data.map((rocket) => {
              if (rocket.id !== action.payload) return rocket;
              return { ...rocket, reserved: false };
            });
            state.rockets = updatedState;
            localStorage.setItem('rockets', JSON.stringify(updatedState));
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRockets.pending, (state, action) => {
            state.isLoading = true;
          });
          builder.addCase(fetchRockets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.rockets = action.payload.map((rocket) => ({
                id: rocket.id,
                name: rocket.name,
                details: rocket.description,
                image: rocket.flickr_images[0]
               
              }));
              
          });
    }
  })
export const {reserveRocket, cancelReservation} = rocketSlice.actions;
  export default rocketSlice.reducer;