import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, joinMission, cancelMission } from '../Redux/Missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  let { missions, isLoading, isError } = useSelector((store) => store.missionsList);
  let storedMissions = JSON.parse(localStorage.getItem('missions')) || [];
if(storedMissions.length > 0){
  missions = storedMissions;
}
  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="error">
        <h1>Something went wrong...</h1>
      </div>
    );
  }
  return (
 <>
  <div className="table-div">
      <table className="table table-bordered text-start table-striped">
      <thead>
            <tr className='head'>
            <th scope="col" className="col-lg-1 col-md-1 ">Mission</th>
              <th scope="col" className="col-lg-8 col-md-7">Description</th>
              <th scope="col" className="col-lg-1 col-md-1">Status</th>
              <th scope="col" className="col-lg-2 col-md-3">&nbsp;</th>
            </tr>
          </thead>
        <tbody className='t-body'>
         
        { missions.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.name}</td>
                <td>{mission.description}</td>
                <td>
                  {mission.joined && 
                    <span className="badge text-bg-info text-light">Active Member</span>
                  }
                  { !mission.joined && <span className="badge text-bg-secondary ">Not A Member</span>}
                </td>
                <td className="text-center">
                  { mission.joined && 
                    <button type="button" className="btn btn-outline-danger" onClick={() => dispatch(cancelMission(mission.id))}>Leave Mission</button>
                   }
                  { !mission.joined && <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(joinMission(mission.id))}>Join Mission</button>}
                </td>
              </tr>
            ))}
  </tbody>
      </table>
    </div>
    </>
  )
}

export default Missions;