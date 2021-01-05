import React from 'react'

const  Loading = ()=> {
    return <div style={{height:'400px'}}>
        <img
         className="flex"
         style={{margin:'200px auto'}}
         width="80"
         height = "80"
         src={require('../imgs/loading.svg')} alt=""/>
    </div>
}
export default Loading;