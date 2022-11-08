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
  Paper } from '@mui/material';
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
import { ThemeContext } from '../../contexts/ThemeContext';


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
  const { address } = useSelector((rootState: RootState) => rootState.wallet);
  const { maticWallet } = useSelector((rootState: RootState) => rootState.maticBalance);
  const { name, symbol, balance } = useSelector((rootState: RootState) => rootState.dintBalance);
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
    <Box
        id="postsListScrollableDiv"
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`,
          padding: 20
        }}
      >
        <h1 className='notranslate' style={{ color: toggle ? 'white' : '#161C24', textAlign: 'center' }}>
          Dint Wallet
        </h1>

        <Card sx={{
          p: 2,
          mt: 2 ,
          '& .MuiPaper-elevation': {
            backgroundColor: toggle ? '#212B36' : 'white'
          }
        }}
        style={{
          backgroundColor: toggle ? '#212B36' : 'white'
        }}
        >
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item sx={{ display: 'flex' }}>
              <Typography variant="body1" color={ toggle ? 'white' : '#161C24'}>
                Accounts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                1 asset
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color={ toggle ? 'white' : '#161C24'} className="notranslate">
                ${balance}
              </Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: isLargeScreen ? 650 : 'auto' }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{
                  fontSize: "12px",
                  "& th": {
                    fontSize: "12px",
                    color: 'text.secondary'
                  }
                }}>
                  <TableCell>Name</TableCell>
                  <TableCell align="center" style={{ display: isLargeScreen ? '' : 'none' }}>Price</TableCell>
                  <TableCell align="center" style={{ display: isLargeScreen ? '' : 'none' }}>Volume</TableCell>
                  <TableCell align="center" style={{ display: isLargeScreen ? '' : 'none' }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
           
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => !isLargeScreen && setOpen(!open)}
                >
                  <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: toggle ? 'white' : '#161C24'}}>
                      <Avatar alt="Remy Sharp" src={DINT_POLYGON_ICON} />
                      <div className="mx-4">
                        <span className="notranslate">dint (Dint)</span>
                        <Typography style={{ display: isLargeScreen ? '' : 'none' }} variant="caption" display="block" color="text.secondary">
                          <Box component='div' onClick={(e) => setOpen(!open)}>Click to expand <KeyboardArrowDownIcon sx={{ fontSize: "16px" }}  /></Box>
                        </Typography>
                      </div>
                    </div>
                    <div className='notranslate' style={{ display: isLargeScreen ? 'none' : '' }}>$1</div>
                  </TableCell>
                  <TableCell align="center" style={{ display: isLargeScreen ? '' : 'none' , color: toggle ? 'white' : '#161C24'}}>
                    <div className="mx-4 notranslate">
                    $1
                      {/* <Typography variant="caption" display="block" className="success-text-color">
                        -$1.44
                      </Typography> */}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ display: isLargeScreen ? '' : 'none', color: toggle ? 'white' : '#161C24' }}>
                    <div className="mx-4 notranslate">
                    ${balance}
                      {/* <Typography variant="caption" display="block" className="success-text-color">
                        +$0.01
                      </Typography> */}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ display: isLargeScreen ? '' : 'none',  color: toggle ? 'white' : '#161C24' }}>     {balance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                  </Collapse>
                </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <QrScanDialog isQrScan={isQrScan} handleClose={handleClose} />
        <SendDialog  isSend={isSend} handleClose={handleClose} />
    </Box>
  );
};

export default DintWallet;