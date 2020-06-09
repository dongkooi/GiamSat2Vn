import React, { Component } from 'react';
import './style.scss'
import { Row, Col } from 'antd';
import SensorInfor from './subComponents/SensorInfor';
import ChartYesterday from './subComponents/ChartYesterday';
class OverView extends Component {
    render() {
        return (
            <div className="site-layout-content" style={{ minHeight: window.screen.height - 92 }}>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <SensorInfor />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <ChartYesterday />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OverView;