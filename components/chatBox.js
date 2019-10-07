import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import ChatTitle from './title'
import InputMessage from './inputMessage'
import TypingIndicator from './typingIndicator'
import MessageList from './messageList'
class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false
        };
        this.sendMessageLoading = this.sendMessageLoading.bind(this);
        var timeout = null;
    }
    sendMessageLoading(sender, senderAvatar, message) {
        this.setState({ isLoading: true });
        this.props.sendMessage(sender, senderAvatar, message);
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 400);
    }
    render() {
        return (
            <Grid className="chatAppConv">
                <Grid className="chatAppHead">
                    <h3>{this.props.owner}</h3>
                </Grid>
                <MessageList
                    owner={this.props.owner}
                    messages={this.props.messages}
                />
                <Grid className="chatAppConvSendMessage">
                    <TypingIndicator
                        owner={this.props.owner}
                        isTyping={this.props.isTyping}
                    />
                    <InputMessage
                        isLoading={this.state.isLoading}
                        owner={this.props.owner}
                        ownerAvatar={this.props.ownerAvatar}
                        sendMessage={this.props.sendMessage}
                        sendMessageLoading={this.sendMessageLoading}
                        typing={this.props.typing}
                        resetTyping={this.props.resetTyping}
                    />
                </Grid>
            </Grid>
        );
    }
}
export default ChatBox