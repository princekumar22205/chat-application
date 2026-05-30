import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";



export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages, setMessages] = useState([]); 
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket,axios} = useContext(AuthContext);

    //function to get all users for sidebar
    const getUsers = async()=>{
        try {
            const {data} = await axios.get("/api/message/users");
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to get messages for selected user
    const getMessages = async(userId)=>{
        try {
            const {data} =await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to send message to selected user
    const sendMessages = async(messageData)=>{
        try {
            const {data} =await axios.post(`/api/messages/send/${selectedUser._id}`,messageData);
            if(data.success){
                setMessages((prevMessage)=>[...prevMessage, data.newMessage])
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //**** function to subscribe to message for selected user
    // it create a listner for message which listen to new message as the new message occur it show according to the chat has open if the message came from the same user then it update state and if not then it update the unseen messages count.
    const subscribeToMessage = async()=>{
        if(!socket) return;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessage)=>[...prevMessage,newMessage]);
                axios.put(`/api/message/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessage)=>({
                    ...prevUnseenMessage, [newMessage.senderId]: prevUnseenMessage[newMessage.senderId] ? prevUnseenMessage[newMessage.senderId]+1 : 1
                }))
            }
        })
    }

    //function to unsubscribe from message
    // it actually help in removing the listener to message so that multilple listner not exist for the same message, without it show bug like receving the same message multiple times.
    const unsubscribeFromMessage = ()=>{
        if(socket) socket.off("newMessage");
    }

    //when the socket or selected user changes first it remove the existing listner then create a new one. example like the user have open the chat of rahul and then switch to aman chat as the selected user changes it remove the previous one and then create a new one for aman's chat
    useEffect(()=>{
        subscribeToMessage();
        return ()=>unsubscribeFromMessage();
    },[socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        sendMessages,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}