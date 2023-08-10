import * as React from 'react';
import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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
import HeadsetOutlinedIcon from '@mui/icons-material/HeadsetOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import '../App.css';

const drawerWidth = 220;

const Sidebar = () =>{
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
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
        sx={{
          width: drawerWidth,
          height: '50vh',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        className='drawer-content'
      >
        <Toolbar>
          <img className='logo' src="/cloudzy.png" alt="Cloudzy"></img>
        </Toolbar>
        <Divider />
        <List>
          <Link to="/dashboard" className='navigate'>
            <Box 
              className={location.pathname === "/dashboard" ? "sidebar-item clicked-item" : "sidebar-item"}
            >
              <Grid container spacing={2} className='grid-container '>
                <Grid item md={2} sm={2} xs={2}>
                  <DashboardOutlinedIcon />
                </Grid>
                <Grid item md={8} sm={8} xs={8}>
                  Dashboard
                </Grid>
              </Grid>
            </Box>
          </Link>
          <Link to="/instances" className='navigate'>
            <Box 
              className={location.pathname === "/instances" ? "sidebar-item clicked-item" : "sidebar-item"}
            >
              <Grid container spacing={2} className='grid-container '>
                <Grid item md={2} sm={2} xs={2}>
                  <AddBoxOutlinedIcon />
                </Grid>
                <Grid item md={8} sm={8} xs={8}>
                  Instances
                </Grid>
              </Grid>
            </Box>
          </Link>
          <Link to="/snapshots" className='navigate'>
            <Box 
              className={location.pathname === "/snapshots" ? "sidebar-item clicked-item" : "sidebar-item"}
            >
              <Grid container spacing={2} className='grid-container '>
                <Grid item md={2} sm={2} xs={2}>
                  <ContentCopyOutlinedIcon />
                </Grid>
                <Grid item md={8} sm={8} xs={8}>
                  Snapshots
                </Grid>
              </Grid>
            </Box>
          </Link>
          <Link to="/sshkeys" className='navigate'>
            <Box 
              className={location.pathname === "/sshkeys" ? "sidebar-item clicked-item" : "sidebar-item"}
            >
              <Grid container spacing={2} className='grid-container '>
                <Grid item md={2} sm={2} xs={2}>
                  <VpnKeyOutlinedIcon />
                </Grid>
                <Grid item md={8} sm={8} xs={8}>
                  SSH Keys
                </Grid>
              </Grid>
            </Box>
          </Link>
        </List>
        <Divider style={{marginTop: '50px'}}/>
        <List>
          <ListItem className='listItems' >
            <AttachMoneyOutlinedIcon id="expandButtonItem" />
            <ListItemText primary={"Billing"} className='text'/>
            <IconButton onClick={handleOpen}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          {open ? (
            <Collapse className='collapse-menu' in={open} timeout="auto" unmountOnExit >
              <Link to="/bill" className='navigate'>
                <Box 
                  className={location.pathname === "/bill" ? "sidebar-item clicked-item" : "sidebar-item"}
                >
                  <Grid container spacing={2} className='grid-container '>
                    <Grid item md={2} sm={2} xs={2}>
                      <AttachMoneyOutlinedIcon />
                    </Grid>
                    <Grid item md={8} sm={8} xs={8}>
                      Bill
                    </Grid>
                  </Grid>
                </Box>
              </Link>
            </Collapse>
          ) : null}
          <Link to="/networking" className='navigate'>
            <Box 
              className={location.pathname === "/networking" ? "sidebar-item clicked-item" : "sidebar-item"}
            >
              <Grid container spacing={2} className='grid-container '>
                <Grid item md={2} sm={2} xs={2}>
                  <WifiOutlinedIcon />
                </Grid>
                <Grid item md={8} sm={8} xs={8}>
                  Networking
                </Grid>
              </Grid>
            </Box>
          </Link>
          <Link to="/report" className='navigate'>
            <Box 
              className={location.pathname === "/report" ? "sidebar-item clicked-item" : "sidebar-item"}
            >
              <Grid container spacing={2} className='grid-container '>
                <Grid item md={2} sm={2} xs={2}>
                  <AssessmentOutlinedIcon />
                </Grid>
                <Grid item md={8} sm={8} xs={8}>
                  Report
                </Grid>
              </Grid>
            </Box>
          </Link>
        </List>
        <div className="sidebar-boxes">
          <Box className="box">
            <Grid container spacing={2} className='grid-container'>
              <Grid item md={2} sm={2} xs={2}>
                <HeadsetOutlinedIcon />
              </Grid>
              <Grid item md={7} sm={8} xs={8}>
                Support
              </Grid>
            </Grid>
          </Box>
          <Box className="box">
            <Grid container spacing={2} className='grid-container'>
              <Grid item md={2} sm={2} xs={2}>
                <HelpOutlineOutlinedIcon />
              </Grid>
              <Grid item md={7} sm={8} xs={8}>
                Help
              </Grid>
            </Grid>
          </Box>
        </div>
      </Drawer>
    </Box>
  );
}
export default Sidebar;