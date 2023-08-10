import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import './Sidebar.css';
import '../App.css';

const drawerWidth = 220;

export default function PermanentDrawerLeft() {
  React.useEffect(() => {
    axios.get('https://assignment.abrnoc.com/regions')
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        // className="App-header"
        // sx={{
        //     width: drawerWidth
        // }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img className='logo' src="/cloudzy.png"></img>
        </Toolbar>
        <Divider />
        <List>
            <ListItemButton className='listItems'>
                <ListItem>
                    <DashboardOutlinedIcon />
                    <ListItemText primary={"Dashboard"} className='text'/>
                </ListItem>
            </ListItemButton>
            <ListItemButton  className='listItems'>
                <ListItem>
                    <AddBoxOutlinedIcon />
                    <ListItemText primary={"Instances"} className='text'/>
                </ListItem>
            </ListItemButton>
            <ListItemButton className='listItems'>
                <ListItem>
                    <ContentCopyOutlinedIcon />
                    <ListItemText primary={"Snapshots"} className='text'/>
                </ListItem>
            </ListItemButton>
            <ListItemButton className='listItems'>
                <ListItem>
                    <VpnKeyOutlinedIcon />
                    <ListItemText primary={"SSH Keys"} className='text'/>
                </ListItem>
            </ListItemButton>
        </List>
        <Divider />
        <List>
            {/* <ListItemButton onClick={handleOpen} className='listItems'> */}
                <ListItem className='listItems' >
                    <AttachMoneyOutlinedIcon id="expandButtonItem" />
                    <ListItemText primary={"Billing"} className='text'/>
                    <IconButton onClick={handleOpen}>
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItem>
            {/* </ListItemButton> */}
            {open ? (
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <List disablePadding>
                  <ListItemButton >
                      <ListItemIcon>
                          <AttachMoneyOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Bill" />
                  </ListItemButton>
                  </List>
              </Collapse>
            ) : null
            }
            <ListItemButton className='listItems'>
                <ListItem>
                    <WifiOutlinedIcon />
                    <ListItemText primary={"Networking"} className='text'/>
                </ListItem>
            </ListItemButton>
            <ListItemButton className='listItems'>
                <ListItem>
                    <AssessmentOutlinedIcon />
                    <ListItemText primary={"Report"} className='text'/>
                </ListItem>
            </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}