import * as React from 'react';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AddCardIcon from '@mui/icons-material/AddCard';
import visa from '../../../assets/img/cc/card_visa.png';
import maestro from '../../../assets/img/cc/card_maestro.png';
import discover from '../../../assets/img/cc/card_discover.png';
import jcbcard from '../../../assets/img/cc/card_jcb.png';
import ConfirmationModel from '../../../components/ConfirmationModel';
import { deleteCreditCard, getCreditCards } from '../../../redux/actions/StripeAction';
import { useDispatch } from '../../../redux/store';
import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `payment-tab-${index}`,
    'aria-controls': `payment-tabpanel-${index}`
  };
}

export default function PaymentCard() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [confirmation, setConfirmation] = React.useState<boolean>(false);
  const [cardData, setCardData] = useState<any | []>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [curentElemnt, setCurentElemnt] = React.useState<object | null>(null);
  const [paymentsData , setPaymentsData] = React.useState<any>();
  const open = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleConfirmation = (card = null) => {
    setConfirmation(!confirmation);
    setCurentElemnt(card);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    callDefaultAPI();
    getPaymentsData();
  }, []);

  const callDefaultAPI = () => {
    dispatch(getCreditCards()).then((response: any) => {
      setCardData(response);
      if (response.length !== 0){
        navigate('/cards');
      } else {
        navigate('/payment/add');
      }
    });
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleConfirm = () => {
    dispatch(deleteCreditCard(curentElemnt)).then((response: object) => {
      setConfirmation(false)
      callDefaultAPI()
    })
  }

  const getPaymentsData = async () => {
    await _axios
      .get("api/user/get_payouts_by_token/")
      .then((res: any) => {
        if (res?.data?.data) setPaymentsData(res.data.data);
      })
      .catch((error: any) => {
        console.log("error fetch bank details", error);
        toast.error("Action Failed");
      });
  };
  

  return (
    <Grid
      item
      xs={12}
      md={8}
      p={0}
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        height: '100vh'
      }}
    >
      <Stack
        p={1}
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          borderBottom: `2px solid ${theme.palette.grey[700]}`,
          justifyContent: 'space-between'
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <IconButton size="small" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack className="primary-text-color cursor-pointer" onClick={() => navigate(-1)}/>
          </IconButton>
          <Typography className="primary-text-color capitalize-text" variant="subtitle1">
            PAYMENT CARDS
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
        >
          <Stack mx={2}>
            <Link to="/payment/add">
              <AddCardIcon className="primary-text-color cursor-pointer"/>
            </Link>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="YOUR CARDS" {...a11yProps(0)} sx={{ flex: 1 }}/>
            <Tab label="PAYMENTS" {...a11yProps(1)} sx={{ flex: 1 }}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} >
          {(cardData || []).map((card:string | any, index:number) => (
            <Stack
              key={index}
              sx={{ background: "linear-gradient(248.61deg, #124c5e 0.03%, #29252e 99.03%)" , borderRadius: '10px' }}
              p={4}
              mb={2}>
              <Stack
                direction= {isSmallScreen ? "column" :"row"}
                gap={2}
                pb={2}
                sx={{ justifyContent: 'space-between', borderBottom: `2px solid ${theme.palette.grey[500]}` }}
              >
                <Stack direction="row" gap={1}>
                  <img src={visa} alt="discover" width={30}/>
                  <Typography className="primary-text-color" style={{ fontSize: '16px' }}>
                    mastercard *** *** **** {card ? card.card_number : ""}
                  </Typography>
                </Stack>
                <Stack sx={{marginLeft :isSmallScreen ? "5%" : "" }}direction="row" alignItems="center">
                  <Typography className="secondary-text-color" style={{ fontSize: '16px' }} mx={2}>
                    Expiration date {card ? card.card_expired : ""}
                  </Typography>

                  <Stack>
                    <IconButton
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      style={{ width: '10px', height: '5px' }}
                    >
                      <MoreHorizIcon/>
                    </IconButton>
                    <Menu
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      style={{ padding :"0"}}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmation(card.id)}>Delete</MenuItem>
                    </Menu>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="row" gap={2} mt={1} sx={{ justifyContent: 'space-between' }}>
                <Stack>
                  <Typography className="primary-text-color" style={{ fontSize: '14px' }}>
                    {card.is_activate ? "🟢 Active" : "⚫ disabled"}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography className="primary-text-color" style={{ fontSize: '14px' }}>
                    {card.default_card ? 'DEFAULT' : null}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}

          <Typography className="primary-text-color" style={{ fontSize: '16px' }} mt={4}>
            We are fully complaint with Payment Industry Data Security Standards.
          </Typography>
          <Stack my={2}>
            <Alert severity="info" className="primary-text-color" style={{ fontSize: '16px' }}>
              The charge on your credit card statement will appear as Dint Club
            </Alert>
          </Stack>
          <Stack direction="row" gap={2} justifyContent="center">
            <img src={visa} alt="visa" width={40}/>
            <img src={discover} alt="visa" width={40}/>
            <img src={maestro} alt="visa" width={40}/>
            <img src={discover} alt="visa" width={40}/>
            <img src={jcbcard} alt="visa" width={40}/>
          </Stack>
          <Stack my={2}>
            <Typography className="secondary-text-color" style={{ fontSize: '10px' }} mt={1} pb={4} align="center">
              Dint Club, Avenue Louise 54, Room S52, Brussels, 1050, Belgium
            </Typography>
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack direction="row" justifyContent="center" alignItems="center" >
            {paymentsData ?
            paymentsData.map((res:any)=>{
              console.log(res)
            })
            :<Stack alignItems="center">
              <ShoppingBagOutlinedIcon sx={{fontSize:"80px"}}/>
              <Typography className="primary-text-color" style={{ fontSize: '14px' }} mt={1} pb={4} align="center">
                No Payments done yet.
              </Typography>
            </Stack>}
          </Stack>
        </TabPanel>
      </Box>
      <ConfirmationModel
        isOpen={confirmation}
        title="Are you sure you want to delete this card ?"
        confirmText="Delete"
        handleClose={() => handleConfirmation()}
        onConfirm={handleConfirm}
      />
    </Grid>
  );
}
