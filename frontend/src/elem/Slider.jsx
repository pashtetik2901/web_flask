import { useState } from "react"
import './style/Slider.css'

function Slider({data}){
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        // setCurrentSlide(prev => (prev+1)<2 ? prev + 1 : 0)
        setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
        console.log()
    }
    const prevSlide = () => {
        // setCurrentSlide(prev => (prev-1)>=0 ? prev-1 : 2)
        setCurrentSlide((prevSlide) => (prevSlide - 1 + data.length) % data.length);
        console.log()
    }
    
    

    return(
        <>
            <div className="slider_main">
                {                    
                    JSON.parse(data) != null && JSON.parse(data).length != 0 ? (
                        JSON.parse(data).map((elem, index) => (
                            <div className={`slide ${currentSlide === index ? 'active' : ''}`}>
                                <img src={elem.link}/>
                            </div>
                        ))
                    ) : (
                        <div>No Photo</div>
                    )
                    
                }
                <button className="prev" onClick={prevSlide}>⭠</button>
                <button className="next" onClick={nextSlide}>⭢</button>
            </div>
        </>
    )
}

export default Slider;