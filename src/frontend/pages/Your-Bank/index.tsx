import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { IoMdArrowRoundBack } from "react-icons/io";
import ContactSupportSharpIcon from "@mui/icons-material/ContactSupportSharp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import _ from "lodash";
import FirstStep from "./BankingSteps/FirstStep";
import SecondPageUsa from "./BankingSteps/SecondPageUsa";
import SecondPageOther from "./BankingSteps/SecondPageOther";
import { ThemeContext } from "../../contexts/ThemeContext";
import CaptureImageComponent from "frontend/components/CaptureImageComponent";
import _axios from "frontend/api/axios";
import Loader from "frontend/components/common/Loader";
import { toast } from "react-toastify";
import ThirdPage from "./BankingSteps/ThirdPage";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddVerificationDocument from "../Lounge/AddVerificationDocument";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  minHeight: 500,
  textAlign: "center",
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BankContainer = () => {
  const [state, setState] = useState<any>({
    state: "",
    city: "",
    iban: "",
    fullname: "",
    country: "",
    post_code: "",
    account_number: "",
    active: 0,
  });
  const [open, toggleVerificationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);
  const [showAddBank, setShowAddBank] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(null);

  const getBankDetails = () => {
    setLoading(true);
    _axios
      .get("api/user/get_bank_accounts/")
      .then((res: any) => {
        if (res?.data?.data?.length > 0) {
          setBankData(res.data.data);
          setShowAddBank(false);
        } else setShowAddBank(true);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error("Action Failed");
        console.error("error fetching bank details", error);
      });
  };

  useEffect(() => {
    getBankDetails();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: any) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(index);
  };

  const handleClose = () => {
    toggleVerificationModal(false);
    setOpenModal(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const handleNextStep = (item?: null | any) => {
    if (state.active !== 2) {
      setShowBankDetails(false);
      const bankDetails1 = Object.assign(state, item)
      // console.log("**test",test);
      setState((oldState: any) => {
        return {
          ...oldState,
          ...bankDetails1,
          active: state.active + 1,
        };
      });
      console.log("**staetttt 2 after", state);
    }

    if (state.country !== null && state.active === 2) {
      setShowBankDetails(false);
      const bankDetails2 = Object.assign(state, item)
      setState((oldState: any) => ({
        ...oldState,
        ...bankDetails2,
        active: state.active + 1,
      }));
      addBankAccount();
    }
  };
  //  useEffect(() => {
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!",state)
  // },[handleNextStep])

  const addBankAccount = async () => {
    try {
      const { data } = await _axios.post("api/user/add_bank_accounts/", {
        accountHolderName: state.fullname,
        accountNumber: state.account_number,
        iban: state.iban,
        country: state.country,
        city: state.city,
        state: state.state,
        postCode: state.postal_code,
      });
      if (data && data.code === 400) {
        setLoading(false);
        toast.error("Action Failed");
      } else {
        setLoading(false);
        toast.success("Verification Done");
        handleNextStep();
      }
    } catch (err) {
      setLoading(false);
      toast.error("Action Failed");
      console.error(err);
    }
  };

  const handlePreviousStep = () => {
    if (state.active !== 0) {
      setState((oldState: any) => ({
        ...oldState,
        active: state.active - 1,
      }));
    }
  };

  useEffect(() => {
    if (state.active === 0) {
      setShowBankDetails(true);
    }
  }, [state.active]);

  const onUpdatePrimary = (bankId: string) => {
    handleCloseMenu();
    setLoading(true);

    _axios
      .put(`/api/user/update_bank_account/${bankId}/`)
      .then((res: any) => {
        getBankDetails();
        setLoading(false);
        if (res?.data && res.data.code === 400) {
          toast.error("Action Failed");
        } else {
          toast.success("Account Updated successfully.");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error("Action Failed");
        console.error("error in update bank", error);
      });
  };

  const handleKYC = async (image: string) => {
    setLoading(true);
    toast.update("Documents and face image uploading...........")
    try {
      // condition for attach id and image
      const formData = new FormData();
      formData.append("document", attachId);
      formData.append("face_image", image.split(",")[1]);

      const { data } = await _axios.post("api/user/verify_identity/", formData);
      setLoading(false);
      console.log(data);
      if (data && data.code === 400) {
        toast.error("Action Failed");
      } else {        
        toast.success("Verification Done");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Action Failed");
      console.error(err);
    }
  };
  
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  const [attachId, setAttchId] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const onAttachDocument = (document: any) => {
    console.log("onAttachDocument----",document)
    setAttchId(document);
    toggleVerificationModal(false);
    setOpenModal(true);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            borderLeft: `1px solid ${theme.palette.grey[700]}`,
            borderRight: `1px solid ${theme.palette.grey[700]}`,
            overflow: "auto",
          }}
          pb={6}
        >
          <Stack
            p={2}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              borderBottom: `2px solid ${theme.palette.grey[700]}`,
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              {state.active !== 0 && (
                <IconButton size="small" onClick={handlePreviousStep}>
                  <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
                </IconButton>
              )}
              <Typography
                className="primary-text-color capitalize-text"
                variant="subtitle1"
              >
                BANKING
              </Typography>
            </Stack>
            {showAddBank ? (
              <Stack>
                <ContactSupportSharpIcon
                  sx={{ color: toggle ? "white" : "#919eab" }}
                />
              </Stack>
            ) : (
              <Stack direction="row" gap={2}>
                <Stack mx={2}>
                  <AddHomeWorkOutlinedIcon
                    onClick={() => handleNextStep()}
                    className="primary-text-color cursor-pointer"
                  />
                </Stack>
              </Stack>
            )}
          </Stack>

          {!loading && showAddBank && state.active === 0 && (
            <>
              <div
                style={{
                  margin: "auto",
                  width: "fit-content",
                  marginTop: "2rem",
                }}
              >
                <Button variant="contained" onClick={() => handleNextStep()}>
                  + Add Bank
                </Button>
              </div>

              <Stack
                p={2}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  borderBottom: `1px solid ${theme.palette.grey[700]}`,
                  justifyContent: "space-between",
                }}
              >
                <InfoOutlinedIcon
                  sx={{ color: toggle ? "white" : "#919eab" }}
                />
                <Typography className="primary-text-color" variant="subtitle2">
                  We recommend using mobile device or device with camera to
                  complete this verification step.
                </Typography>
              </Stack>
              <div
                style={{
                  margin: "auto",
                  width: "fit-content",
                  marginTop: "2rem",
                }}
              >
                <Button
                  className="capitalize-text"
                  variant="contained"
                  onClick={() => toggleVerificationModal(true)}
                >
                  Complete Verification
                </Button>
              </div>
            </>
          )}
          {showBankDetails && (
            <Stack
              p={2}
              direction="row"
              spacing={2}
              sx={{
                borderBottom: `1px solid ${theme.palette.grey[700]}`,
                justifyContent: "center",
              }}
            >
              <Typography
                className="primary-text-color"
                sx={{ alignItems: "center" }}
                variant="subtitle2"
              >
                Bank Details
              </Typography>
            </Stack>
          )}
          <Loader loading={loading} />
          <Modal open={open} onClose={handleClose}>
            <AddVerificationDocument
              widthScreen={widthScreen}
              onAttachDocument={onAttachDocument}
              handleClose={handleClose}
            />
          </Modal>
          <Modal open={openModal} onClose={handleClose}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h1" component="h1">
                Identity Verification Modal
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="h4"
                sx={{ mt: 2, mb: 2 }}
              >
                Please click on "Capture Button" to take your photo
              </Typography>
              <CaptureImageComponent
                handleClose={handleClose}
                handleSubmit={handleKYC}
              />
            </Box>
          </Modal>

          {state.active === 1 && !showBankDetails && (
            <FirstStep nextStep={handleNextStep} />
          )}
          {state.active === 2 && (
            <>
              {_.includes(["United States", "Canada"], state.country) ? (
                <SecondPageUsa nextStep={handleNextStep} />
              ) : (
                <SecondPageOther nextStep={handleNextStep} />
              )}
            </>
          )}
          {state.active === 3 && <ThirdPage nextStep={handleNextStep} />}
          {showBankDetails &&
            bankData.length &&
            ([...bankData.filter((d:any) => d.primary === true),...bankData.filter((d:any) => d.primary === false)] || []).map((bank: string | any, index: number) => (
              <Stack key={index} sx={{ background: "#0b1419" }} p={2} mb={2}>
                <Stack
                  direction="row"
                  gap={1}
                  sx={{ pr: 1, justifyContent: "space-between" }}
                >
                  <Typography
                    className="primary-text-color"
                    style={{ fontSize: "16px" }}
                  >
                    Account Number:*** *** ****{" "}
                    {bank ? bank.accountNumber.substr(-4) : ""}
                  </Typography>
                  <IconButton
                    key={index}
                    aria-controls={
                      openMenu ? "demo-positioned-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={(e) => handleClick(e, index)}
                    style={{ width: "10px", height: "5px" }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Stack>
                <Stack
                  direction="row"
                  gap={2}
                  pb={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Stack direction="row" alignItems="center">
                    <Stack>
                      <Menu
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={openMenu === index}
                        style={{ padding: "0" }}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <MenuItem onClick={() => onUpdatePrimary(bank.id)}>
                          {bank.primary ? "Not Primary" : "Primary"}
                        </MenuItem>
                      </Menu>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  gap={2}
                  pb={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Stack>
                    <Typography
                      className="secondary-text-color"
                      style={{ fontSize: "16px" }}
                      mx={2}
                    >
                      Country : {bank.country}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      className="secondary-text-color"
                      style={{ fontSize: "16px" }}
                      mx={2}
                    >
                      City : {bank.city}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      className="secondary-text-color"
                      style={{ fontSize: "16px" }}
                      mx={2}
                    >
                      State : {bank.state}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      className="secondary-text-color"
                      style={{ fontSize: "16px" }}
                      mx={2}
                    >
                      Post Code : {bank.postCode}
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
                      style={{ fontSize: "14px" }}
                    >
                      {bank.primary ? "Primary" : "Not Primary"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default BankContainer;
