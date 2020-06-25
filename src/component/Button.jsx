import React from 'react';

/**
 * The button for the calculator.
 *
 * @param {String} props.label The label for the button
 * @param {Function} props.handleClick The function for handling clicking event
 * @param {String} props.value The value of the button which will be used as input
 *                              for the calculator.
 * @param {String} props.id The id for each button
 */
const Button = (props) => {
    const { label, handleClick, value, id } = props;

    return (
        <button onClick={handleClick} value={value} id={id}>
            {label}
        </button>
    );
};

export default Button;
