import React from "react";
import { joinMission, cancelMission } from "../Redux/Missions/missionsSlice";
import { useDispatch } from "react-redux";


const MissionItem = ({name, description, id, joined}) => {
    const dispatch = useDispatch();
  return (
    <div className="table-div">
        <tr>
                <td><p>{name}</p></td>
                <td><p>{description}</p></td>
                <td> {joined && <span className='joined-badge'>Active Member</span>}</td>
                <td> {!joined && <span className='not joined-badge'>Not a Member</span>}</td>
                <td>{!joined && <button type='button' className='reserve' onClick={() => dispatch(joinMission(id))}>Join Mission</button>}</td>
                <td>{joined && <button type='button' className='reserve' onClick={() => dispatch(cancelMission(id))}>Leave Mission</button>}</td>
            </tr>
       
    </div>
  )
}

export default MissionItem