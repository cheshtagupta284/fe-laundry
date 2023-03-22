import { DeleteFilled, DownCircleFilled, HeartFilled, UpCircleFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Layout,
  List,
  Menu,
  message,
  Space,
  Spin,
  theme
} from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { NoticeType } from 'antd/es/message/interface';
import Link from 'antd/es/typography/Link';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '.';
import BrandText from './Components/Brand/BrandText';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import './index.css';
import {
  createCloth,
  createLaundry,
  deleteLaundry,
  getClothByUser,
  getLaundryByUser
} from './services';

const CheckboxGroup = Checkbox.Group;

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
  const [loading, setLoading] = useState(false);
  const [activeTabKeyCloth, setActiveTabKeyCloth] = useState<string>('addCloth');
  const [activeTabKeyLaundry, setActiveTabKeyLaundry] = useState<string>('addLaundry');

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

  const contentListCloth: Record<string, React.ReactNode> = {
    clothList: (
      <div className="cloth-image-list">
        {clothList.map((item) => {
          return (
            <img
              key={item.id}
              alt="logo"
              src={`https://laundry.tanq.tk:5000/cloth/image/${item.image}`}
              className="cloth-image"
            />
          );
        })}
      </div>
    ),
    addCloth: (
      <>
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
      </>
    )
  };

  const onClothTabChange = (key: string) => {
    setActiveTabKeyCloth(key);
  };

  const tabListCloth = [
    {
      key: 'addCloth',
      tab: 'Add'
    },
    {
      key: 'clothList',
      tab: 'View All'
    }
  ];

  const contentListLaundry: Record<string, React.ReactNode> = {
    laundryList: (
      <List
        dataSource={laundryList}
        itemLayout="vertical"
        renderItem={(item) => (
          <List.Item
            key={item.id}
            onClick={(e) => {
              setOpenIndex((prevState) => (prevState === item.id ? null : item.id));
            }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <List.Item.Meta title={item.title} />
              <IconText
                icon={item.id === openIndex ? UpCircleFilled : DownCircleFilled}
                text={item.clothList.length}
                key="list-dropdown"
              />
              <DeleteFilled
                style={{
                  color: '#d9363e',
                  marginLeft: '10px',
                  padding: '5px',
                  fontSize: '15px',
                  border: '1px solid #d9363e',
                  borderRadius: '50%',
                  zIndex: '2'
                }}
                onClick={async (e) => {
                  setLoading(true);
                  e.stopPropagation();
                  console.log(item.id);
                  await deleteLaundry(item.id, user?.email || '');
                  setLaundryList(laundryList.filter((laundry) => laundry.id !== item.id));
                  alert('success', `Laundry titled ${item.title} was deleted`);
                  setLoading(false);
                }}
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
    ),
    addLaundry: (
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
                    className="cloth-image"
                  />
                ),
                value: item.id
              };
            })}
            value={checkedList}
            onChange={(values) => onClothSelect(values, setCheckedList)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  };

  const onLaundryTabChange = (key: string) => {
    setActiveTabKeyLaundry(key);
  };

  const tabListLaundry = [
    {
      key: 'addLaundry',
      tab: 'Add'
    },
    {
      key: 'laundryList',
      tab: 'View All'
    }
  ];

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space style={{ gap: 0 }}>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const onCreateCloth = async (event: any, setClothList: any) => {
    setLoading(true);
    const cloth = await createCloth(
      {
        image: imageData,
        type: event.target[1].value
      },
      user?.email || ''
    );
    setClothList((prevState: any) => [cloth, ...prevState]);
    onClothTabChange('clothList');
    setLoading(false);
    alert('success', 'Cloth created successfully');
  };

  const onCreateLaundry = async (values: any, setLaundryList: any) => {
    setLoading(true);
    values = {
      title: values.title,
      clothList: values.clothList.map((item: number) => ({
        id: item
      }))
    };
    console.log(values);
    await createLaundry(values, user?.email || '');
    // Get call to get IDs of images
    await getLaundryByUser(user?.email || '').then((laundry) => {
      laundry.sort((a: any, b: any) => -a.id + b.id);
      setLaundryList(laundry as Record<string, any>[]);
    });
    onLaundryTabChange('laundryList');
    setLoading(false);
    alert('success', 'Laundry created successfully');
  };

  const onClothSelect = (list: any, setCheckedList: any) => {
    setCheckedList(list);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const alert = (type: NoticeType, content: string) => {
    messageApi.open({ type, content });
  };

  return (
    <ProtectedRoute>
      <Spin spinning={loading} tip="Loading">
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
                  label: ['Cloth', 'Laundry', 'Settings'][index],
                  onClick: () => {
                    setSelectedKeys([`${key}`]);
                  }
                };
              })}
            />
          </Header>
          <Content style={{ padding: '2rem 1rem' }}>
            <div className={`site-layout-content ${selectedKeys.includes('1') ? '' : 'hidden'}`}>
              <Title style={{ marginBottom: '1rem' }} level={3}>
                Manage Clothes
              </Title>
              <Card
                style={{ width: '100%' }}
                tabList={tabListCloth}
                activeTabKey={activeTabKeyCloth}
                onTabChange={onClothTabChange}>
                {contentListCloth[activeTabKeyCloth]}
              </Card>
            </div>
            <div className={`site-layout-content ${selectedKeys.includes('2') ? '' : 'hidden'}`}>
              {contextHolder}
              <Title style={{ marginBottom: '1rem' }} level={3}>
                Manage Laundry
              </Title>
              <Card
                style={{ width: '100%' }}
                tabList={tabListLaundry}
                activeTabKey={activeTabKeyLaundry}
                onTabChange={onLaundryTabChange}>
                {contentListLaundry[activeTabKeyLaundry]}
              </Card>
            </div>
            <div className={`site-layout-content ${selectedKeys.includes('3') ? '' : 'hidden'}`}>
              <Title style={{ marginBottom: '1rem' }} level={3}>
                Hello {user?.fname} {user?.lname}!
              </Title>
              <Card>
                <Link href="https://cheshtagupta.com" target={'_blank'} style={{ color: '#000' }}>
                  Know the Dev
                </Link>
                <Divider />
                <Link
                  href="mailto:cheshtaguptacs@gmail.com"
                  target={'_blank'}
                  style={{ color: '#000' }}>
                  Contact Us
                </Link>
                <Divider />
                <p style={{ cursor: 'pointer' }} onClick={() => setUser(null)}>
                  Sign Out
                </p>
              </Card>
            </div>
          </Content>
          <Footer
            style={{ textAlign: 'center', borderTop: '1px solid #dfdfdf' }}
            className={`${selectedKeys.includes('3') ? '' : 'hidden'}`}>
            Made with <HeartFilled style={{ color: '#d9363e' }} /> by Cheshta
          </Footer>
        </Layout>
      </Spin>
    </ProtectedRoute>
  );
};

export default Dashboard;
