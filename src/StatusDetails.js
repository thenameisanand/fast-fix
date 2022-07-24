import React from 'react'
import { useParams } from 'react-router-dom';

function StatusDetails() {
    const { requestId } = useParams();
  return (
    <div>
        {requestId}
        StatusDetails</div>
  )
}

export default StatusDetails