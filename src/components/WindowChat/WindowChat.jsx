/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TextArea from "antd/es/input/TextArea";
import Avatar from "../shared/Avatar";
import IconChatList from "../shared/IconChatList";
import Seperate from "../shared/Seperate";

const WindowChat = ({ src, title, isGroup = false, lastTime }) => {
    const messages = [
        { sender: "A", text: "Hello!", isMe: false },
        { sender: "B", text: "Hi there!", isMe: true },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you?", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you?", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you?", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you?", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about i am you?", isMe: true },
        { sender: "A", text: "I'm doing well too. I'm doing well too. I'm doing well too. I'm doing well too. I'm doing well too.", isMe: false },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you?", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you?", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you? 1", isMe: true },
        { sender: "A", text: "I'm doing well too.", isMe: false },
        { sender: "A", text: "How are you?", isMe: false },
        { sender: "B", text: "I'm good, thanks! How about you? 2", isMe: true },
        { sender: "A", text: "I'm doing well too. ", isMe: false },
    ];
    return (
        <div className="w-[66%] h-screen bg-gray-200">
            <div className="header-window-chat flex justify-between items-center p-3 bg-white border border-gray-200 border-t-0">
                <div className="header-info flex gap-2">
                    <Avatar src="/public/sidebar/woman.png"></Avatar>
                    <div className="flex flex-col gap-[2px]">
                        <span className="title font-medium">Nhóm báo</span>
                        {!isGroup ? <p className="info-user font-light text-sm">Đang hoạt động || Truy cập hôm qua</p>
                            :
                            <div className="flex gap-1 items-center">
                                <img src="/public/chatlist/icons8-person-64.png" className="w-4 h-4"></img>
                                <p className="info-group font-light text-sm"><span className="number-people">30</span> thành viên</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="header-action flex gap-1">
                    {isGroup && <IconChatList src="/public/chatlist/add-group.png" size="16px"></IconChatList>}
                    <IconChatList src="/public/windowchat/cam-recorder.png"></IconChatList>
                    <IconChatList src="/public/windowchat/search-interface-symbol.png" size="16px"></IconChatList>
                    <IconChatList src="/public/windowchat/separate.png"></IconChatList>
                </div>
            </div>
            <div className="body-window-chat bg-gray-200-200 max-h-[calc(100vh-165px)] overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
                <div className="pl-3 content-message overflow-auto h-calc(100vh-170px)] bg-gray-200 scrollbar-thin scrollbar-thumb-gray-400">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex mb-2 ${msg.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`flex items-start gap-2 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                                {/* Avatar */}
                                {!msg.isMe && <>
                                    <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                                        {msg.sender}
                                    </div>
                                </>
                                }
                                <div className={`block-message-recived mr-5 px-4 py-3 rounded-md max-w-[75%] text-gray-600 box-shadow-message ${msg.isMe ? 'bg-blue-100' : 'bg-white'}`}>
                                    {!msg.isMe && <>
                                        <span className="name-person-sent text-gray-700 font-light text-sm inline-block mb-1">Nguyễn Văn A</span>
                                    </>
                                    }
                                    <div className="content-message font-normal text-black text-base">
                                        {msg.text}
                                    </div>
                                    <span className="name-person-sent text-gray-700 font-light text-xs inline-block mb-1">12:32</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="block-input-message bg-white sticky bottom-0">
                <div className="action-image-file flex items-center gap-4 px-2 py-1">
                    <IconChatList size="23px" src="/public/windowchat/image-gallery.png"></IconChatList>
                    <IconChatList size="23px" src="/public/windowchat/paper.png"></IconChatList>
                </div>
                <Seperate></Seperate>
                <div className="p-2 flex items-center justify-between gap-2">
                    <div className="w-[90%]">
                        <TextArea
                            placeholder="Nhập nội dung ..."
                            autoSize={{
                                minRows: 1,
                                maxRows: 5,
                            }}
                            style={{ fontSize: '16px' }}
                        />
                    </div>
                    <div className="input-quick-emoji w-[10%] flex items-center justify-center gap-2">
                        <IconChatList size="23px" src="/public/windowchat/happy.png"></IconChatList>
                        {/* <IconChatList size="23px" src="/public/windowchat/heart-eyes_10963388.png"></IconChatList> */}
                        <IconChatList size="25px" src="/public/windowchat/paper-plane.png"></IconChatList>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default WindowChat;