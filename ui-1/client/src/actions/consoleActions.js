export const addToConsole = (payload) => ({
    type: 'AddToConsole',
    payload
})
export const removeLog = (index) => ({
    type: 'RemoveLog',
    index
})
export const clearConsole = () => ({
    type: 'ClearConsole'
})
