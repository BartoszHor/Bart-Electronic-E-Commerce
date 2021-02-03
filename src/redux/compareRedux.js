/* selectors */

export const isCompare = ({ compare }) => compare;

/* action name */
const createActionName = name => `products/${name}`;

/* action type */
export const COMPARE_VALUE = createActionName('COMPARE_VALUE');

/* action creator */
export const handleCompareValue = payload => ({ payload, type: COMPARE_VALUE });
/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case COMPARE_VALUE: {
      statePart.value = !statePart.value;
      return statePart;
    }
    default:
      return statePart;
  }
}
