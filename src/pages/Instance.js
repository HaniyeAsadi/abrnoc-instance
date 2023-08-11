import * as React from 'react';
import Sidebar from "../components/Sidebar";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material//Badge';
import Box from '@mui/material/Box';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './Instance.css';
import axios from "axios";

const drawerWidth = 220;

const Instances = () => {
  React.useEffect(() => {
    axios.get('https://assignment.abrnoc.com/regions')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  return ( 
    <div style={{display: 'flex'}}>
      <Sidebar />
      <div style={{flex: 1 , overflowY: 'auto'}}>
        <AppBar
          position="fixed"
          sx={{ 
            width: `calc(100% - ${drawerWidth}px)`, 
            ml: `${drawerWidth}px`, 
            backgroundColor: '#FFFF', 
            color: 'black', 
            boxShadow: 'none' 
          }}  
        >
          <Toolbar>
            <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Grid item>
                <Typography variant="h5">
                  New instance
                </Typography>
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={8}>
                <Grid container spacing={4} style={{alignItems: 'center'}} >
                  <Grid item lg={1} md={1} sm={1} xs={1}>
                    <IconButton title="notifications" >
                      <Badge color="error" overlap="circular" size="large" variant="dot">
                        <NotificationsNoneOutlinedIcon style={{color: 'black', fontSize: '30px'}}/>
                      </Badge>
                    </IconButton>
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={9}>
                    <Box className="toolbar-box">
                      <IconButton title="Add to wallet">
                        <AddOutlinedIcon />
                      </IconButton>
                      <Typography variant="h6" style={{fontWeight: "600"}}>
                        $125
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={0.5} xs={0.5}>
                    <Divider 
                      orientation="vertical" 
                      sx={{
                        height: 30
                      }}  
                    />
                  </Grid>
                  <Grid item lg={1} md={1} sm={1} xs={1} style={{ marginLeft: '-20px'}}>
                    <IconButton title="Profile">
                      <AccountCircleOutlinedIcon style={{color: 'black', fontSize: '30px'}}/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          <Divider />
        </AppBar>
      </div>
    </div>
  );
}
 
export default Instances;