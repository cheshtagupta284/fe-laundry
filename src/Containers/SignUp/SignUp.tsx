import React from 'react';
import { Button, Form, Input } from 'antd';
import BrandText from '../../Components/Brand/BrandText';
import { useRecoilState } from 'recoil';
import { userState } from '../..';
import { Navigate } from 'react-router-dom';
import { createUser } from '../../services';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};
/* eslint-enable no-template-curly-in-string */

const onFinish = async (values: any, setUser: any) => {
  const user = await createUser(values.user);
  user.isAuthenticated = true;
  if (user.error) {
    return alert('USER ALREADY EXISTS');
  }
  values.user && setUser({ ...values.user, isAuthenticated: true });
};

const SignUp: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div className="form-container">
      {user?.isAuthenticated && <Navigate to="/" replace={true} />}
      <BrandText />
      <Form
        {...layout}
        className="login-signup-form"
        name="nest-messages"
        onFinish={(values) => onFinish(values, setUser)}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}>
        <Form.Item name={['user', 'fname']} label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lname']} label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
