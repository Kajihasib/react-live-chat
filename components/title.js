import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

const ChatTitle = ({ owner }) => {
    return (
        <Grid className="chatAppConvTitle">{owner}'s display</Grid>
    )
}
export default ChatTitle