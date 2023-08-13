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
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "1rem",
    minWidth: "275"
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
const drawerWidth = 220;

const Instances = () => {
  const classes = useStyles();
  const [userData, setUserData] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState("Germany");
  const [planData, setPlanData] = React.useState([]);
  const [selectedPlan, setSelectedPlan] = React.useState({});
  const [operatingSystems, setOperatingSystems] = React.useState([]);
  const [selectedOS, setSelectedOS] = React.useState([]);
  const [selectedOSVersion, setSelectedOSVersion] = React.useState([]);
  const [hostsNames, setHostsNames] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);
  const [cost, setCost] = React.useState("");

  const handleChangeRegion = (region) => {
    setSelectedRegion(region);
  };

  const handleChangePlan = (plan) => {
    setSelectedPlan(plan);
    console.log(plan);
  };

  const handleChangeSelectedOS = (os) => {
    setSelectedOS(os);
  };

  const handleOSVersion = (os, version) => {
    setSelectedOS(os);
    setSelectedOSVersion(version);
    console.log(version);
  };

  const handleSubtract = () => {
    const num = parseInt(quantity);
    if(num !== 1) {
      setQuantity(num - 1);
    }
  };

  const handleAdd = () => {
    const num = parseInt(quantity);
    if(num !== 10){
      setQuantity(num + 1);
    }
  };
  
  React.useEffect(() => {
    axios.get('https://assignment.abrnoc.com/user-info')
    .then((response) => {
      setUserData(response.data);
    })
    .catch((error) => 
      console.log(error)
    );

    axios.get('https://assignment.abrnoc.com/regions')
    .then((response) => {
      // console.log(response.data);
      const pairs = response.data.map(region => ({
        name: region.name === "US" ? "United States" : region.name,
        code: region.name === "US" ? countryList.getCode("United states of america") : countryList.getCode(region.name)
      }));
      // console.log(pairs);
      // pairs.sort((a, b) => a.code.localeCompare(b.code));
      setRegions(pairs);
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get(`https://assignment.abrnoc.com/operating_systems`)
    .then((response) => {
      // setOperatingSystems(response.data);
      // console.log(response.data);
      const groupedByFamily = Object.values(
        response.data.reduce((acc, os) => {
          const { family, version } = os;
          if (!acc[family]) {
            acc[family] = { family, versions: [] };
          }
          acc[family].versions.push(version);
          return acc;
        }, {})
      );
      setSelectedOS(groupedByFamily[0]);
      setSelectedOSVersion(groupedByFamily[0].versions[0]);
      setOperatingSystems(groupedByFamily);
      
      // console.log(groupedByFamily);
    })
    .catch(error => console.log(error));

    axios.get(`https://assignment.abrnoc.com/plans?region=${selectedRegion}`)
    .then((response) => {
      setPlanData(response.data);
      setSelectedPlan(response.data[0]);
      setCost(parseFloat(response.data[0].monthly_price) * quantity);
      console.log(parseFloat(response.data[0].monthly_price) * quantity);
    })
    .catch(error => console.log(error));
  }, []);

  React.useEffect(() => {
    let region = selectedRegion;
    if(region === "United States"){
      region = "US";
    }
    axios.get(`https://assignment.abrnoc.com/plans?region=${region}`)
    .then((response) => {
      setPlanData(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }, [selectedRegion]);

  React.useEffect(() => {
    setSelectedPlan(planData[0]);
    console.log(planData);
  }, [planData]);
  
  React.useEffect(() => {
    if(selectedPlan && Object.keys(selectedPlan).length !== 0){

      console.log(selectedPlan);
      console.log(selectedPlan.monthly_price);
      setCost((parseFloat(selectedPlan.monthly_price) * quantity).toFixed(2));
    }
  }, [quantity, selectedPlan]);

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
            <Grid item md={8}  
            >
              <div className="inside">
                <Typography variant='h6' fontWeight="500" className='title'>
                  Region
                </Typography>              
                <Grid item container spacing={3}>
                  {regions.length > 0 && regions.map((region) => (
                    <Grid item lg={4} md={6} sm={6}> 
                      <Box 
                        className={selectedRegion === region.name ? "item-box selected-item"  : "item-box"} 
                        onClick={() => handleChangeRegion(region.name)}
                      >
                        <Grid container spacing={2} className='item-box-grid'>
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
                    </Grid>
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
                        {/* <TableCell>Storage</TableCell> */}
                        <TableCell>Connection speed</TableCell>
                        <TableCell>Monthly price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {planData.map((plan) =>
                        <TableRow onClick={() => handleChangePlan(plan)}>
                          <TableCell style={{ width:"2px"}}>
                            <Checkbox
                              className='table-icons'
                              icon={<RadioButtonUncheckedIcon />}
                              checked={plan.id === selectedPlan.id}
                              checkedIcon={plan.id === selectedPlan.id ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                            />
                          </TableCell>
                          <TableCell>{plan.cpu_cores + " CPU"}</TableCell>
                          <TableCell>{plan.memory_size_in_GB + " GB"}</TableCell>
                          {/* <TableCell>Storage</TableCell> */}
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
                <Typography variant='h6' fontWeight="500" className='title'>
                  Operating System
                </Typography> 
                <Grid item container spacing={3}>
                  {operatingSystems.length > 0 && operatingSystems.map((os) => (
                    <Grid item lg={4} md={6} sm={6}> 
                      <Box 
                        className={selectedOS === os ? "item-box selected-item" : "item-box"} 
                        onClick={() => handleChangeSelectedOS(os)}
                      >
                        <Grid container spacing={2} className='item-box-grid'>
                          <Grid item lg={3} md={3} sm={2} className='item'>
                            <img className='os-image'
                              src={`/${os.family}.png`}
                            />                          
                          </Grid>
                          <Grid item lg={8} md={8} sm={10}>
                            <p style={{fontWeight: '600'}}>{os.family}</p>
                          </Grid>
                        </Grid>
                        <TextField
                            select
                            variant="outlined"
                            value={selectedOS === os ? selectedOSVersion : "select"}
                            style={{width: '90%', margin: '20px auto 15px'}}
                            onChange={(event) => handleOSVersion(os, event.target.value)}
                        >
                            <MenuItem value="select" disabled style={{ color: 'gray'}}>
                                <em>Select version</em>
                            </MenuItem>
                            {os.versions.map((version) => (
                              <MenuItem key={version} value={version}>
                                {version}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant='h6' fontWeight="500" className='title'>
                  Hostname
                </Typography> 
                <Grid item container spacing={2}>
                  {operatingSystems.length > 0 && operatingSystems.map((os) => (
                    <Grid item lg={6} md={6} sm={6}> 
                      <TextField style={{width: '100%'}}
                        value="dskmfkljsl"
                      />
                    </Grid>
                  ))}
                </Grid>

              </div>
            </Grid>
            <Grid item md={4} className={classes.root} elevation={100}>
              <div className="inside">
                <Typography className='title'>
                  Instance quantity:
                </Typography>
                <Box className="item-box">
                  <Grid container spacing={3}>
                    <Grid item lg={1} md={1} sm={1}>
                      <IconButton onClick={handleSubtract}>
                        <RemoveOutlinedIcon />
                      </IconButton>
                    </Grid>
                    {/* <Divider 
                      orientation="vertical" 
                      sx={{
                        height: 30
                      }} 
                    /> */}
                    <Grid item lg={9} md={1} sm={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                      {quantity}
                    </Grid>
                    <Grid item lg={1} md={1} sm={1}>
                      <IconButton onClick={handleAdd}>
                        <AddOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
                <div className='deploy-option'>
                  <Checkbox />
                  <Typography>
                    Enable IPv4
                  </Typography>
                </div>
                <Divider style={{width: '100%'}} />
                <div className="cost">
                  <Typography variant='h6' fontWeight="600">
                    Total
                  </Typography>
                  <Typography variant='h5' fontWeight="600">
                    $ {cost}
                    <span style={{color: "#aab3af", fontWeight:'400', fontSize: "20px"}}>
                      &nbsp;/month
                    </span>
                  </Typography>
                </div>
                <Button variant='contained' className='deploy-button'>
                    Deploy now
                </Button>
              </div>
            </Grid>
          </Grid>          
        </div>
      </div>
    </div>
  );
}
 
export default Instances;