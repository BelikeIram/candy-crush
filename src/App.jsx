import { useState, useEffect } from 'react'
import './App.css'
import blueCandy from './assets/blue-candy.png'
import greenCandy from './assets/green-candy.png'
import orangeCandy from './assets/orange-candy.png'
import purpleCandy from './assets/purple-candy.png'
import redCandy from './assets/red-candy.png'
import yellowCandy from './assets/yellow-candy.png'
import blank from './assets/blank.png'
import Score from './components/Score'

const width = 8;
const colorCandy = [
  blueCandy ,
  greenCandy ,
  orangeCandy,
  yellowCandy ,
  purpleCandy,
  redCandy ,
  
]

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDroped, setSquareBeingDroped] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)


  const checkForColumnOfThree = ()=>{
      for(let i = 0; i <= 47; i++){
        const columnOfThree = [i, i + width, i + width * 2]
        const decideColor = currentColorArrangement[i];

        const isBlank = currentColorArrangement[i] === blank

        if(columnOfThree.every((square)=> {return currentColorArrangement[square] === decideColor && !isBlank}) ){
           setScoreDisplay((prev)=>prev + 3)
           columnOfThree.forEach((square=> currentColorArrangement[square] = blank))
           return true;
        }
      }
     
  }

  const checkForRowOfThree = ()=>{
    for(let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decideColor = currentColorArrangement[i];

      const isBlank = currentColorArrangement[i] === blank

      const notValid = [6,7, 14, 15, 22,23, 30, 31, 38,39, 46, 47, 54,55, 62, 63]

      if(notValid.includes(i)) continue;
      
      if(rowOfThree.every((square)=> {return currentColorArrangement[square] === decideColor && !isBlank} )){
        setScoreDisplay((prev)=>prev + 3)
        rowOfThree.forEach((sqaure=> currentColorArrangement[sqaure] = blank))
        return true;
      }
    }
}


  const checkForColumnOfFour = ()=>{
     for(let i = 0; i <= 39; i++){
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
        const decideColor = currentColorArrangement[i];

        const isBlank = currentColorArrangement[i] === blank

        if(columnOfFour.every((square)=>{ return currentColorArrangement[square] === decideColor && !isBlank})){
          setScoreDisplay((prev)=>prev + 4)
          columnOfFour.forEach((sqaure=> currentColorArrangement[sqaure] = blank))
          return true;
        }
     }
  }


  const checkForRowOfFour = ()=>{
    for(let i = 0; i < 64; i++) {
      const rowOfFive = [i, i + 1, i + 2, i + 3];
      const decideColor = currentColorArrangement[i];

      const isBlank = currentColorArrangement[i] === blank

      const notValid = [5,6,7, 13,14,15, 21,22,23,  29,30,31, 37,38,39, 45,46,47,  53,54,55, 61,62,63]

      if(notValid.includes(i)) continue;
      
      if(rowOfFive.every((square)=> { return currentColorArrangement[square] === decideColor && !isBlank} )){
        setScoreDisplay((prev)=>prev + 4)
        rowOfFive.forEach((sqaure=> currentColorArrangement[sqaure] = blank))
        return true
      }
    }
}

const moveSquareDown = () =>{
     for (let i = 0; i <= 64 - width; i++) {

        if ( currentColorArrangement[i + width] === blank) {
            currentColorArrangement[ i + width ] = currentColorArrangement[i]
            currentColorArrangement[i] = blank
        }

        const isFirstRow = [0,1,2,3,4,5,6,7]

        const isInclude = isFirstRow.includes(i)

        if(isInclude && currentColorArrangement[i] === blank){
           const randomNumber =  Math.floor(Math.random() * colorCandy.length)
           currentColorArrangement[i] = colorCandy[randomNumber]
        }
     }
}

  const dragStart = (e) =>{
    console.log('drag start');
    setSquareBeingDroped(e.target)
  }
  const dragDrop = (e) =>{
    console.log(e.target);
    console.log('drag drop');
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) =>{
    console.log(e.target);
    console.log('drag End');

    const draqSquareNum = parseInt(squareBeingDroped.getAttribute('data-id'))
    const ReplaceSquareNum =  parseInt(squareBeingReplaced.getAttribute('data-id'))

    const validMoves = [
      draqSquareNum - 1,
      draqSquareNum - width,
      draqSquareNum + 1,
      draqSquareNum + width
    ]

    const validMove = validMoves.includes(ReplaceSquareNum)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    // if (ReplaceSquareNum &&
    //     validMove &&
    //     (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
    //     setSquareBeingDroped(null)
    //     setSquareBeingReplaced(null)
    //     console.log('1st line');
    // } else {
    //   currentColorArrangement[draqSquareNum] = squareBeingReplaced.getAttribute('src')
    //   currentColorArrangement[ReplaceSquareNum ] = squareBeingDroped.getAttribute('src')
    //     setCurrentColorArrangement([...currentColorArrangement])
    //     console.log('secomd line');
    // }


    if (validMove) {
        currentColorArrangement[draqSquareNum] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[ReplaceSquareNum ] = squareBeingDroped.getAttribute('src')
    }

  }

  const createBoard = ()=>{
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
       const randomColor = colorCandy[Math.floor(Math.random() * colorCandy.length)]
       randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement) 
  }

  useEffect(()=>{
     createBoard()
  },[])


  useEffect(()=>{
    const timer = setInterval(()=>{
       checkForColumnOfFour()
       checkForRowOfFour
       checkForColumnOfThree()
       checkForRowOfThree ()
       moveSquareDown()
       setCurrentColorArrangement([...currentColorArrangement])
     },100)
 
     return () => clearInterval(timer)
      
   },[  checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree,moveSquareDown, currentColorArrangement])


  return (
    <>
     <div className='app'>  
        <div className='board'>
           {currentColorArrangement.map((candyColor, index)=>{
              return <img 
              src={candyColor}
              alt={candyColor}
               style={{backgroundColor:candyColor}} 
               key={index} 
               draggable={true} 
               data-id={index}
               onDragStart={dragStart}
               onDragEnd={dragEnd}
               onDrop={dragDrop}
               onDragEnter={(e)=>e.preventDefault()}
               onDragLeave={(e)=> e.preventDefault()}
               onDragOver={(e)=>e.preventDefault()}
               />
           })}
        </div>
        <div className='score'>
          <Score score={scoreDisplay}/>
        </div>
     </div>
    </>
  )
}

export default App
