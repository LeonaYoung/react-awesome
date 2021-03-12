import React from 'react';
import { compose } from 'redux';
import { Divider } from 'antd';
import Toolbar from './Toolbar';
import Datatable from './Datatable';
import injectReducer from '../../injectReducer';
import { NAMESPACE } from './constants';

const withReducer = injectReducer({ key: NAMESPACE, reducer });

function Index() {
  return (
    <>
      <Toolbar />
      <Divider />
      <Datatable />
    </>
  )
}

export default compose(withReducer)(Index);