import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reserveRocket, cancelReservation } from '../Redux/Rockets/rockesSlice';






const RocketItem = ({id, image, name, details, reserved }) => {
    const dispatch = useDispatch();
  return (
    <div className='rocket-item'>
<img className='rocket-img' src={image} alt='rocket image' />
<div className='rocket-right'>
    <h1>{name}</h1>
    {reserved && <span className='reserved-badge'>Reserved</span>}
    <p>{details}</p>
    {reserved && <button type='button' className='reserve' onClick={() => dispatch(cancelReservation(id))}>Cancel Reservation</button>}
    {!reserved && <button type='button' className='reserve' onClick={() => dispatch(reserveRocket(id))}>Reserve Rocket</button>}
</div>
    </div>
  )
}

export default RocketItem