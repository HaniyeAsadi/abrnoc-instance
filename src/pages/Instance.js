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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 220;

const Instances = () => {
  const [userData, setUserData] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState("Germany");
  const [planData, setPlanData] = React.useState([]);
  const [selectedPlan, setSelectedPlan] = React.useState({});
  const [operatingSystems, setOperatingSystems] = React.useState([]);
  const [selectedOS, setSelectedOS] = React.useState([]);
  const [selectedOSVersion, setSelectedOSVersion] = React.useState([]);
  const [hostsNames, setHostsNames] = React.useState([]);
  const [enableIPv4, setEnableIPv4] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [cost, setCost] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");

  const handleChangeRegion = (region) => {
    setSelectedRegion(region);
  };

  const handleChangePlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleChangeSelectedOS = (os) => {
    setSelectedOS(os);
  };

  const handleOSVersion = (os, version) => {
    setSelectedOS(os);
    setSelectedOSVersion(version);
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

  const handleEnableIPv4 = () => {
    setEnableIPv4(!enableIPv4);
  }

  const handleChangeHostName = (e, index) => {
    const updatedNames = [...hostsNames];
    updatedNames[index] = e.target.value;
    setHostsNames(updatedNames);
  };

  const handleDeploy = () => {
    console.log("Deploy information");
    const deployInfo = {};
    deployInfo.region = selectedRegion;
    deployInfo.plan = selectedPlan;
    deployInfo.OS = selectedOS;
    deployInfo.hostNames = hostsNames;
    deployInfo.option = enableIPv4 ? "Enable IPv4" : "Disable IPv4";
    deployInfo.instance_quantity = quantity;
    deployInfo.total_cost = cost;
    console.log(deployInfo);
    setAlertMessage("Deployed successfully!");
    setAlertSeverity("success");
  };
  
  React.useEffect(() => {
    axios.get('https://assignment.abrnoc.com/user-info')
    .then((response) => {
      setUserData(response.data);
    })
    .catch((error) => {
      setAlertMessage("An error occured. Please try again later.");
      setAlertSeverity("error");
      console.log(error);
    });

    axios.get('https://assignment.abrnoc.com/regions')
    .then((response) => {
      const pairs = response.data.map( region => ({
        name: region.name === "US" ? "United States" : region.name,
        code: region.name === "US" ? countryList.getCode("United states of america") : countryList.getCode(region.name),
        city: (() => {
          if(region.name === "US") {
            return "LA";
          } else if (region.name === "Germany") {
            return "Frankfurt";
          } else if (region.name === "Japan") {
            return "Tokyo";
          } else if (region.name === "Spain") {
            return "Madrid";
          }
        })()
      }));
      setRegions(pairs);
    })
    .catch((error) => {
      setAlertMessage("An error occured. Please try again later.");
      setAlertSeverity("error");
      console.log(error);
    });

    axios.get(`https://assignment.abrnoc.com/operating_systems`)
    .then((response) => {
      const groupedByFamily = Object.values(
        response.data.reduce((acc, os) => {
          const { family, version } = os;
          if(!acc[family]) {
            acc[family] = { family, versions: [] };
          }
          acc[family].versions.push(version);
          return acc;
        }, {})
      );

      setSelectedOS(groupedByFamily[0]);
      setSelectedOSVersion(groupedByFamily[0].versions[0]);
      setOperatingSystems(groupedByFamily);
    })
    .catch((error) => {
      setAlertMessage("An error occured. Please try again later.");
      setAlertSeverity("error");
      console.log(error);
    });

    axios.get(`https://assignment.abrnoc.com/plans?region=${selectedRegion}`)
    .then((response) => {
      setPlanData(response.data);
      setSelectedPlan(response.data[0]);
      setCost(parseFloat(response.data[0].monthly_price) * quantity);
    })
    .catch((error) => {
      setAlertMessage("An error occured. Please try again later.");
      setAlertSeverity("error");
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
    let region = selectedRegion;
    if(region === "United States"){
      region = "US";
    }
    axios.get(`https://assignment.abrnoc.com/plans?region=${region}`)
    .then((response) => {
      setPlanData(response.data);
    })
    .catch((error) => {
      setAlertMessage("An error occured. Please try again later.");
      setAlertSeverity("error");
      console.log(error);
    });
  }, [selectedRegion]);

  React.useEffect(() => {
    setSelectedPlan(planData[0]);
  }, [planData]);
  
  React.useEffect(() => {
    if(selectedPlan && Object.keys(selectedPlan).length !== 0){
      setCost((parseFloat(selectedPlan.monthly_price) * quantity).toFixed(2));
    }
  }, [quantity, selectedPlan]);

  React.useEffect(() => {
    const country = regions.find(region => region.name === selectedRegion);
    let baseHostName = "";

    if(country && Object.keys(country).length !== 0 && selectedPlan && Object.keys(selectedPlan).length !== 0){
      baseHostName = selectedOS.family + "-" + country.code + "-" + country.city + "-" + selectedPlan.memory_size_in_GB + "gb";
    };

    const newHostsNames = [baseHostName];

    for (let i = 1; i < quantity; i++) {
      const name = baseHostName + "-" + i;
      newHostsNames.push(name);
    }
    setHostsNames(newHostsNames);
  }, [selectedRegion, selectedOS, selectedPlan, quantity]);

  React.useEffect(() => {
    if(alertMessage !== "" && alertSeverity !== ""){
      if(alertSeverity ==="success"){
        toast.success(alertMessage, {
          position: toast.POSITION.TOP_RIGHT,
          title: "Success",
          autoClose: 5000, 
          pauseOnHover: false
        });
      } else{
        toast.error(alertMessage, {
          position: toast.POSITION.TOP_RIGHT,
          title: "Error",
          autoClose: 5000,
          pauseOnHover: false
        });
      }
      setAlertMessage("");
      setAlertSeverity("");
    }
  }, [alertMessage, alertSeverity]);

  return ( 
    <div style={{display: 'flex'}}>
      <Sidebar />
      <div style={{flex: 1 }}>
        <ToastContainer />
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
            <Grid container spacing={2} 
              sx={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}
            >
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
                        <NotificationsNoneOutlinedIcon className='toolbar-icon'/>
                      </Badge>
                    </IconButton>
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={9}>
                    <Box className="toolbar-box">
                      <IconButton title="Add to wallet">
                        <AddOutlinedIcon />
                      </IconButton>
                      <Typography variant="h6" className='balance'>
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
                      <AccountCircleOutlinedIcon className='toolbar-icon'/>
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
                <Typography variant='h6' className='title'>
                  Region
                </Typography>              
                <Grid item container spacing={3}>
                  {regions.length > 0 && regions.map((region, index) => (
                    <Grid item lg={4} md={6} sm={6} key={index}> 
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
                <Typography variant='h6' className='title'>
                  Plan
                </Typography> 
                <TableContainer className='table-container'>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width:"2px"}}></TableCell>
                        <TableCell>CPU</TableCell>
                        <TableCell>Memory</TableCell>
                        <TableCell>Connection speed</TableCell>
                        <TableCell>Monthly price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {planData.map((plan, index) =>
                        <TableRow key={index} onClick={() => handleChangePlan(plan)}>
                          <TableCell >
                            <Checkbox
                              className='table-icons'
                              icon={<RadioButtonUncheckedIcon />}
                              checked={plan.id === selectedPlan.id}
                              checkedIcon={plan.id === selectedPlan.id ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                            />
                          </TableCell>
                          <TableCell>{plan.cpu_cores + " CPU"}</TableCell>
                          <TableCell>{plan.memory_size_in_GB + " GB"}</TableCell>
                          <TableCell>{"Up to " + plan.connection_up_bound_speed + " Gbps"}</TableCell>
                          <TableCell className='table-cell'>
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
                <Typography variant='h6' className='title'>
                  Operating System
                </Typography> 
                <Grid item container spacing={3}>
                  {operatingSystems.length > 0 && operatingSystems.map((os, index) => (
                    <Grid item lg={4} md={6} sm={6} key={index}> 
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
                            className='select-field'
                            onChange={(event) => handleOSVersion(os, event.target.value)}
                        >
                            <MenuItem value="select" disabled>
                                <em>Select version</em>
                            </MenuItem>
                            {os.versions.map((version, index) => (
                              <MenuItem key={index} value={version}>
                                {version}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant='h6' className='title'>
                  Hostname
                </Typography> 
                <Grid item container spacing={2}>
                  {hostsNames.length > 0 && hostsNames.map((name, index) => (
                    <Grid item lg={6} md={6} sm={6} key={index}> 
                      <TextField 
                        style={{width: '100%'}}
                        value={name}
                        onChange={(e) => handleChangeHostName(e, index)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
            <Grid item md={4} >
              <div className="inside" style={{position: 'sticky', top: '10%'}}>
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
                    <Grid item lg={1.5}>
                      <Divider orientation="vertical" className='quantity-box' />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} id='quantity-number'>
                      {quantity}
                    </Grid>
                    <Grid item lg={2}>
                      <Divider orientation="vertical" className='quantity-box'/>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} style={{marginLeft: "-20px"}}>
                      <IconButton onClick={handleAdd}>
                        <AddOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
                <div className='deploy-option'>
                  <Checkbox 
                    checked={enableIPv4} 
                    onClick={handleEnableIPv4}
                    sx={{'&.Mui-checked': {
                      color: "#00cd82"
                    }}}
                  />
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
                    <span id='scale'>
                      &nbsp;/month
                    </span>
                  </Typography>
                </div>
                <Button variant='contained' className='deploy-button' onClick={handleDeploy}>
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