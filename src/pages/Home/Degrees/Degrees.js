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
    }, [])

    useEffect(() => {
        console.log('degreeState', degreeState)

    })

    const setDegreesToFahrenheit = () => {
        setFahrenheitImg('fahrenheitFull')
        setCelsiusImg('celsiusEmpty')
        dispatch(updateDegrees('Fahrenheit'))
        // localStorage.removeItem('degree')
        // localStorage.setItem('degree', 'Fahrenheit');
    }
    const setDegreesToCelsius = () => {
        setFahrenheitImg('fahrenheitEmpty')
        setCelsiusImg('celsiusFull')
        dispatch(updateDegrees('Celsius'))
        // localStorage.removeItem('degree')
        // localStorage.setItem('degree', 'Celsius');
    }


    return (
        <MDBRow>
            <MDBCol sm='6' className='marginAuto text-center'>
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


            </MDBCol>
        </MDBRow>

    )
}
export default Degrees