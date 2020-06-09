import React, { Component } from 'react';
import moment from 'moment';
import { getDataRealTime } from '../../../services/getDataRealTime';
import { Spin, message } from 'antd';
class SensorInfor extends Component {
    private intervalInitial = 0;

    state = {
        temperature: 0,
        humidity: 0,
        time: 0,
        dustDensity: 0,
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true })
        getDataRealTime().then((data: any) => {
            if (data.data[0].temperature > 50) {
                message.warning('Nhiệt độ quá cao! Hãy kiểm tra lại!', 10);
            }
            this.setState({
                temperature: data.data[0].temperature,
                humidity: data.data[0].humidity,
                time: data.data[0].time,
                dustDensity: data.data[0].dustDensity,
                loading: false,
            })
        }).catch((err: any) => {
            console.log(err);
        });
        this.intervalInitial = window.setInterval(() => {
            getDataRealTime().then((data: any) => {
                if (data.data[0].temperature > 50) {
                    message.warning('Nhiệt độ quá cao! Hãy kiểm tra lại!', 10);
                }
                this.setState({
                    temperature: data.data[0].temperature,
                    humidity: data.data[0].humidity,
                    time: data.data[0].time,
                    dustDensity: data.data[0].dustDensity,
                })
            }).catch((err: any) => {
                console.log(err);
            });
        }
            , 15000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalInitial);
    }

    render() {
        return (
            <div className="box box-default mb-4">
                <Spin spinning={this.state.loading}>
                    <div className="box-header">
                        <span>Tổng quan</span>
                        <span style={{ float: 'right' }}>{moment(this.state.time * 1000).format('HH:mm DD/MM/YYYY')}</span>
                    </div>
                    <div className="box-body">
                        <div style={{ paddingLeft: 30, fontSize: 'initial' }}>
                            <div style={{ display: "list-item", }}>Nhiệt độ: {this.state.temperature} &deg;C</div>
                            <div style={{ display: "list-item" }}>Độ ẩm: {this.state.humidity} %</div>
                            <div style={{ display: "list-item" }}>Độ bụi: {this.state.dustDensity} mg/m3</div>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default SensorInfor;