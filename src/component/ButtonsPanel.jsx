import React from 'react';
import Button from './Button';

const ButtonsPanel = (props) => {
    const {
        handleNumpad,
        handleEqual,
        handleReset,
        handleOperator,
        handleDecimal,
    } = props;

    return (
        <div id="button-panel">
            <Button
                label="AC"
                id="clear"
                value="AC"
                handleClick={handleReset}
            />
            <Button label="1" id="one" value="1" handleClick={handleNumpad} />
            <Button label="2" id="two" value="2" handleClick={handleNumpad} />
            <Button label="3" id="three" value="3" handleClick={handleNumpad} />
            <Button label="4" id="four" value="4" handleClick={handleNumpad} />
            <Button label="5" id="five" value="5" handleClick={handleNumpad} />
            <Button label="6" id="six" value="6" handleClick={handleNumpad} />
            <Button label="7" id="seven" value="7" handleClick={handleNumpad} />
            <Button label="8" id="eight" value="8" handleClick={handleNumpad} />
            <Button label="9" id="nine" value="9" handleClick={handleNumpad} />
            <Button label="0" id="zero" value="0" handleClick={handleNumpad} />
            <Button
                label="."
                id="decimal"
                value="."
                handleClick={handleDecimal}
            />
            <Button
                label="&#43;"
                id="add"
                value="+"
                handleClick={handleOperator}
            />
            <Button
                label="&minus;"
                id="subtract"
                value="-"
                handleClick={handleOperator}
            />
            <Button
                label="&divide;"
                id="divide"
                value="/"
                handleClick={handleOperator}
            />
            <Button
                label="&times;"
                id="multiply"
                value="*"
                handleClick={handleOperator}
            />
            <Button label="=" id="equals" value="=" handleClick={handleEqual} />
        </div>
    );
};

export default ButtonsPanel;
