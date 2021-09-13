const getIsDifferent = (oldValue, newValue) => {
  if (typeof oldValue !== typeof newValue) {
    return true
  }

  if (Array.isArray(oldValue)) {
    return (
      oldValue.length !== newValue.length ||
      oldValue.some((value, index) => getIsDifferent(value, newValue[index]))
    )
  } else if (typeof oldValue === 'object' && oldValue !== null) {
    return Object.keys(oldValue).some((key) =>
      getIsDifferent(oldValue[key], newValue[key]),
    )
  } else {
    return oldValue !== newValue
  }
}

export const getIsNeedRendering = (oldState, nextState) =>
  getIsDifferent(oldState, nextState)
