import { useEffect, useRef, useState, useContext } from 'react'
import { 
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Menu,
  MenuItem,
  Paper, 
  Divider} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as axios from 'axios';
import { dispatch, RootState, useDispatch, useSelector, AppDispatch } from 'frontend/redux/store';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import { getKeys } from 'frontend/redux/actions/createWallet';
import { getMaticBalance } from 'frontend/redux/actions/wallet/getMaticBalance';
import { getDintBalance } from 'frontend/redux/actions/wallet/getDintBalance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import QrScanDialog from './QrScanDialog';
import SendDialog from './SendDialog';
import POLYGON_ICON from '../../assets/img/web3/matic-token.png';
import DINT_POLYGON_ICON from '../../assets/img/web3/dint-polygon-logo.png';
import DINT_LOGO from '../../assets/img/web3/dint-token.png';
import DOLLAR_ICON from '../../assets/img/icons/withdraw_icon.png';
import PLUS_ICON from '../../assets/img/icons/buy_icon.png';
import { ThemeContext } from '../../contexts/ThemeContext';
import { margin } from '@mui/system';


const DintWallet = () => {
  const theme = useTheme();
  const paymentFormRef = useRef();
  const [isQrScan, setIsQrScan] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
  const [openMatic, setOpenMatic] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [maticPrice, setMaticPrice] = useState<any>('');
  const openAnchorEl = Boolean(anchorEl);
  const { address, balance } = useSelector((rootState: RootState) => rootState.wallet);
  const { maticWallet } = useSelector((rootState: RootState) => rootState.maticBalance);
  const { name, symbol } = useSelector((rootState: RootState) => rootState.dintBalance);
  const [displayAssets , setdisplayAssets] = useState(true);
  const mobileView = useMediaQuery('(max-width:899px)');
  useEffect(() => {
    getToken();
  }, [1]);

  const getToken = async () => {
    await dispatch(getKeys());
    await axios
      .default(`${process.env.REACT_APP_COINGECKO_API}simple/price?ids=matic-network&vs_currencies=usd`)
      .then(({ data }: any) => {
        setMaticPrice(data['matic-network'].usd)
      });
    await dispatch(getMaticBalance());
    await dispatch(getDintBalance());

  }

  const openQrScan = () => {
    setIsQrScan(true);
  }

  const openSend = async () => {
    setIsSend(true);
  }

  const handleClose = () => {
    setIsQrScan(false);
    setIsSend(false);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    window.open(`${process.env.REACT_APP_POLYGON_EXPLORER}${address}`, '_blank');
    setAnchorEl(null);
  };

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  const navigate = useNavigate();
  const url = 'https://www.moonpay.com/buy/matic';

  const dintPrice = 1;

  const onWithdrawal = () => {
    navigate('/en/fiat/withdraw/EUR');
  }

  const { toggle } = useContext(ThemeContext);

  return (
    <>
    <Grid sx={{my:5}} >
      <span style={{padding:"0% 5%" , color:"#6E747A"}}>My Wallet</span>
      <Divider sx={{margin:'0%  5% 0% 0%'}} />
    </Grid>
    <Box
        id="postsListScrollableDiv"
        style={isLargeScreen ? {
          border: `1px solid #CCCCCC`,
          padding: '4%' ,
          width:'95%',
          borderRadius:"10px",
          margin:'3% 0%' , 
          // justifyContent:'flex-end'
        } : {
        margin:'auto'}}
      >
        <Box sx={isLargeScreen ? {display:"flex" , flexDirection:"column"} :{display:"flex" , flexDirection:"column-reverse"} }>
        <h1 className='notranslate' style={{ color: toggle ? 'white' : '#161C24', textAlign: 'center' }}>
                ${balance}
        </h1>
        <p className='notranslate'  style={{ color: toggle ? 'white' : '#666666', textAlign: 'center' }}>Current Wallet Balance</p>
        </Box>
      
          <Box sx={{ display: 'flex',marginTop:"3%", justifyContent: 'center', alignItems: 'center' } }>
            {mobileView ?
            <Box sx={{display:"flex" , flexDirection:"column" , alignItems:'center' , color : toggle ? "white" : "black" }}>
              <Avatar onClick={onWithdrawal} sx={{height:"12vh" , width:"14vh" }} alt="Withdraw" src={PLUS_ICON} />
              <span>Buy</span>
            </Box>
            :<Button className='btn-text-buy' sx={{ mr: 2 ,borderRadius:"30px", background:"#EFEFEF;" , color:'black', padding:"1% 0%" ,width:"20%"}} style={toggle ? {color : "Black"} : {color:'black'}} onClick={() => {navigate(`/buy-dint-token`)} }>BUY</Button>}
            {mobileView ? 
            <Box sx={{display:"flex" , flexDirection:"column" , alignItems:'center' , color : toggle ? "white" : "black" }}>
              <Avatar onClick={onWithdrawal} sx={{height:"12vh" , width:"12vh" }} alt="Withdraw" src={DOLLAR_ICON} />
              <span>Withdraw</span>
            </Box>
             :
              <Button className='btn-text-withdraw' sx={{background:'#2A3547' ,color:"white", borderRadius:"30px" ,padding:"1% 0%" , width:"20%"}}  onClick={onWithdrawal}>WITHDRAW</Button>
            }
              </Box>
       
    </Box>

    <Box sx={useMediaQuery("(min-width:899px)")? {
          border: `1px solid #CCCCCC`,
          borderRadius:"10px",
          margin:'3% 0%',
          width: "95%" 
        } : { marginTop:'10%' }}>
        <Grid  sx={ mobileView ? 
        {display:"flex",cursor:'pointer' , width:"100%" , padding:"0% 20%" , textAlign:"center" } 
        : {display:"flex",cursor:'pointer' , width:"100%" , textAlign:"center" ,borderBottom:"1px solid #CCCCCC"}}>
          <Box 
            onClick={()=>setdisplayAssets(true)}
            sx={mobileView ?{padding:'3%' , borderTopLeftRadius:'30px',borderBottomLeftRadius:"30px" ,color:'#fff' ,backgroundColor:displayAssets ?  '#3B3F58' : '#212436' , borderRight:'1px solid #CCCCCC' ,width:'50%' } :{padding:'2%' ,color:displayAssets ?  '#fff' : '',borderTopLeftRadius:'10px' ,backgroundColor:displayAssets ?  '#3B3F58' : '#F5F9FF' , borderRight:'1px solid #CCCCCC' ,width:'50%' }}>
            <Typography sx={{fontWeight:"bold"}}>Assets</Typography>
          </Box>
          <Box onClick={()=>setdisplayAssets(false)} sx={mobileView ? {width:"50%", borderTopRightRadius:'30px',borderBottomRightRadius:"30px"  , padding:'3%',color:'#fff',backgroundColor:!displayAssets ?  '#3B3F58' : '#212436;'}:{width:"50%" ,borderTopRightRadius:"10px", padding:'2%',color:!displayAssets ?  '#fff' : '' ,backgroundColor:!displayAssets ?  '#3B3F58' : '#F5F9FF'}}>
            <Typography sx={{fontWeight:"bold"}}> Activities </Typography>
           </Box>
        </Grid>
      {displayAssets ? <Card sx={{
          '& .MuiPaper-elevation': {
            backgroundColor: toggle ? '#212B36' : 'white'
          }
        }}
        style={{
          padding:"10px",
          backgroundColor: toggle ? '#212B36' : 'white'
        }}
        >
          {/* <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <Grid item sx={{ display: 'flex' }}>
              <Typography variant="body1" color={ toggle ? 'white' : '#161C24'}>
                Accounts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                1 asset
              </Typography>
            </Grid> */}
            {/* <Grid item> */}
              {/* <Typography variant="body2" color={ toggle ? 'white' : '#161C24'} className="notranslate">
                ${balance}
              </Typography> */}
            {/* </Grid>
          </Grid> 
             */}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{
                  fontSize: "12px",
                  "& th": {
                    fontSize: "15px",
                    color: 'text.secondary'
                  },
                  borderBottom:"#D2D2D2"

                }}>
                  <TableCell>Name</TableCell>
                  <TableCell align="center" >Price</TableCell>
                  <TableCell align="center" >Volume</TableCell>
                  <TableCell align="center" >Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
           
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => !isLargeScreen && setOpen(!open)}
                >
                  <TableCell component="th" scope="row" sx={{border:"0", display: 'flex', alignItems: 'center'  }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: toggle ? 'white' : '#161C24'}}>
                      <Avatar alt="Remy Sharp" src={DINT_LOGO} />
                      <div className="mx-4" style={{display:"flex" , flexDirection:"column"}}>
                        <span style={{fontWeight:"700"}}>Dint</span>
                        <span style={{color:"#A0A0A0" , fontWeight:"500"}}>DINT</span>
                        {/* <Typography style={{ display: isLargeScreen ? '' : 'none' }} variant="caption" display="block" color="text.secondary">
                          <Box component='div' onClick={(e) => setOpen(!open)}>Click to expand <KeyboardArrowDownIcon sx={{ fontSize: "16px" }}  /></Box>
                        </Typography> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ border:"0", color: toggle ? 'white' : '#161C24'}}>
                    <span style={{fontWeight:"bold"}}>$1.00 </span>
                  </TableCell>
                  <TableCell align="center" style={{ border:"0", color: toggle ? 'white' : '#161C24' }}>
                    <span style={{fontWeight:"bold"}}>${balance}</span>
                  </TableCell>
                  <TableCell align="center" style={{border:"0",   color: toggle ? 'white' : '#161C24' , fontWeight:"bold" }}>     {balance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border:"0",paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  {/* <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box component='div' sx={isLargeScreen ? { display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' } : {}}>
                      <Box sx={{ margin: 1, textAlign: 'center' }}>
                      <Button variant="outlined" sx={{ mr: 2}} onClick={() => {navigate(`/buy-dint-token`)} }>BUY</Button>
                      <Button variant="contained"  onClick={onWithdrawal}>WITHDRAWAL</Button>
                      </Box>
                      <Typography className="text-center py-2" onClick={() => setOpen(!open)} variant="caption" display="block" color="text.secondary">
                        Click to collapse <KeyboardArrowUpIcon sx={{ fontSize: "14px" }}  />
                      </Typography> 
                      <Box sx={{textAlign: 'center' }}>
                        <Button
                          id="basic-button"
                          aria-controls={openAnchorEl ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openAnchorEl ? 'true' : undefined}
                          onClick={handleClick}
                        >
                          MORE ACTIONS
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openAnchorEl}
                          onClose={handleCloseMenu}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                          sx={{
                            '& .MuiPaper-root': {
                              backgroundColor : toggle ? '#212B36' : '#DFE3E8'
                            }
                          }}
                        >
                          <MenuItem
                            onClick={handleCloseMenu}
                            id='basic-menu-item'
                            style={{
                              backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                              color: toggle ? 'white' : '#161C24'
                            }}
                          >
                            View in explorer
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Collapse> */}
                </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      
        :<Card sx={{
          '& .MuiPaper-elevation': {
            backgroundColor: toggle ? '#212B36' : 'white'
          },
          padding:"10px",
          backgroundColor: toggle ? '#212B36' : 'white'
        }}
        >
          
            <div><p style={{color:"black"}}>Coming Soon...</p></div>
          
        </Card>}
      
        <QrScanDialog isQrScan={isQrScan} handleClose={handleClose} />
        <SendDialog  isSend={isSend} handleClose={handleClose} />
    </Box>

    </>
  );
};

export default DintWallet;