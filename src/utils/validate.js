import { types } from '../constants.js'

const { OBJECT, ARRAY, NULL } = types

const contains = (object, targetKey) =>
  Object.keys(object).some((key) => key === targetKey)

const validateType = (value, type) => {
  switch (type) {
    case OBJECT:
      return value !== null && !Array.isArray(value) && typeof value === type
    case ARRAY:
      return Array.isArray(value)
    case NULL:
      return value === null
    default:
      return typeof value === type
  }
}

export const validateTypes = (stateTypes, newState) => {
  for (const key in stateTypes) {
    const value = newState[key]

    if (Array.isArray(stateTypes[key])) {
      if (!stateTypes[key].some((type) => validateType(value, type))) {
        throw new Error(`${key}는 ${stateTypes[key].join('또는')} 여야 합니다`)
      }
    } else if (!validateType(value, stateTypes[key])) {
      throw new Error(`${key}는 ${stateTypes[key]} 여야 합니다.`)
    }
  }

  return true
}

export const validateKeys = (oldState, newState) => {
  for (const key of Object.keys(oldState)) {
    if (!contains(newState, key)) {
      throw new Error(`state는 반드시 key : ${key}를 가져야합니다.`)
    }
  }

  return true
}
