export const addFromCurrency = (currency) => ({
    type: 'AddFromCurrency',
    currency
})
export const addToCurrency = (currency) => ({
    type: 'AddToCurrency',
    currency
})
export const removeFromCurrency = (index) => ({
    type: 'RemoveFromCurrency',
    index
})
export const removeToCurrency = (index) => ({
    type: 'RemoveToCurrency',
    index
})
export const fromCurrency = (currency) => ({
    type: 'FromChange',
    'from': currency
})
export const toCurrency = (currency) => ({
    type: 'ToChange',
    'to': currency
})

