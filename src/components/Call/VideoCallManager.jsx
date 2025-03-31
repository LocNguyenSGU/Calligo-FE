import React, { useState } from "react";
import VideoCall from "./VideoCall";

const VideoCallManager = ({ userId, partnerId, stream }) => {
    const [isCalling, setIsCalling] = useState(false);

    const startCall = () => {
        setIsCalling(true);
    };

    const endCall = () => {
        setIsCalling(false);
    };

    return (
        <div>
            <button onClick={startCall}>📞 Bắt đầu cuộc gọi</button>

            {isCalling && (
                <VideoCall
                    stream={stream}
                    userId={userId}
                    partnerId={partnerId}
                    onEndCall={endCall} // Callback để kết thúc cuộc gọi
                />
            )}
        </div>
    );
};

export default VideoCallManager;