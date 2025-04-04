import {useState, useEffect} from 'react'
import './style/HomePage.css'
import Slider from './Slider'

function Home(){
  const [list, setList] = useState([])

  useEffect(() => {
    fetch("http://localhost:5001/api")
    .then(response => response.json())
    .then(list => setList(list))
  })

  return(
    <>
      <div className='list_main'>
            {
                list.map(item => (
                    <div className='list_item'>
                        <h1>{item[3].length}</h1>
                        <text>
                            <h3>{item[1]}</h3>
                            <p>{item[2]}</p>
                        </text>
                        <Slider data = {item[3]}/>
                    </div>
                ))
            }
        </div>
    </>
  )

}

export default Home;