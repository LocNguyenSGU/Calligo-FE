import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import websocketCallService from "../../services/websocketCallService";

const VideoCall = ({ stream, userId, partnerId, onEndCall }) => {
    const [peer, setPeer] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (stream) {
            myVideoRef.current.srcObject = stream;
        }

        websocketCallService.connect((client) => {
            client.subscribe(`/user/${userId}/queue/call`, (message) => {
                const data = JSON.parse(message.body);
                handleIncomingSignal(data);
            });
        });

        return () => {
            if (peer) peer.destroy(); // Cleanup khi đóng component
        };
    }, [stream, userId]);

    const handleIncomingSignal = (data) => {
        if (data.type === "offer") {
            setIncomingCall(data); // Lưu thông tin cuộc gọi
        } else if (data.type === "answer" && peer) {
            peer.signal(data.sdp);
        } else if (data.type === "ice-candidate" && peer) {
            peer.signal(data.candidate);
        }
    };

    const startCall = () => {
        const newPeer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        newPeer.on("signal", (data) => {
            websocketCallService.callUser(partnerId, { type: "offer", sdp: data, from: userId });
        });

        newPeer.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
        });

        setPeer(newPeer);
    };

    const acceptCall = () => {
        if (!incomingCall) return;

        setCallAccepted(true);

        const newPeer = new Peer({
            initiator: false, // Người nhận cuộc gọi
            trickle: false,
            stream: stream,
        });

        newPeer.on("signal", (data) => {
            websocketCallService.callUser(incomingCall.from, { type: "answer", sdp: data });
        });

        newPeer.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
        });

        newPeer.signal(incomingCall.sdp); // Nhận tín hiệu từ người gọi

        setPeer(newPeer);
        setIncomingCall(null); // Ẩn popup
    };

    const endCall = () => {
        if (peer) peer.destroy();
        setPeer(null);
        setCallAccepted(false);
        onEndCall();
    };

    return (
        <>
            {/* Hiển thị popup khi có cuộc gọi đến */}
            {incomingCall && !callAccepted && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                        <p className="text-lg font-semibold">📞 {incomingCall.from} đang gọi...</p>
                        <div className="mt-4 flex gap-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={acceptCall}>
                                ✅ Chấp nhận
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setIncomingCall(null)}>
                                ❌ Từ chối
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hiển thị giao diện cuộc gọi nếu đã chấp nhận */}
            {callAccepted && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex flex-col items-center relative">
                        <video ref={myVideoRef} autoPlay playsInline className="w-full h-64 rounded-lg mb-4" />
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-64 rounded-lg mb-4" />

                        <button onClick={endCall} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
                            ❌ Kết thúc
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoCall;