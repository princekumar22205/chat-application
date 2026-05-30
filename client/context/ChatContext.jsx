import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";



export const ChatContext = createContext();

export const ChatProvider = ({Children})=>{

    const [messages, setMessages] = useState([]); 
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseeenMessages] = useState({});

    const {socket,axios} = useContext(AuthContext);

    //function to get all users for sidebar
    const getUsers = async()=>{
        try {
            const {data} = await axios.get("/api/message/users");
            if(data.success){
                setUsers(data.users)
                setUnseeenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.messsage)
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
            const {data} =await axios.post(`/api/messages/send/${selectedUser._id}`,messaageData);
            if(data.success){
                setMessages((prevMessage)=[...prevMessage, data.newMessage])
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to subscribe to message for selected user
    const subscribeToMessage = async(){
        if(!socket) return;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessage)=>[...prevMessage,newMessage]);
                axios.put(`/api/message/mark/$newMessage._id`);
            }else{
                setUnseeenMessages((prevUnseenMessage)=>({
                    ...prevUnseenMessage, [newMessage.senderId]: prevUnseenMessage[newMessage.senderId] ? prevUnseenMessage[newMessage.senderId]+1 : 1
                }))
            }
        })
    }

    const value = {

    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}