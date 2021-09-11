import React, { useEffect, useState } from 'react'
import { MDBTooltip } from 'mdbreact'
import './degrees.css'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { updateDegrees } from '../../../redux/degrees/degrees-actions'

const Degrees = (props) => {
    const [fahrenheitImg, setFahrenheitImg] = useState('')
    const [celsiusImg, setCelsiusImg] = useState('')
    const dispatch = useDispatch()
    let degreeState = useSelector((state) => state.degreesReducer.degree)

    useEffect(() => {
        if (degreeState === 'Celsius')
            setDegreesToCelsius()
        else
            setDegreesToFahrenheit()
    }, [degreeState])

    const setDegreesToFahrenheit = () => {
        setFahrenheitImg('fahrenheitFull')
        setCelsiusImg('celsiusEmpty')
        dispatch(updateDegrees('Fahrenheit'))
    }
    const setDegreesToCelsius = () => {
        setFahrenheitImg('fahrenheitEmpty')
        setCelsiusImg('celsiusFull')
        dispatch(updateDegrees('Celsius'))
    }

    return (
        <div className='text-center degrees'>
            <MDBTooltip
                domElement
                tag="span"
                placement="bottom"
            >
                <img className='imgOfDegree cursorPointer DegreesDiv'
                    alt='fahrenheit'
                    src={`../img/${fahrenheitImg}.png`}
                    style={{ background: props.color }}
                    onClick={() => setDegreesToFahrenheit()}
                ></img>
                <span>Show degrees by Fahrenheit</span>
            </MDBTooltip>

            <MDBTooltip
                domElement
                tag="span"
                placement="bottom"
            >
                <img className='imgOfDegree cursorPointer DegreesDiv'
                    alt='celsius'
                    src={`../img/${celsiusImg}.png`}
                    style={{ background: props.color }}
                    onClick={() => setDegreesToCelsius()}
                ></img>
                <span>Show degrees by Celsius</span>
            </MDBTooltip>
        </div>
    )
}
export default Degrees