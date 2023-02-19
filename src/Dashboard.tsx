import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, List, Menu, Space, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '.';
import BrandText from './Components/Brand/BrandText';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import './index.css';
import { createCloth, createLaundry, getClothByUser, getLaundryByUser } from './services';

const Dashboard: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [clothList, setClothList] = useState<Record<string, any>[]>([]);
  const [laundryList, setLaundryList] = useState<Record<string, any>[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [checkedList, setCheckedList] = useState<any>([]);
  const [imageData, setImageData] = useState<any>(null);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const CheckboxGroup = Checkbox.Group;

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const onCreateCloth = async (event: any, setClothList: any) => {
    const cloth = await createCloth(
      {
        image: imageData,
        type: event.target[1].value
      },
      user?.email || ''
    );
    setClothList((prevState: any) => [...prevState, cloth]);
    console.log(cloth);
  };

  const onCreateLaundry = async (values: any, setLaundryList: any) => {
    values = {
      title: values.title,
      clothList: values.clothList.map((item: number) => ({
        id: item
      }))
    };
    console.log(values);
    await createLaundry(values, user?.email || '');
    getLaundryByUser(user?.email || '').then((laundry) => {
      laundry.sort((a: any, b: any) => -a.id + b.id);
      setLaundryList(laundry as Record<string, any>[]);
    });
  };

  const onChange = (list: any, setCheckedList: any) => {
    setCheckedList(list);
  };

  useEffect(() => {
    console.log('RENDERED');
    getClothByUser(user?.email || '').then((clothes) =>
      setClothList(clothes as Record<string, any>[])
    );
    getLaundryByUser(user?.email || '').then((laundry) => {
      laundry.sort((a: any, b: any) => -a.id + b.id);
      setLaundryList(laundry as Record<string, any>[]);
    });
  }, []);

  return (
    <ProtectedRoute>
      <>
        <Layout className="layout">
          <Header>
            <BrandText />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              selectedKeys={selectedKeys}
              items={new Array(3).fill(null).map((_, index) => {
                const key = index + 1;
                return {
                  key,
                  label: ['Home', 'Add Laundry', 'All Laundry'][index],
                  onClick: () => {
                    setSelectedKeys([`${key}`]);
                  }
                };
              })}
            />
          </Header>
          <Content style={{ padding: '2rem 1rem' }}>
            <div className={`site-layout-content ${selectedKeys.includes('1') ? '' : 'hidden'}`}>
              <div style={{ marginBottom: '1rem' }}>
                Hello{' '}
                <span style={{ cursor: 'pointer' }} onClick={() => setUser(null)}>
                  {user?.fname} {user?.lname}
                </span>
              </div>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img
                  src={imageData && URL.createObjectURL(imageData)}
                  style={{ width: 150, height: 150, background: '#333', objectFit: 'cover' }}
                />
              </div>
              <Form
                name="cloth"
                onSubmitCapture={(event) => onCreateCloth(event, setClothList)}
                title="Add Cloth">
                <Form.Item
                  label="Upload"
                  name="image"
                  rules={[{ required: true, message: 'Please upload an image' }]}>
                  <Input
                    type="file"
                    onChange={(e: any) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (e: any) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.onload = () => {
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          canvas.width = canvas.height = 300;
                          ctx?.drawImage(img, 0, 0, 300, 300);
                          canvas.toBlob(async (e) => {
                            const buffer = new Uint8Array((await e?.arrayBuffer()) || []);
                            return setImageData(new Blob([buffer], { type: 'image/jpg' }));
                          }, file.type);
                        };
                      };
                      reader.readAsDataURL(file);
                    }}
                    placeholder="Add Image"
                  />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: 'Please input the type' }]}>
                  <Input placeholder="Shirt / Pant / Towel" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Button type="primary" htmlType="submit">
                    Add Cloth
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={`site-layout-content ${selectedKeys.includes('2') ? '' : 'hidden'}`}>
              <Form
                name="laundry"
                title="Add Laundry"
                initialValues={{
                  ['title']: new Date().toJSON().slice(0, 10).replaceAll('-', '/'),
                  ['clothes']: []
                }}
                onFinish={(values) => onCreateLaundry(values, setLaundryList)}>
                <Form.Item label="Title" name="title">
                  <Input
                    placeholder={new Date().toJSON().slice(0, 10).replaceAll('-', '/')}
                    value={new Date().toJSON().slice(0, 10).replaceAll('-', '/')}
                  />
                </Form.Item>
                <Form.Item label="Clothes" name="clothList" valuePropName="values">
                  <CheckboxGroup
                    style={{
                      flexWrap: 'wrap',
                      maxHeight: '274px',
                      overflow: 'scroll'
                    }}
                    options={clothList.map((item) => {
                      return {
                        label: (
                          <img
                            alt="logo"
                            src={`https://laundry.tanq.tk:5000/cloth/image/${item.image}`}
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                        ),
                        value: item.id
                      };
                    })}
                    value={checkedList}
                    onChange={(values) => onChange(values, setCheckedList)}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={`site-layout-content ${selectedKeys.includes('3') ? '' : 'hidden'}`}>
              <List
                dataSource={laundryList}
                itemLayout="vertical"
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    onClick={(e) => {
                      setOpenIndex((prevState) => (prevState === item.id ? null : item.id));
                    }}>
                    <div style={{ display: 'flex' }}>
                      <List.Item.Meta title={item.title} />
                      <IconText
                        icon={item.id === openIndex ? UpCircleFilled : DownCircleFilled}
                        text={item.clothList.length}
                        key="list-dropdown"
                      />
                    </div>
                    <div className={`laundry-cloth-grid ${openIndex === item.id ? '' : 'hidden'}`}>
                      {item.clothList.map((clothItem: any) => (
                        <img
                          key={clothItem.id}
                          alt="logo"
                          src={`https://laundry.tanq.tk:5000/cloth/image/${clothItem.image}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', borderTop: '1px solid #dfdfdf' }}>
            Made by Cheshta
          </Footer>
        </Layout>
      </>
    </ProtectedRoute>
  );
};

export default Dashboard;
