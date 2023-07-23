import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
    missions: [],
    isLoading: false,
    isError: false,
    joined: false
  };

  export const fetchMissions = createAsyncThunk('missions/fetchMissions', async (thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  });

  const missionSlice = new createSlice ({
    name: 'missionList ',
    initialState,
    reducers: {
        joinMission: (state, action) => {
            const data = JSON.parse(localStorage.getItem('missions')) || state.missions;
            const updatedState = data.map((mission) => {
              if (mission.id !== action.payload) return mission;
              return { ...mission, joined: true };
            });
            state.missions = updatedState;
            localStorage.setItem('missions', JSON.stringify(updatedState));
          },
          cancelMission: (state, action) => {
            const data = JSON.parse(localStorage.getItem('missions')) || state.missions;
            const updatedState = data.map((mission) => {
              if (mission.id !== action.payload) return mission;
              return { ...mission, joined: false };
            });
            state.missions = updatedState;
            localStorage.setItem('missions', JSON.stringify(updatedState));
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMissions.pending, (state, action) => {
            state.isLoading = true;
          });
          builder.addCase(fetchMissions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.missions = action.payload.map((mission) => ({
                id: mission.mission_id,
                name: mission.mission_name,
                description: mission.description,
               
              }));
              
          });
    }
  })
export const {joinMission, cancelMission} = missionSlice.actions;
  export default missionSlice.reducer;