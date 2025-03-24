import React from 'react'
import Cards from '../components/home/Cards'

const CompletedTasks = () => {
  return (
    <div>
      <Cards filter="completed" />
    </div>
  )
}

export default CompletedTasks
