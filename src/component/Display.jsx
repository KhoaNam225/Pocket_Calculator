import React from 'react';

/**
 * The screen of the calculator used to display input and answer.
 *
 * @param {String} props.current The current text on the display where
 *                               the user will input data
 * @param {String} props.answer The answer of any previous evaluation
 */
const Display = (props) => {
    const { current, answer } = props;

    return (
        <div id="display-container">
            <p id="display">{current === '' ? '0' : current}</p>
            <p id="answer">{answer}</p>
        </div>
    );
};

export default Display;
