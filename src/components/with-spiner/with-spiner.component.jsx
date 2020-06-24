import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spiner.styles';


const WithSpiner = WrappedComponent => {
    const Spiner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
                <WrappedComponent{...otherProps} />
            )
    }
    return Spiner
}

export default WithSpiner;