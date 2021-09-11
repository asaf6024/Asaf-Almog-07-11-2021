import React, { useState } from 'react';

const Theme = (props) => {
    const [switch1, setswitch1] = useState(false)

    const handleSwitchChange = nr => () => {
        if (!switch1) {
            setswitch1(true)
            document.getElementById('root').classList.add('DarkTheme')
            document.getElementById('root').classList.remove('WhiteTheme')
        }
        else {
            setswitch1(false)
            document.getElementById('root').classList.add('WhiteTheme')
            document.getElementById('root').classList.remove('DarkTheme')
        }
    }

    return (
        <div className='custom-control custom-switch marginAuto'>
            <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitches'
                checked={switch1}
                onChange={handleSwitchChange()}
                readOnly
            />
            <label className='custom-control-label customHeadline cursorPointer' htmlFor='customSwitches'
                style={{ fontVariant: 'small-caps', color: props.color }}>
                darkmode
            </label>
        </div>
    );
}

export default Theme;