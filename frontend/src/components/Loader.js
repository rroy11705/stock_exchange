import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <Spinner
            animation='grow'
            role='status'
            variant="success"
            style={{
                margin: '100px auto',
                height: '100px',
                width: '100px',
                display: 'block'
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader