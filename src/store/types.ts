
export interface IAction {
    type:string,
    payLoad:any
}

/**
 * global.reducer.ts 
 */

export interface IGlobalReducer {
    locale:string
}

export interface IGlobalState {
    globalReducer: IGlobalReducer;
}