import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { incremented, getUserList } from './actions.js'
import { getRequest } from '../../request';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Toolbar(props) {
  const { counter } = props;

  const onSearch = () => {
    props.incremented();
    getRequest('/user/list').then((data) => {
      if (data.data.list) {
        props.getUserList(data.data.list)
      }
    });
  }
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={8}>
            <Form.Item
              label="用户名"
              name="username"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="手机号"
              name="phone"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" style={{marginLeft: 20}} onClick={onSearch}>
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter,
  }
}

const mapDispatchToProps =  (dispatch) => {
  return {
    incremented: () => dispatch(incremented()),
    getUserList: (params) => dispatch(getUserList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

