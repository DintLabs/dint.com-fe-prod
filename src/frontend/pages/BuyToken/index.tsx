import { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Stack,
  useTheme,
  FormControl,
  useMediaQuery,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as axios from "axios";
import { RootState, useDispatch, useSelector } from "frontend/redux/store";
import { HOME_SIDE_MENU } from "frontend/redux/slices/newHome";
import { ThemeContext } from "../../contexts/ThemeContext";
import _axios from "frontend/api/axios";
import PaymentCard from "../Your-Bank/BankingSteps/PaymentCard";
import { getCreditCards } from "frontend/redux/actions/StripeAction";
import discover from "../../assets/img/cc/card_discover.png";
import selcticon from"../../assets/img/icons/img-select.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Cards from "../../components/buytoken"

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

export default function BuyToken() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const paymentFormRef = useRef();
  const [cardData, setCardData] = useState<any | []>([]);
  const [inProgress, setInProgress] = useState(false);
  const { handleSubmit, formState, watch, control, setValue } = useForm();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [cardSelect, setCardSelect] = useState();
  const [tokenValue, setTokenValue] = useState()
  const tokenCard = { tokenName: 100, price: '100' }
  const cardItems = [{ tokenName: 100, price: '100' }, { tokenName: 120, price: '12.0' }, { tokenName: 120, price: '14.0' }, { tokenName: 120, price: '13.1' }, { tokenName: 120, price: '12.0' }, { tokenName: 120, price: '10.0' }]
  const { selectedMenu } = useSelector(
    (rootState: RootState) => rootState.newHome
  );
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const { address } = useSelector((rootState: RootState) => rootState.wallet);
  const { toggle } = useContext(ThemeContext);
  const cards = document.getElementsByClassName("cards");
  useEffect(() => {
    callDefaultAPI();
  }, []);

  const callDefaultAPI = () => {
    dispatch(getCreditCards()).then((response: any) => {
      setCardData(response);
      // if (response) {
      //   setCardSelect(response[0]);
      // }
    });
  };


  console.log("tokenValue", tokenValue)
  const onSubmit = async (data: any) => {
    if (!cardSelect) {
      return toast.warning('Please add a card to do a payment')
    }
    try {
      setInProgress(true);
      const sendDetail = {
        walletAddr: address,
        amount: data.amount,
        email: userData?.email,
        cardDetails: cardSelect
      };
      if (sendDetail) {
        await _axios
          .post(`${process.env.REACT_APP_API_LINK}/api/checkout`, sendDetail)
          .then((res: any) => {
            const { data } = res;
            // window.open(data.session.url);
          });
        setInProgress(false);
      }
    } catch (err) {
      setInProgress(false);
    }
  };
  const handleChange = (e: any) => {
    setCardSelect(e.target.value);
  };

  const onBuyClick = (value: any) => {
    setValue('amount', value);
    setTokenValue(value)
  }
  return (
    <Box
      id="postsListScrollableDiv"

    >
      <div
      >
        <main
        // style={{
        //   width: HOME_SIDE_MENU.HOME === selectedMenu ? "100%" : "50%",
        // }}
        >
          {/* <h1
            style={{
              color: toggle ? "white" : "#161C24",
              textAlign: "center",
            }}
          >
            Buy Dint Token
          </h1> */}
          <Typography
            className="primary-text-color"
            variant="h4"
            sx={{ textAlign: "center" }}
          >

          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid xs={2}>
                <div style={{ width: '70%',marginTop:'40px',marginLeft:'10px' }}>
                  <Cards token={tokenCard} onBuyClick={onBuyClick} />
                </div>
              </Grid>
              <Grid xs={2}>
                <div style={{ width: '70%',marginTop:'40px',marginLeft:'10px' }}>
                  <Cards token={tokenCard} onBuyClick={onBuyClick} />
                </div>
              </Grid>
              <Grid xs={2}>
                <div style={{ width: '70%',marginTop:'40px',marginLeft:'10px' }}>
                  <Cards token={tokenCard} onBuyClick={onBuyClick} />
                </div>
              </Grid>
              <Grid xs={6}>

                <Stack gap={2} mt={2} ml={isLargeScreen ? 3 : 0}>
                  {/* <FormControl fullWidth>
              <Controller
                control={control}
                name="walletAddr"
                rules={{
                  required: true,
                  maxLength: 100
                }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.walletAddr?.type === 'required' ||
                      formState.errors?.walletAddr?.type === 'maxLength'
                    }
                    inputRef={ref}
                    value= {value}
                    label="Wallet Address"
                    variant="filled"
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiFormHelperText-root': {
                        color: theme.palette.grey[600],
                        textAlign: 'right'
                      },
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                      },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: true,
                  maxLength: 100
                }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.email?.type === 'required' ||
                      formState.errors?.email?.type === 'maxLength'
                    }
                    inputRef={ref}
                    value={value}
                    label="Email"
                    variant="filled"
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiFormHelperText-root': {
                        color: theme.palette.grey[600],
                        textAlign: 'right'
                      },
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                      },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      },
                    }}
                  />
                )}
              />
            </FormControl> */}
                  <TabPanel value={0} index={0}>
                    <FormControl style={{ padding: '10px', background: "#F7F6F6", borderRadius: '10px' }} fullWidth>
                      <p style={{ color: toggle?'black':'gray', marginBottom: '-25px' }}>Select The Payment Method</p>
                     {cardSelect?"": <div style={{display:'flex',position:'relative',top:'40px',zIndex:'99',justifyContent:'center'}}>
                        <img src={selcticon} />
                        <h6 style={{marginLeft:'20px'}}>Master Data</h6>
                      </div>}
                      {/* {cardSelect ? ( */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          onChange={(e) => handleChange(e)}
                          value={cardSelect}
                          style={{ borderRadius: '5px', background: 'white' }}
                        >
                         
                          
                          {(cardData || []).map(
                            (card: string | any, index: number) => (
                              <MenuItem style={{ paddingTop: "0px", paddingBottom: "0" }} value={card}>

                                <Stack
                                  className="card"
                                  key={index}
                                  sx={{
                                    background: "#0b1419",
                                    borderRadius: "10px",
                                    width: "100%"
                                  }}
                                  p={1}
                                  m={1}
                                >
                                  <Stack
                                    direction="row"
                                    gap={2}
                                    pb={2}
                                    sx={{
                                      justifyContent: "space-between",
                                      borderBottom: `2px solid ${theme.palette.grey[700]}`,
                                    }}
                                  >
                                    <Stack direction="row" gap={1}>
                                      <img
                                        src={discover}
                                        alt="discover"
                                        width={30}
                                      />
                                      <Typography
                                        className="primary-text-color"
                                        style={{ fontSize: "16px", color: "black" }}
                                      >
                                        mastercard *** *** ****{" "}
                                        {card ? card.card_number : ""}
                                      </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center">
                                      <Typography
                                        className="secondary-text-color"
                                        style={{ fontSize: "16px", color: "black" }}
                                        mx={2}
                                      >
                                        Expiration date{" "}
                                        {card ? card.card_expired : ""}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    gap={2}
                                    mt={1}
                                    sx={{ justifyContent: "space-between" }}
                                  >
                                    <Stack>
                                      <Typography
                                        className="primary-text-color"
                                        style={{ fontSize: "14px", color: "black" }}
                                      >
                                        {card.is_activate ? "Active" : "disabled"}
                                      </Typography>
                                    </Stack>
                                    <Stack>
                                      <Typography
                                        className="primary-text-color"
                                        style={{ fontSize: "14px", color: "black" }}
                                      >
                                        {card.default_card ? "DEFAULT" : null}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </MenuItem>
                            )
                          )}
                        </Select>
                      {/* ) :
                        <div style={{ background: 'white', height: '80px' }}>
                          <Typography >
                            You have not added any Card !<Link to={'/payment/add'} style={{ color: "brown !important", fontWeight: "bold" }}> Add a card </Link></Typography>
                        </div>
                      } */}
                    </FormControl>
                  </TabPanel>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="amount"
                      rules={{
                        required: true,
                        maxLength: 100,
                      }}
                      render={({ field: { onChange, value, ref } }: any) =>{ 
                      
                        return(
                          <TextField style={{width:'93%',marginLeft:'25px'}}
                          error={
                            formState.errors?.amount?.type === "required" 
                            ||
                            formState.errors?.amount?.type === "maxLength"
                          }
                          inputRef={ref}
                          value={value}
                          label="Enter Amount"
                          variant="filled"
                          onChange={onChange}
                          sx={{
                            flex: 1,
                            "& .MuiFormHelperText-root": {
                              color: theme.palette.grey[600],
                              textAlign: "right",
                            },
                            "& .MuiFilledInput-input": {
                              color: toggle ? "white" : "#161C24",
                            },
                            "& .MuiInputBase-root": {
                              backgroundColor: toggle
                                ? "rgba(255, 255, 255, 0.09)"
                                : "#DFE3E8",
                            },
                          }}
                        />
                      )}}
                    />
                  </FormControl>
                </Stack>

              </Grid>
            </Grid>
            <div style={{ display: 'flex',marginBottom:'20px',marginTop:'20px',color: toggle ? "white" : "#161C24" }}>  <h5>For Conveniance get </h5><h5 style={{ marginLeft: '10px', color: '#4AA081' }}>Subscriptions</h5></div>
            <Grid container spacing={1} >
              {cardItems.map((tokenitem) => (
                <Grid xs={2} > <div style={{ width: '75%' }}><Cards token={tokenitem} onBuyClick={onBuyClick} /></div></Grid>
              ))}
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}> <button
              className="btn btn-primary"
              style={{
                background: "#EFEFEF",
                marginBottom: 40,
                marginTop: '100px',
                outline: "unset",
                padding:'15px',
                width:'176px',
                color:'black',
                borderWidth: 0,
              }}
              type="submit"
            >
              Continue
            </button></div>
          </form>
        </main>
      </div>
    </Box>
  );
}
