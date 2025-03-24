import React from 'react'
import Cards from '../components/home/Cards'

const IncompletedTasks = () => {
  return (
    <div>
      <Cards filter="incomplete" />
    </div>
  )
}

export default IncompletedTasks
