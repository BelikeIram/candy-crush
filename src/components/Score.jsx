import React from 'react'
import './style.css'

const Score = ({score}) => {
  return (
    <div className='score-board'>
      <div className='game-header'>Mini Candy Crush</div>
       <h1 className='header'>Scoring Board</h1>
       <div className='scoring'>
         <span className='scoringText'>Your Total Score : </span>
         <span className='score'>{score}</span>
       </div>
    </div>
  )
}

export default Score