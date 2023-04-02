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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDintBalance } from "frontend/redux/actions/wallet/getDintBalance";
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [cardSelect, setCardSelect] = useState();
  const { selectedMenu } = useSelector(
    (rootState: RootState) => rootState.newHome
  );
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const { address } = useSelector((rootState: RootState) => rootState.wallet);
  const { toggle } = useContext(ThemeContext);
  const cards = document.getElementsByClassName("cards");
  const navigate = useNavigate();
  useEffect(() => {
    callDefaultAPI();
  }, []);

  const callDefaultAPI = () => {
    dispatch(getCreditCards()).then((response: any) => {
      setCardData(response);
      if (response) {
        setCardSelect(response[0]);
      }
    });
  };

  const onSubmit = async (data: any) => {
    if(!cardSelect){
      return toast.warning('Please add a card to buy tokens and fund your wallet')
    }
    try {
      setInProgress(true);
      const sendDetail = {
        walletAddr: address,
        amount: data.amount,
        email: userData?.email,
        cardDetails:cardSelect 
      };
      if (sendDetail) {
        await _axios
          .post(`${process.env.REACT_APP_API_LINK}/api/checkout`, sendDetail)
          .then((res: any) => {
            const { data } = res;
            if(data.paid === true){
              toast.loading('Please wait...');
              toast.dismiss();
              toast.success("Payment successful")
              navigate('/dint-wallet'); // Redirect to '/dint-wallet'
              dispatch(getDintBalance()).then((res:any)=>{})
            }else{
              toast.error('Payment Unsuccessful!')
            }
            // window.open(data.session.url);
          }).catch((err:any) => {
            console.log(err)
            toast.error('Payment Unsucessful!')
          });
        setInProgress(false);
      }
    } catch (err) {
      setInProgress(false);    }
  };
  const handleChange = (e: any) => {
    setCardSelect(e.target.value);
  };
  return (
    <Box
      id="postsListScrollableDiv"
      style={
        HOME_SIDE_MENU.HOME === selectedMenu
          ? {}
          : {
              borderLeft: `1px solid ${theme.palette.grey[700]}`,
              borderRight: `1px solid ${theme.palette.grey[700]}`,
              padding: 10,
            }
      }
    >
      <div
        style={useMediaQuery("(min-width:899px)") ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        } :{margin:"5%"}}
      >
        <main
          // style={{
          //   width: HOME_SIDE_MENU.HOME === selectedMenu ? "80%" : "50%",
          // }}
        >
          <h1
            style={{
              color: toggle ? "white" : "#161C24",
              textAlign: "center",
              paddingTop:"70px"
            }}
          >
          Each coin equals $1
          </h1>
          <Typography
            className="primary-text-color"
            variant="h4"
            sx={{ textAlign: "center" }}
          ></Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} mt={2} ml={isLargeScreen ? 3 : 0} sx={{ '& .css-19kzrtu' :{padding:"0px"} }}>
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
              <TabPanel   value={0} index={0}>
                <FormControl sx={{ padding:'0' }} fullWidth>
                  {cardSelect ? (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      onChange={(e) => handleChange(e)}
                      value={cardSelect}
                      sx={{background:toggle ? '':"#DFE3E8" , borderRadius:'5px' }}
                    >

                      {(cardData || []).map(
                        (card: string | any, index: number) =>  (
                          <MenuItem style={{paddingTop : "0px" ,paddingBottom:"0" }} value={card}>
                            <Stack
                            // className="card"
                              key={index}
                              sx={{
                                background: toggle  ? "#0b1419" : "white", 
                                borderRadius: "10px",
                                width:"100%",
                              }}
                              p={1}
                              m={1}
                            >
                              <Stack
                                direction="row"
                                gap={2}
                                pb={2}
                                sx={ isLargeScreen ? {
                                  justifyContent: "space-between",
                                  borderBottom: `2px solid ${theme.palette.grey[700]}`,
                                } : {
                                  flexDirection:"column",
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
                                    // className="primary-text-color"
                                    sx={{ fontSize: isSmallScreen ? "14px" : "16px" ,color:toggle ? "white" : "black" }}
                                  >
                                    mastercard *** *** ****{" "}
                                    {card ? card.card_number : ""}
                                  </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center">
                                  <Typography
                                    // className="secondary-text-color"
                                    style={{ fontSize:isSmallScreen ? "14px" : "16px" , color:toggle ? "white" : "black" }}
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
                                    // className="primary-text-color"
                                    style={{ fontSize: "14px" , color:toggle ? "white" : "black" }}
                                  >
                                    {card.is_activate ? "Active" : "disabled"}
                                  </Typography>
                                </Stack>
                                <Stack>
                                  <Typography
                                    // className="primary-text-color"
                                    style={{ fontSize: "14px" , color:toggle ? "white" : "black" }}
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
                  ) : <Typography sx={{color : toggle ? "white" : ""}}>You have not added any card yet. <Link to={'/payment/add'} style={{color:"brown !important" , fontWeight:"bold"}}> Add a card </Link></Typography>}
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
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={
                        formState.errors?.amount?.type === "required" ||
                        formState.errors?.amount?.type === "maxLength"
                      }
                      inputRef={ref}
                      value={value}
                      label="Amount"
                      variant="filled"
                      onChange={(e: any) => onChange(e.target.value)}
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
                  )}
                />
              </FormControl>
              <button
                className="btn btn-primary"
                style={{
                  background: "#7635dc",
                  marginBottom: 100,
                  outline: "unset",
                  borderWidth: 0,
                }}
                type="submit"
              >
                Complete Order
              </button>
            </Stack>
          </form>
        </main>
      </div>
    </Box>
  );
}
