import { ZoomMtg } from "@zoomus/websdk";
import React, { Component } from "react";


export class ZoomComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            meetingConfig: {
                meetingNumber: '<meetingNumber>',
                apiKey: '<apiKey>',
                apiSecret: '<apiSecret>',
                role: 1,
                passWord: '<password>',
                userName: '<username>'
            }
        }
    }

    async componentDidMount() {
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        this.launchMeeting();
    }


    render() {
        return (
            <>
            </>
        )
    }

    launchMeeting = () => {

        const { meetingConfig } = this.state;

        ZoomMtg.generateSignature({
            meetingNumber: meetingConfig.meetingNumber,
            apiKey: meetingConfig.apiKey,
            apiSecret: meetingConfig.apiSecret,
            role: meetingConfig.role,
            success(res) {
                console.log('signature', res.result);
                ZoomMtg.init({
                    leaveUrl: 'http://www.zoom.us',
                    success() {
                        ZoomMtg.join(
                            {
                                meetingNumber: meetingConfig.meetingNumber,
                                userName: meetingConfig.userName,
                                signature: res.result,
                                apiKey: meetingConfig.apiKey,
                                userEmail: 'nd.proboda@gmail.com',
                                passWord: meetingConfig.passWord,
                                success() {
                                    console.log('join meeting success');
                                },
                                error(res) {
                                    console.log(res);
                                }
                            }
                        );
                    },
                    error(res) {
                        console.log(res);
                    }
                });
            }
        });
    }
}

export default ZoomComponent;