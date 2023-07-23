import { configureStore } from '@reduxjs/toolkit';
import rocketreducer from './Rockets/rockesSlice';
import missionreducer from './Missions/missionsSlice';

const store = configureStore({
  reducer: {
    missionsList: missionreducer,
    rocketsList: rocketreducer,

  },
});

export default store;