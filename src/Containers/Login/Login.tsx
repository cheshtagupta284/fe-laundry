import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import './index.css';
import BrandText from '../Brand/BrandText';
import { useRecoilState } from 'recoil';
import { userState } from '../..';
import { fetchUser } from '../../services';

const onFinish = (values: any, setUser: any) => {
  console.log('Success:', values);
  const user = fetchUser(values);
  user && setUser(user);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      {user && <Navigate to="/dashboard" replace={true} />}
      <div className="form-container">
        <BrandText />
        <Form
          className="login-signup-form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values, setUser)}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p>
          New Here? <Link to="/signup">Sign Up</Link> today
        </p>
      </div>
    </>
  );
};

export default Login;
