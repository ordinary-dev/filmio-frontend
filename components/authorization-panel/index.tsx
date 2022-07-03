import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { useState } from 'react'
import LoginPanel from './login-panel'
import RegistrationPanel from './registration-panel'

const cardStyle = {
    maxWidth: '430px',
    width: '100%',
    padding: '15px'
}

type TabPanelProps = {
    value: number
}

/** Panel with two tabs: login and register */
const AuthorizationPanel = () => {
    const [selectedTabId, setSelectedTabId] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTabId(newValue)
    }

    const TabPanel = ({ value }: TabPanelProps) => {
        return value === 0 ? <LoginPanel /> : <RegistrationPanel />
    }

    return (
        <Paper style={cardStyle} elevation={4}>
            <Stack spacing={2}>
                <Tabs onChange={handleTabChange} value={selectedTabId}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <TabPanel value={selectedTabId} />
            </Stack>
        </Paper>
    )
}

export default AuthorizationPanel
