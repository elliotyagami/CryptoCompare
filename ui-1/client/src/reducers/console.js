import {initialState} from '../store/initialState'

export default (state = initialState.console, action) => {
    switch (action.type) {
        case 'AddToConsole':
            return [...state,action.payload]
        case 'ClearConsole':
            return []
        case 'RemoveLog':{
            // return state.map((ele,i) => {
            //     if (i != action.index)
            //     return Object.assign({}, ele)
            // })
            state.splice(action.index,1)
            return [...state]
    }
        default:
            return state
        }
}
