import React, { Component } from 'react';

export class CameraFeed extends Component {


    state = {
        showVideo: false,
    }
    stream;
    hideResult = this.props?.hideResult ? this.props.hideResult : false;
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log({device});
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
        this.stream = stream;
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
        setTimeout(() => {
            this.setState({showVideo: true});
        }, 1000);
    }
    getDimensions() {
        const feedHolder = document.getElementById('feed_holder');
        const width = feedHolder?.offsetWidth ? (feedHolder?.offsetWidth - 20) : 300;
        return {
            width: width,
            height: Math.round(width * 0.75),
        };
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    takePhoto = () => {
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, this.getDimensions().width, this.getDimensions().height);
        this.canvas.toBlob(sendFile);

        // this.videoPlayer.pause();
        // // navigator.mediaDevices
        // this.stream.getTracks()[0].stop();
    };
    

    render() {
        return (
            <div className="c-camera-feed" id="feed_holder">
                <div className="c-camera-feed__viewer">
                    {
                        this.state.showVideo ?
                        <video ref={ref => (this.videoPlayer = ref)} width={this.getDimensions().width} height={this.getDimensions().height} /> :
                        <video ref={ref => (this.videoPlayer = ref)} style={{opacity: 0}} width={this.getDimensions().width} height={this.getDimensions().height} />
                    }
                </div>
                <button type='button' onClick={this.takePhoto}>Take photo!</button>
                <div className={"c-camera-feed__stage" + (this.hideResult ? ' full-hidden' : '')}>
                    <canvas width={this.getDimensions().width} height={this.getDimensions().height} ref={ref => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}