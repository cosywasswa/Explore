import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRockets} from '../Redux/Rockets/rockesSlice'
import RocketItem from './rocketItem';


const Rockets = () => {
    const dispatch = useDispatch();
    let { rockets, isLoading, isError } = useSelector((store) => store.rocketsList);
    let storedRockets = JSON.parse(localStorage.getItem('rockets')) || [];
if(storedRockets.length > 0){
  rockets = storedRockets;
}
  
    useEffect(() => {
      dispatch(fetchRockets());
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
   
    <div>
         <>
        {rockets.map((rocket) => (
            <RocketItem 
            key={rocket.id}
            id={rocket.id}
            name={rocket.name}
            details={rocket.details}
            image={rocket.image}
            reserved={rocket.reserved} 
            />
           
        ))}
        </>
    </div>
  )
}

export default Rockets;