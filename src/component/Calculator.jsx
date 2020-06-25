import React from 'react';

import ButtonsPanel from './ButtonsPanel';
import Display from './Display';

/**
 * The main component of the app, which contains all states and other smaller components
 */
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            answer: '',
            operator: '',
        };
    }

    /**
     * Handling decimal click
     */
    handleDecimal = () => {
        let { operator, current, answer } = this.state;

        // If there is no operator entered yet
        if (operator === '') {
            // When there is nothing entered yet, we interpret '.' as '0.'
            if (current === '' && answer === '') {
                current = '0.';
            }
            // If a previous evaluation has just been performed and the user enter
            // '.' immediately, we also treat it as a '0.'
            else if (current !== '' && answer !== '') {
                current = '0.';
                answer = '';
            }
            // If there is already an operand entered, we first check if that operand
            // contains a '.', if yes, we ignore this '.', otherwise we append it to the
            // current operator.
            else if (current !== '') {
                if (current.indexOf('.') !== -1) return;
                current = current + '.';
            }
        } else {
            // If there is an operator already entered
            // we retrieve the second operand, if there is no operand
            // we treat the '.' as a abbreviation for '0.'
            // Otherwise, we check if the second operand has '.' if yes we ignore
            // the new '.' else we just append it the end of the second operand.
            let opPos = current.indexOf(operator);
            let secondOperand = current.substring(opPos);
            if (secondOperand.indexOf('.') !== -1) return;

            current = current + '.';
        }

        this.setState({ current, answer, operator });
    };

    /**
     * Handle the numpad click
     *
     * @param {String} event.target.value The number on the numpad
     */
    handleNumpad = (event) => {
        let value = event.target.value;
        let { current, answer, operator } = this.state;

        // Cannot add 0 to the beginning of a number
        if (value === '0' && current === '') return;

        // Cannot add 0 to the beginning of the second operand
        if (
            value === '0' &&
            operator !== '' &&
            current.indexOf(operator) === current.length - 1
        )
            return;

        // If no previous answer has been calculated yet
        if (answer === '') current = current + value;
        // If there is an answer that has just been calculated
        else if (answer !== '') {
            current = value;
            answer = '';
        }

        this.setState({ current, answer, operator });
    };

    /**
     * Handling the "equals" button click
     */
    handleEqual = () => {
        let { answer, current, operator } = this.state;

        // If nothing has been entered yet, we have nothing to evalutate
        if (current === '' && answer === '' && operator === '') return;
        else if (current !== '') {
            // If there is only one operand entered and there is no operators
            // entered yet, we simply take the operand as the answer.
            if (answer === '' && operator === '') {
                this.setState({
                    answer: current,
                });
            }
            // If there are no operands entered yet but there is a previous answered
            // we do nothing
            else if (operator === '') return;
            // If the user has just entered an operator but haven't enetered the second
            // operand, we do nothing
            else if (current.indexOf(operator) === current.length - 1) return;
            // If a full equation has been entered, we just simply evaluate it and
            // set the answer to corresponding state
            else {
                let ans = eval(current);
                current = ans + '';
                answer = ans + '';
                operator = '';
                this.setState({ current, answer, operator });
            }
        }
    };

    /**
     * Handling the "All Clear" button click
     */
    handleReset = () => {
        this.setState({
            current: '',
            answer: '',
            operator: '',
        });
    };

    /**
     * Handling the operators input
     *
     * @param {String} event.target.value The operator that user has just inputted
     */
    handleOperator = (event) => {
        let opt = event.target.value;
        let operators = /\+|\/|\*|-/g;
        let { current, answer, operator } = this.state;

        // We have a special treat for '-' sign since it can be both 'subtraction'
        // operator or 'negative' operator, therefore we have to check if the newly
        // input operator is '-'
        if (opt !== '-') {
            // Operators are not allow when no number has been entered yet
            if (current === '' && answer === '') return;
            // If the first operands has been entered
            else if (current !== '' && answer === '' && operator === '') {
                this.setState({
                    current: current + opt,
                    operator: opt,
                });
            } else if (current !== '') {
                // If the user just finished a calculation and want to use to previous answer
                // to perform a new calculation
                if (operator === '') {
                    this.setState({
                        current: current + opt,
                        operator: opt,
                        answer: '',
                    });
                }
                // If the user wants to change the current operator
                // replace all the old operators (including negative sign) and
                // add the new one in
                else if (operators.test(current.charAt(current.length - 1))) {
                    current = current.replace(operators, '');
                    current = current + opt;
                    operator = opt;
                    this.setState({ current, operator });
                }
                // If the user wants to enter consecutives operators one after another
                // (with the proper operands entered in between), we just evaluate
                // the prior one and append the new operator to the answer of that one.
                else {
                    let ans = eval(current);
                    current = ans + opt;
                    operator = opt;

                    this.setState({ current, operator });
                }
            }
        } else {
            // If there is no operand entered before the '-' sign
            // we treat it as a "subtract" operator, otherwise we see it as a
            // "negative" sign
            if (operator === '') {
                operator = opt;
            }

            current = current + opt;
            this.setState({ current, operator, answer });
        }
    };

    render() {
        return (
            <div id="calculator">
                <Display
                    current={this.state.current}
                    answer={this.state.answer}
                />
                <ButtonsPanel
                    handleEqual={this.handleEqual}
                    handleReset={this.handleReset}
                    handleNumpad={this.handleNumpad}
                    handleOperator={this.handleOperator}
                    handleDecimal={this.handleDecimal}
                />
            </div>
        );
    }
}

export default Calculator;
