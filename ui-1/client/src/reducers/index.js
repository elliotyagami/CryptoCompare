import {initialState} from '../store/initialState'

export default (state = initialState.conversion, action) => {
    switch (action.type) {
        case 'FromChange':
            return Object.assign({}, state, {
                'from': action.from
            })
        case 'ToChange':
            return Object.assign({}, state, {
                'to': action.to
            })
        case 'AddFromCurrency':
            return Object.assign({}, state, {
                fromCurrency: [...state.fromCurrency, action.currency].sort()
            })
        case 'AddToCurrency':
            return Object.assign({}, state, {
                toCurrency: [...state.toCurrency, action.currency].sort()
            })
        case 'RemoveFromCurrency':
            return Object.assign({}, state, {
                fromCurrency: state.fromCurrency.filter((ele, i) => {
                    if (i != action.index) return true
                })
              })
        case 'RemoveToCurrency':
            return Object.assign({}, state, {
                toCurrency: state.toCurrency.filter((ele, i) => {
                    if (i != action.index) return true
                })
            })
        default:
            return state
        }
}
