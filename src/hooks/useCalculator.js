import { useReducer } from 'react';

// max digits shown on the display
const MAX_DISPLAY_LENGTH = 16;

const initialState = {
  displayValue: '0',
  firstOperand: null, // left side of the operation 
  operator: null,     
  waitingForSecondOperand: false, // true right after pressing an operator
  shouldResetDisplay: false,     // true after = or sqrt, so next digit replaces the display
  error: null, // error message shown in the error dialog
};

// does the actual math, returns null if dividing by zero
function calculate(left, operator, right) {
  switch (operator) {
    case '+': return left + right;
    case '-': return left - right;
    case '*': return left * right;
    case '/':
      if (right === 0) return null;
      return left / right;
    default: return null;
  }
}

// turns a number into a display-friendly string
// uses exponential notation if it's too long for the display
function formatResult(value) {
  const result = parseFloat(value.toPrecision(12)).toString();
  if (result.length > MAX_DISPLAY_LENGTH) {
    return value.toExponential(6);
  }
  return result;
}

function calculatorReducer(state, action) {

  switch (action.type) {

    // user pressed a digit (0-9)
    case 'INPUT_DIGIT': {
      // after an operator or = start fresh
      if (state.waitingForSecondOperand || state.shouldResetDisplay) {
        return {
          ...state,
          displayValue: action.digit,
          waitingForSecondOperand: false,
          shouldResetDisplay: false,
        };
      }
      // replace leading zero
      if (state.displayValue === '0') {
        return { ...state, displayValue: action.digit };
      }
      // don't exceed display limit
      if (state.displayValue.length >= MAX_DISPLAY_LENGTH) {
        return state;
      }
      return { ...state, displayValue: state.displayValue + action.digit };
    }

    // user pressed "."
    case 'INPUT_DECIMAL': {
      if (state.waitingForSecondOperand || state.shouldResetDisplay) {
        return {
          ...state,
          displayValue: '0.',
          waitingForSecondOperand: false,
          shouldResetDisplay: false,
        };
      }
      // only one decimal point allowed
      if (state.displayValue.includes('.')) {
        return state;
      }
      return { ...state, displayValue: state.displayValue + '.' };
    }

    // user pressed an operator
    case 'SET_OPERATOR': {
      const currentValue = parseFloat(state.displayValue);

      // if there's already a pending operation, compute it first (chaining: 2 + 3 + ...)
      if (state.firstOperand !== null && state.operator && !state.waitingForSecondOperand) {
        const result = calculate(state.firstOperand, state.operator, currentValue);
        if (result === null) {
          return { ...state, error: 'Cannot divide by zero' };
        }
        const display = formatResult(result);
        return {
          ...state,
          displayValue: display,
          firstOperand: result,
          operator: action.operator,
          waitingForSecondOperand: true,
          shouldResetDisplay: false,
        };
      }

      // first operator in the chain: just store the operand
      return {
        ...state,
        firstOperand: currentValue,
        operator: action.operator,
        waitingForSecondOperand: true,
        shouldResetDisplay: false,
      };
    }

    // user pressed =
    case 'EQUALS': {
      // nothing to compute
      if (state.firstOperand === null || state.operator === null) {
        return { ...state, shouldResetDisplay: true };
      }

      const currentValue = parseFloat(state.displayValue);
      const result = calculate(state.firstOperand, state.operator, currentValue);
      if (result === null) {
        return { ...state, error: 'Cannot divide by zero' };
      }
      const display = formatResult(result);
      return {
        ...state,
        displayValue: display,
        firstOperand: null,
        operator: null,
        waitingForSecondOperand: false,
        shouldResetDisplay: true,
      };
    }

    // C just clears the display
    case 'CLEAR': {
      return { ...state, displayValue: '0' };
    }

    // AC resets everything
    case 'ALL_CLEAR': {
      return { ...initialState };
    }

    // delete last digit
    case 'BACKSPACE': {
      if (state.waitingForSecondOperand || state.shouldResetDisplay) {
        return state;
      }
      // if only one digit left (or a minus sign + one digit), reset to zero
      if (state.displayValue.length === 1 || (state.displayValue.length === 2 && state.displayValue.startsWith('-'))) {
        return { ...state, displayValue: '0' };
      }
      return { ...state, displayValue: state.displayValue.slice(0, -1) };
    }

    // +/- : flip the sign
    case 'TOGGLE_SIGN': {
      if (state.displayValue === '0') return state;
      const toggled = state.displayValue.startsWith('-')
        ? state.displayValue.slice(1)
        : '-' + state.displayValue;
      return { ...state, displayValue: toggled };
    }

    // square root
    case 'SQRT': {
      const value = parseFloat(state.displayValue);
      if (value < 0) {
        return { ...state, error: 'Cannot calculate square root of a negative number' };
      }
      return {
        ...state,
        displayValue: formatResult(Math.sqrt(value)),
        shouldResetDisplay: true,
      };
    }

    // % of the first operand, or just divide by 100
    case 'PERCENT': {
      const value = parseFloat(state.displayValue);
      // if we have a first operand, treat as x% of that (e.g. 200 + 10% = 200 + 20)
      if (state.firstOperand !== null) {
        const percentValue = state.firstOperand * (value / 100);
        return {
          ...state,
          displayValue: formatResult(percentValue),
          shouldResetDisplay: false,
        };
      }
      // otherwise just divide by 100
      return {
        ...state,
        displayValue: formatResult(value / 100),
        shouldResetDisplay: true,
      };
    }

    // close the error dialog
    case 'DISMISS_ERROR': {
      return { ...state, error: null };
    }

    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  return { state, dispatch };
}
