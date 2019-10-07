import React from 'react'
import ChatBox from './components/chatBox'
import { Grid, Tab, Tabs, InputAdornment, TextField, Button } from '@material-ui/core'
import './style.scss'

function detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
        return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
    })
}
class ChatRoom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            messages: [{
                id: 1,
                sender: 'Shun',
                senderAvatar: 'https://i.pravatar.cc/150?img=32',
                message: 'Hello'
            },
            {
                id: 2,
                sender: 'Gabe',
                senderAvatar: 'https://i.pravatar.cc/150?img=56',
                message: 'Hey!'
            },
            {
                id: 3,
                sender: 'Gabe',
                senderAvatar: 'https://i.pravatar.cc/150?img=56',
                message: 'How are you?'
            },
            {
                id: 4,
                sender: 'Shun',
                senderAvatar: 'https://i.pravatar.cc/150?img=32',
                message: 'Great! It\'s been a while...'
            },
            {
                id: 5,
                sender: 'Gabe',
                senderAvatar: 'https://i.pravatar.cc/150?img=56',
                message: 'Indeed.... We\'re gonna have to fix that.'
            }
            ],
            isTyping: [],
            search: "",
        };

    }

    sendMessage = (sender, senderAvatar, message) => {
        setTimeout(() => {
            let messageFormat = detectURL(message);
            let newMessageItem = {
                id: this.state.messages.length + 1,
                sender: sender,
                senderAvatar: senderAvatar,
                message: messageFormat
            };
            this.setState({ messages: [...this.state.messages, newMessageItem] });
            this.resetTyping(sender);
        }, 400);
    }
    typing = (writer) => {
        if (!this.state.isTyping[writer]) {
            let stateTyping = this.state.isTyping;
            stateTyping[writer] = true;
            this.setState({ isTyping: stateTyping });
        }
    }
    resetTyping = (writer) => {
        let stateTyping = this.state.isTyping;
        stateTyping[writer] = false;
        this.setState({ isTyping: stateTyping });
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let users = {};
        let chatBoxes = [];
        let messages = this.state.messages;
        let isTyping = this.state.isTyping;
        let sendMessage = this.sendMessage;
        let typing = this.typing;
        let resetTyping = this.resetTyping;

        users[0] = { name: 'Shun', avatar: 'https://i.pravatar.cc/150?img=32' };
        users[1] = { name: 'Gabe', avatar: 'https://i.pravatar.cc/150?img=56' };
        Object.keys(users).map(function (key) {
            var user = users[key];
            chatBoxes.push(
                <ChatBox
                    key={key}
                    owner={user.name}
                    ownerAvatar={user.avatar}
                    sendMessage={sendMessage}
                    typing={typing}
                    resetTyping={resetTyping}
                    messages={messages}
                    isTyping={isTyping}
                />
            );
        });
        return (
            <Grid className="chatApp">
                <Grid className="chatAppLeft">
                    <TextField
                        fullWidth
                        classes={{
                            root: 'searchContact',

                        }}
                        value={this.state.search}
                        name="search"
                        onChange={this.changeHandler}
                        placeholder="Search Chat"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    className="searchContactIcon"
                                    position="end">
                                    <i className="fa fa-search"></i>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid className="chatAppRight">
                    {chatBoxes}
                </Grid>
            </Grid>
        )
    }
}
export default ChatRoom