import React from 'react'
import ConfirmSignUpSuccess from './ConfirmSignUpSuccess'

const Loading = ({ isLoading }) => {

    return (
        <>
            {isLoading &&
                <div className='loading-container'>
                    <div className="lds-dual-ring"></div>
                </div>
            }
        </>
    )
}

export default Loading