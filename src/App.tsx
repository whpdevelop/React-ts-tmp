import React from 'react';
import app from './App.scss';

import { connect } from 'react-redux'
import * as TYPES  from '@/store/types'
import { toggleLanguageAction } from '@/store/reducers/global.reducer'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { l } from '@/utils'

import { ConfigProvider } from 'antd'
// import zhCN from 'antd/es/locale/zh_CN';
// import enUS from 'antd/es/locale/en_US';
// import viVN from 'antd/es/locale/vi_VN';
// import zhTW from 'antd/es/locale/zh_TW';

import { Button } from 'antd';

import ScrollToTop from '@/Layout/ScrollToTop'
import Main from '@/Layout/Main'

interface IProps {
  locale:string,
  toggleLanguageAction:any
}
function App(props:IProps) {
  const { 
    locale,
    toggleLanguageAction
  } = props
  let change = (locale:string) => {
    toggleLanguageAction(locale)
  }
  return (
    <div className={app.App}>
      <br/>
      <br/>
      <br/>
      <br/>
      App 
      <h1>{l('locale')}</h1>
      <h1>{l('title')}</h1>
      <Button
      type="primary"
      onClick = {()=>change('cn')}
      >
        change-cn
      </Button>
      <Button
      type="primary"
      onClick = {()=>change('tw')}
      >
        change-tw
      </Button>
      <Button
      type="primary"
      onClick = {()=>change('en')}
      >
        change-en
      </Button>
      <Button
      type="primary"
      onClick = {()=>change('vn')}
      >
        change-vn
      </Button>
      <ConfigProvider>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route  component={Main} />
            </Switch>
          </ScrollToTop>
        </Router>
      </ConfigProvider>
      
    </div>
  );
}
let mapStateToProps = (state:TYPES.IGlobalState) =>{
  let { locale } = state.globalReducer
  return {
    locale
  }
}
let mapDispatchToProps = {
  toggleLanguageAction
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
