import React from 'react';
import app from './App.scss';

// import { connect } from 'react-redux'
// import * as TYPES  from '@/store/types'
// import { toggleLanguageAction } from '@/store/reducers/global.reducer'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ConfigProvider } from 'antd'
// import zhCN from 'antd/es/locale/zh_CN';
// import enUS from 'antd/es/locale/en_US';
// import viVN from 'antd/es/locale/vi_VN';
// import zhTW from 'antd/es/locale/zh_TW';


import ScrollToTop from '@/Layout/ScrollToTop'
import Pc from '@/Layout/Pc/Main'
import Mobile from '@/Layout/Mobile/Main'

function App() {
  return (
      <ConfigProvider>
        <Router>
          <ScrollToTop>
            <Switch>
            {
                window.isPc?
                <Route  component={Pc} />:
                <Route  component={Mobile} />
              }
            </Switch>
          </ScrollToTop>
        </Router>
      </ConfigProvider>
  );
}
// let mapStateToProps = (state:TYPES.IGlobalState) =>{
//   let { locale } = state.globalReducer
//   return {
//     locale
//   }
// }
// let mapDispatchToProps = {
//   toggleLanguageAction
// }
// export default connect(mapStateToProps,mapDispatchToProps)(App);
export default App;
