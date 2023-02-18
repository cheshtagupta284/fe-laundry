import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '.';
import './index.css';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { createCloth, getClothByUser } from './services';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [clothList, setClothList] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    getClothByUser().then((clothes) => setClothList(clothes as Record<string, any>[]));
  }, []);

  const onFinish = async (event: any) => {
    const cloth = await createCloth({
      image: event.target[0].files[0],
      type: event.target[1].value
    });
    setClothList((prevState) => [...prevState, cloth]);
    console.log(cloth);
  };

  return (
    <ProtectedRoute>
      <>
        <div
          className="Dashboard"
          style={{ display: 'flex', justifyContent: 'space-between', padding: '2em 0' }}>
          {user?.fname} {user?.lname}
          <button
            onClick={() => {
              setUser(null);
            }}>
            Sign Out
          </button>
        </div>

        <Form name="cloth" onSubmitCapture={(event) => onFinish(event)} title="Add Cloth">
          <Form.Item
            label="Upload"
            name="image"
            rules={[{ required: true, message: 'Please upload an image' }]}>
            <Input type="file" placeholder="Add Image" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input the type' }]}>
            <Input placeholder="Shirt / Pant / Towel" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <List
          header="Clothes List"
          itemLayout="vertical"
          dataSource={clothList}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
              ]}
              extra={
                <img
                  alt="logo"
                  src={`http://localhost:8080/cloth/image/${item.image}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              }>
              <List.Item.Meta title={item.type} />
            </List.Item>
          )}
        />
      </>
    </ProtectedRoute>
  );
};

export default Dashboard;
