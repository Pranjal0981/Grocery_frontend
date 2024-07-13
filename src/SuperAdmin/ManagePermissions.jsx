import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { UserOutlined, ShopOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: { opacity: 1, rotateY: 0 },
};

const ManagePermissions = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Manage Permissions</h1>
      <Row gutter={[16, 16]}>

        <Col xs={24} sm={12} lg={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.6 }}
          >
            <Card
              title={<div><UserOutlined /> Admin Permissions</div>}
              bordered={false}
              style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              headStyle={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              <p>Manage permissions for Admins.</p>
              <Link to='/superadmin/manageadmin'>
                <Button type="primary" icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
                  Manage Admin
                </Button>
              </Link>
            
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              title={<div><ShopOutlined /> Store Manager Permissions</div>}
              bordered={false}
              style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              headStyle={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              <p>Manage permissions for Store Managers.</p>
              <Button type="primary" icon={<ShopOutlined />} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
                Manage Store Manager
              </Button>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              title={<div><PlusOutlined /> Create New Store</div>}
              bordered={false}
              style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              headStyle={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              <p>Create and manage new stores.</p>
              <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}>
                Create Store
              </Button>
            </Card>
          </motion.div>
        </Col>

      </Row>
    </div>
  );
}

export default ManagePermissions;
