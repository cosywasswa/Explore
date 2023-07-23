import React from 'react';
import { useSelector } from 'react-redux';
import {fetchRockets} from '../Redux/Rockets/rockesSlice'
import { fetchMissions } from '../Redux/Missions/missionsSlice';

const Myprofile = () => {
  const { rockets } = useSelector((store) => store.rocketsList);

  let Rockets = useSelector((state) => state.rockets);
  const savedRockets = JSON.parse(localStorage.getItem('rockets')) || [];
  if (savedRockets.length > 0) {
    Rockets = savedRockets;
  }
  const myRockets = Rockets.filter((rocket) => rocket.reserved === true);

  let missions = useSelector((state) => state.missions);
  const savedMissions = JSON.parse(localStorage.getItem('missions')) || [];
  if (savedMissions.length > 0) {
    missions = savedMissions;
  }
  const myMissions = missions.filter((mission) => mission.joined === true);

  return (
    <div className='profile'>
      <div>
      <h2>My Missions</h2>
     <div className='missions-list'>  
     {myMissions.map((mission) => (
          mission.joined && <p key={mission.id}>{mission.name}</p>
            
           
        ))}
      </div>
      </div>
      <div>
      <h2>My Rockets</h2>
      <div className='rockets-list'>
        {myRockets.map((rocket) => (
          rocket.reserved && <p key={rocket.id}>{rocket.name}</p>
            
           
        ))}
      </div>
      </div>
     
      
      </div>
  )
}

export default Myprofile;
