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
import countryList from 'country-list';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const drawerWidth = 220;

const Instances = () => {
  const [userData, setUserData] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState("Germany");
  const [planData, setPlanData] = React.useState([]);
  const [regionsCode, setRegionsCode] = React.useState([]);
  const countryInfo = countryList.getCode("United states of america");

  const handleChangeRegion = (region) => {
    setSelectedRegion(region);
    console.log(region);
  }
  React.useEffect(() => {
    axios.get('https://assignment.abrnoc.com/regions')
    .then((response) => {
      console.log(response.data);
      const pairs = response.data.map(region => ({
        name: region.name === "US" ? "United States" : region.name,
        code: region.name === "US" ? countryList.getCode("United states of america") : countryList.getCode(region.name)
      }));
      console.log(pairs);
      pairs.sort((a, b) => a.code.localeCompare(b.code));
      setRegions(pairs);
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(`https://assignment.abrnoc.com/plans?region=${selectedRegion}`)
    .then((response) => {
      setPlanData(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }, []);
  React.useEffect(() => {
    let region = selectedRegion;
    if(region === "United States"){
      region = "US"
    }
    axios.get(`https://assignment.abrnoc.com/plans?region=${region}`)
    .then((response) => {
      setPlanData(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }, [selectedRegion]);
  React.useEffect(() => {
    axios.get('https://assignment.abrnoc.com/user-info')
    .then((response) => {
      setUserData(response.data);
    })
    .catch((error) => 
      console.log(error)
    );
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
                        $ {userData.balance}
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
        <div className="container">
          <Grid container spacing={2} >
            <Grid item md={8}>
              <div className="inside">
                <Typography variant='h6' fontWeight="500" className='title'>
                  Region
                </Typography>              
                <Grid item container spacing={3}>
                  {regions.length > 0 && regions.map((region) => (
                    <Grid item lg={4} md={6} sm={6}> 
                      <Box 
                        className={selectedRegion === region.name ? "region-box selected-region"  : "region-box"} 
                        onClick={() => handleChangeRegion(region.name)}
                      >
                        <Grid container spacing={2} className='region-box-grid'>
                          <Grid item lg={2} md={3} sm={2} className='item'>
                            <Avatar className='flag'
                              src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${region.code.toLowerCase()}.svg`}
                            />                          
                          </Grid>
                          <Grid item lg={9} md={8} sm={10}>
                            <p style={{fontWeight: '600'}}>{region.name}</p>
                          </Grid>
                        </Grid>
                      </Box>
                    
                    {/* <p>{region.name}</p> */}
                    </Grid>
                    // <p>

                    // </p>
                  ))}
                </Grid>
                <Typography variant='h6' fontWeight="500" className='title'>
                  Plan
                </Typography> 
                <TableContainer className='table-container'>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width:"2px"}}></TableCell>
                        <TableCell>CPU</TableCell>
                        <TableCell>Memory</TableCell>
                        <TableCell>Storage</TableCell>
                        <TableCell>Connection speed</TableCell>
                        <TableCell>Monthly price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {planData.map((plan) =>
                        <TableRow>
                          <TableCell style={{ width:"2px"}}>
                            <Checkbox
                              className='table-icons'
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon />}
                            />
                          </TableCell>
                          <TableCell>{plan.cpu_cores + " CPU"}</TableCell>
                          <TableCell>{plan.memory_size_in_GB + " GB"}</TableCell>
                          <TableCell>Storage</TableCell>
                          <TableCell>{"Up to " + plan.connection_up_bound_speed + " Gbps"}</TableCell>
                          <TableCell style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {"$ " + plan.monthly_price}
                            <IconButton className='table-icons' title={plan.hourly_price + "/hour"}>
                              <InfoOutlinedIcon />

                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
            <Grid item md={4}>
              <div className="inside">
                <Typography className='title'>
                  Instance quantity:
                </Typography>
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              </div>
              {/* <p>jhkds</p> */}
            </Grid>
          </Grid>
          
          {/* <img
            style={{width: '20px', height: '20px', marginTop: '70px'}}
            src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${countryInfo.toLowerCase()}.svg`}
            // alt={selectedCountryCode}
          />
          <img
            style={{width: '20px', height: '20px', marginTop: '70px'}}
            src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${countryInfo.toLowerCase()}.svg`}
            // alt={selectedCountryCode}
          /> */}
          
        </div>
      </div>
    </div>
  );
}
 
export default Instances;