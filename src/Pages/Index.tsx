import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './style.scss'
const Index = () => {
    let dispatch = useDispatch()
    let store = useSelector((state:any)=>{
        let {locale} = state.globalReducer
        return {locale}
    })
    let clickFn = (param:string) =>{
        dispatch({type:'LOCALE',payLoad:param})
    }
    return (
        <div className="tc">
            <br/>
            <br/>
            <h1 style={{textAlign:'center'}}>{store.locale}</h1>
            <br/>
            <div>
                <button onClick={()=>clickFn('zh-CN')}>zh-CN</button>
                &emsp;
                <button onClick={()=>clickFn('zh-TW')}>zh-TW</button>
                &emsp;
                <button onClick={()=>clickFn('en-US')}>en-US</button>
                &emsp;
                <button onClick={()=>clickFn('vi-VN')}>vi-VN</button>
            </div>
            <br/>
            <div>{l('t1')} {l('t2')}</div>
            <br/>
            <div className="container m00"></div>
        </div>
    )
}
export default Index