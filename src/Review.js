import React from 'react'
import './Review.css';
function Review({ description }) {
  return (
    <div className='review'>
        <div className='review__container'>
          <p>rating</p>
        <h4>name </h4>

          <div className='review__containerDetails'>
<p>{description}</p>

          </div>
        </div>
        </div>
  )
}

export default Review