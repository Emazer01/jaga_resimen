import * as React from 'react';

const sleep = (ms) => {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

export {
    sleep
};