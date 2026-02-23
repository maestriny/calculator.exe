import styled from 'styled-components';
import Btn from './Btn';

// map every button label to its corresponding reducer action
const ACTIONS = {
  'C':    { type: 'CLEAR' },
  'AC':   { type: 'ALL_CLEAR' },
  '↵':    { type: 'BACKSPACE' },
  // digits 0-9
  ...Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [String(i), { type: 'INPUT_DIGIT', digit: String(i) }])
  ),
  '/':    { type: 'SET_OPERATOR', operator: '/' },
  '*':    { type: 'SET_OPERATOR', operator: '*' },
  '-':    { type: 'SET_OPERATOR', operator: '-' },
  '+':    { type: 'SET_OPERATOR', operator: '+' },
  '.':    { type: 'INPUT_DECIMAL' },
  '+/-':  { type: 'TOGGLE_SIGN' },
  'sqrt': { type: 'SQRT' },
  '%':    { type: 'PERCENT' },
  '=':    { type: 'EQUALS' },
};


// visual layout, each row maps to a css grid row
// null = empty cell
const LAYOUT = [
  [null,  null,  'C',   'AC',  '↵'  ],
  ['(',   ')',   'MS▾', 'MR▾', 'M+▾'],
  ['7',   '8',   '9',   '/',   'sqrt'],
  ['4',   '5',   '6',   '*',   '%'  ],
  ['1',   '2',   '3',   '-',   '='  ],
  ['0',   '.',   '+/-', '+',   null ],
];

const GRID_ROWS = [1, 3, 4, 5, 6, 7]; // skip row 2 (spacer)
const DISABLED = new Set(['(', ')', 'MS▾', 'MR▾', 'M+▾']);

// flatten the 2D layout into a list of button props for rendering
// skips null cells, resolves each label's action and grid position and marks disabled buttons
// = is double-height (grid rows 6–7)
const BUTTONS = LAYOUT.flatMap((row, ri) =>
  row
    .map((label, ci) => label && {
      label,
      action: ACTIONS[label],
      gridColumn: String(ci + 1),
      gridRow: label === '=' ? '6 / 8' : String(GRID_ROWS[ri]),
      disabled: DISABLED.has(label),
    })
    .filter(Boolean)
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 32px 0px repeat(5, 32px);
  gap: 6px;
  padding: 2px 2px 4px;
`;

function BtnGrid({ dispatch }) {
  return (
    <Grid>
      {BUTTONS.map((btn) => (
        <Btn
          key={btn.label}
          label={btn.label}
          onClick={() => dispatch(btn.action)}
          gridColumn={btn.gridColumn}
          gridRow={btn.gridRow}
          disabled={btn.disabled}
        />
      ))}
    </Grid>
  );
}

export default BtnGrid;
