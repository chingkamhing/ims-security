import { CONF, SECURE } from '../constants'

// unique id

// random number of digits that is going to multily with Math.random(), the larger it is, the less likely the result random integer will collide
const RAND_DIGITS = 1000000000000

export function generateUniqueId(prefix) {
    const id = `${prefix}${Date.now()}-${Math.round(Math.random()*RAND_DIGITS)}`
    return id
}

// array helper function

// compare two arrays if they are equal with exactly same order
export function isTwoArrayEqual(a, b) {
    return (a.length === b.length) && a.every((value, index) => value === b[index])
}

// compare two arrays if they are equal but may be in different order
export function isTwoArraySimilar(a, b) {
    return (a.length === b.length) && a.every((value, index) => b.includes(value))
}

// password check if secure function

export function checkPassword(passwordString) {
    let result = []
    const hasNumberChar = (sentence) => {
        return RegExp('[0-9]').test(sentence)
    }
    const hasLowerChar = (sentence) => {
        return RegExp('[a-z]').test(sentence)
    }
    const hasUpperChar = (sentence) => {
        return RegExp('[A-Z]').test(sentence)
    }
    const hasSymbolChar = (sentence) => {
        return RegExp('[^0-9a-zA-Z]').test(sentence)
    }
    if (passwordString.length >= CONF.PASSWORD_MIN_LENGTH) {
        result.push(SECURE.LONG)
    }
    if (hasNumberChar(passwordString)) {
        result.push(SECURE.NUMBER)
    }
    if (hasLowerChar(passwordString)) {
        result.push(SECURE.LOWER)
    }
    if (hasUpperChar(passwordString)) {
        result.push(SECURE.UPPER)
    }
    if (hasSymbolChar(passwordString)) {
        result.push(SECURE.SYMBOL)
    }
    return result
}

export function isPasswordSecure(passwordString) {
    const trait = checkPassword(passwordString)
    return CONF.PASSWORD_SECURE.every(secure => trait.includes(secure))
}
