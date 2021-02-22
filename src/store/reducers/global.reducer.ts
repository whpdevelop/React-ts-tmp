
import { IAction,IGlobalReducer } from '../types'
import { Dispatch } from 'redux'
const LOCALE = 'LOCALE'
const initState:IGlobalReducer = {
    locale:'zh-CN'
}

export default function  globalReducer (state = initState,action:IAction) {
    switch(action.type){
        case LOCALE:
            return { ...state, locale:action.payLoad}
        default:
            return state
    }
}

let localeAction = (param:any) => {
    return {
        type:LOCALE,
        payLoad:param
    }
}

export let localeDispatch = (param:any) =>{
    return (dispatch:Dispatch)=>dispatch(localeAction(param))
}
