import { useContext, useEffect, useRef, useState } from 'react'
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
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { RootState, useDispatch, useSelector } from 'frontend/redux/store'
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome'
import { ThemeContext } from '../../contexts/ThemeContext'
import _axios from 'frontend/api/axios'
import PaymentCard from '../Your-Bank/BankingSteps/PaymentCard'
import { getCreditCards } from 'frontend/redux/actions/StripeAction'
import discover from '../../assets/img/cc/card_discover.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDintBalance } from 'frontend/redux/actions/wallet/getDintBalance'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
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
  )
}

export default function SellToken() {
  const navigate = useNavigate()
  const [open] = useState(false)
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const [showAddBank, setShowAddBank] = useState(false)
  const [bankData, setBankData] = useState([])
  const [showBankDetails, setShowBankDetails] = useState(true)
  const [] = useState(null)
  const dispatch = useDispatch()
  const paymentFormRef = useRef()

  const [inProgress, setInProgress] = useState(false)
  const { handleSubmit, formState, watch, control, setValue } = useForm()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [cardSelect, setCardSelect] = useState()
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome)
  const { balance } = useSelector((rootState: RootState) => rootState.wallet)

  const { toggle } = useContext(ThemeContext)

  const id = JSON.parse(localStorage.getItem('userData') || '').id

  const onSubmit = async (data: any) => {
    if (!cardSelect) {
      return toast.warning('Please add a bank account to withdrawal')
    }
    if (isNaN(Number(data.amount)) || Number(data.amount) < 1) {
      return toast.error('The amount should be at least $1')
    }
    try {
      setInProgress(true)
      const sendDetail = {
        amount: parseInt(data.amount),
        user_id: id,
      }
      
      if (sendDetail) {
        _axios.post(`/api/user/withdraw-dint/`, sendDetail)
          .then((res: any) => {
            setLoading(true);
            if (res?.data && res.data.code === 201) {
              setLoading(false);
              toast.success('Token sent successfully.');
              navigate('/dint-wallet');
            } else {
              _axios.post(`/api/user/request_payouts/`, {
                  amount: parseInt(data.amount),
                })
                .then((res: any) => {
                  if (res?.data && res.data.code === 400) {
                    setLoading(false);
                    toast.error('Action Failed');
                  } else {
                    setLoading(false);
                    toast.success('Account updated successfully.');
                    navigate('/dint-wallet');
                  }
                })
                .catch((error: any) => {
                  setLoading(false);
                  toast.error('Action Failed');
                  console.error('error in update bank', error);
                });
            }
          })
          .catch((error: any) => {
            setLoading(false);
            toast.error('Action Failed');
            console.error('error in withdraw DINT', error);
          });
        setInProgress(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  function getBankDetails() {
    setLoading(true)
    _axios
      .get('api/user/get_bank_accounts/')
      .then((res: any) => {
        console.log('bank account details----', res.data) // Log the payload to the console
        if (res?.data?.data?.length > 0) {
          setCardSelect(res.data.data[0])
          setBankData(res.data.data)
          setShowAddBank(false)
        } else {
          setShowAddBank(true)
        }
        setLoading(false)
      })
      .catch((error: any) => {
        setLoading(false)
        toast.error('Action Failed')
        console.error('error fetching bank details', error)
      })
  }
  const handleChange = (e: any) => {
    setCardSelect(e.target.value)
  }

  useEffect(() => {
    getBankDetails()
  }, [])



  return (
    <Box
      id='postsListScrollableDiv'
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
        style={
          useMediaQuery('(min-width:899px)')
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : { margin: '5%' }
        }
      >
        <main
        // style={{
        //   width: HOME_SIDE_MENU.HOME === selectedMenu ? "80%" : "50%",
        // }}
        >
          <h1
            style={{
              color: toggle ? 'white' : '#161C24',
              textAlign: 'center',
              paddingTop: '70px',
            }}
          >
            Withdrawal to your bank
          </h1>
          <Typography
            className='primary-text-color'
            variant='h4'
            sx={{ textAlign: 'center' }}
          ></Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              gap={2}
              mt={2}
              ml={isLargeScreen ? 3 : 0}
              sx={{ '& .css-19kzrtu': { padding: '0px' } }}
            >
              <TabPanel value={0} index={0}>
                <FormControl sx={{ padding: '0' }} fullWidth>
                  {cardSelect ? (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Age'
                      onChange={(e) => handleChange(e)}
                      value={cardSelect}
                      sx={{ background: toggle ? '' : '#DFE3E8', borderRadius: '5px' }}
                    >
                      {(bankData || []).map((bank: any | any, index: number) => (
                        <MenuItem style={{ paddingTop: '0px', paddingBottom: '0' }} value={bank}>
                          <Stack
                            // className="card"
                            key={index}
                            sx={{
                              background: toggle ? '#0b1419' : 'white',
                              borderRadius: '10px',
                              width: '100%',
                            }}
                            p={1}
                            m={1}
                          >
                            <Stack
                              direction='row'
                              gap={2}
                              pb={2}
                              sx={
                                isLargeScreen
                                  ? {
                                      justifyContent: 'space-between',
                                      borderBottom: `2px solid ${theme.palette.grey[700]}`,
                                    }
                                  : {
                                      flexDirection: 'column',
                                      borderBottom: `2px solid ${theme.palette.grey[700]}`,
                                    }
                              }
                            >
                              <Stack direction='row' gap={1}>
                                {/* <img
                                    src={discover}
                                    alt="discover"
                                    width={30}
                                  /> */}

                                <Typography
                                  // className="primary-text-color"
                                  sx={{
                                    fontSize: isSmallScreen ? '14px' : '16px',
                                    color: toggle ? 'white' : 'black',
                                  }}
                                >
                                  Account Number: *** *** **** {bank.accountNumber.substr(-4)}
                                </Typography>
                              </Stack>
                              {/* <Stack direction="row" alignItems="center">
                                  <Typography
                                    // className="secondary-text-color"
                                    style={{ fontSize:isSmallScreen ? "14px" : "16px" , color:toggle ? "white" : "black" }}
                                    mx={2}
                                  >
                                    Expiration date{" "}
                                    {bank.accountNumber.substr(-4)}
                                  </Typography>
                                </Stack> */}
                            </Stack>
                            <Stack
                              direction='row'
                              gap={2}
                              mt={1}
                              sx={{ justifyContent: 'space-between' }}
                            >
                              <Stack>
                                <Typography
                                  // className="primary-text-color"
                                  style={{ fontSize: '14px', color: toggle ? 'white' : 'black' }}
                                >
                                  {bank.is_activate ? 'Active' : 'disabled'}
                                </Typography>
                              </Stack>
                              <Stack>
                                <Typography
                                  // className="primary-text-color"
                                  style={{ fontSize: '14px', color: toggle ? 'white' : 'black' }}
                                >
                                  {bank.default_card ? 'DEFAULT' : null}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Typography sx={{ color: toggle ? 'white' : '' }}>
                      You have not added any bank yet.{' '}
                      <Link
                        to={'/your-bank'}
                        style={{ color: 'brown !important', fontWeight: 'bold' }}
                      >
                        {' '}
                        Add a bank
                      </Link>
                    </Typography>
                  )}
                </FormControl>
              </TabPanel>

              <FormControl fullWidth>
                <Controller
                  control={control}
                  name='amount'
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, value = '', ref } }: any) => (
                    <TextField
                      error={
                        formState.errors?.amount?.type === 'required' ||
                        formState.errors?.amount?.type === 'maxLength'
                      }
                      inputRef={ref}
                      value={value}
                      label='Amount'
                      variant='filled'
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
                        flex: 1,
                        '& .MuiFormHelperText-root': {
                          color: theme.palette.grey[600],
                          textAlign: 'right',
                        },
                        '& .MuiFilledInput-input': {
                          color: toggle ? 'white' : '#161C24',
                        },
                        '& .MuiInputBase-root': {
                          backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                        },
                      }}
                    />
                  )}
                />
                <Typography style={{ position: 'absolute', right: '-35%', lineHeight: 3.5 }}>
                  {`Balance: $ ${balance}` || '0.00 EUR'}
                </Typography>
              </FormControl>
              <button
                className='btn btn-primary'
                style={{
                  background: '#7635dc',
                  marginBottom: 100,
                  outline: 'unset',
                  borderWidth: 0,
                }}
                type='submit'
              >
                Complete Order
              </button>
            </Stack>
          </form>
        </main>
      </div>
    </Box>
  )
}
