import React, { useEffect, useState } from 'react'
import { MDBCol, MDBRow, MDBTooltip } from 'mdbreact'
import './degrees.css'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getDegrees, updateDegrees } from '../../../redux/degrees/degrees-actions'

const Degrees = () => {
    const [fahrenheitImg, setFahrenheitImg] = useState('')
    const [celsiusImg, setCelsiusImg] = useState('')
    const dispatch = useDispatch()
    let degreeState = useSelector((state) => state.degreesReducer.degree)

    useEffect(() => {
        if (degreeState == 'Celsius')
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
        <>
            <MDBTooltip
                domElement
                tag="span"
                placement="bottom"
            >
                <img className='imgOfDegree cursorPointer DegreesDiv' src={`../img/${fahrenheitImg}.png`}
                    onClick={() => setDegreesToFahrenheit()}
                ></img>
                <span>Show degrees by Fahrenheit</span>
            </MDBTooltip>

            <MDBTooltip
                domElement
                tag="span"
                placement="bottom"
            >
                <img className='imgOfDegree cursorPointer DegreesDiv' src={`../img/${celsiusImg}.png`}
                    onClick={() => setDegreesToCelsius()}
                ></img>
                <span>Show degrees by Celsius</span>
            </MDBTooltip>
        </>
    )
}
export default Degrees