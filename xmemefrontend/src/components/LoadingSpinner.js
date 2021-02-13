import React from 'react';

const LoadingSpinner =()=> {
        return (
            <div className="mr-auto ml-auto">
                <span className="fa fa-spinner fa-pulse fa-4x fa-fw text-danger"></span>
                <h3>Loading...</h3>
                
            </div>
        );
}

export default LoadingSpinner;