import React from 'react'

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