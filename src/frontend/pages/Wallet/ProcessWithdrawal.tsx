import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";

import {
  Button,
  FormControl,
  Stack,
  Typography,
  InputAdornment,
  FilledInput,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeContext } from "../../contexts/ThemeContext";
import { RootState } from "frontend/redux/store";
import { useSelector } from "react-redux";
import _axios from "frontend/api/axios";
import { toast } from "react-toastify";

const ProcessWithdrawal = () => {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const { balance } = useSelector((rootState: RootState) => rootState.wallet);
  const userData = useSelector((state: RootState) => state?.user?.userData);

  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onCompleteWithdraw = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!parseInt(amount)) {
      return toast.error("Please enter valid amount!");
    }
    const data = {
      user_id: userData?.id,
      amount: parseInt(amount),
    };
    _axios
      .post(`/api/user/withdraw-dint/`, data)
      .then((res: any) => {
        setLoading(true);
        if (res?.data && res.data.code === 400) {
          setLoading(false);
          toast.error("Action Failed");
        } else {
          _axios
            .post(`/api/user/request_payouts/`, {
              amount: parseInt(amount),
            })
            .then((res: any) => {
              if (res?.data && res.data.code === 400) {
                setLoading(false);
                toast.error("Action Failed");
              } else {
                setLoading(false);
                toast.success("Account Updated successfully.");
                return navigate("/dint-wallet");
                
              }
            })
            .catch((error: any) => {
              toast.error("Action Failed");
              console.error("error in update bank", error);
            });
        }
      })
      .catch((error: any) => {
        toast.error("Action Failed");
        console.error("error in update bank", error);
      });
  };

  return (
    <Stack mt={4} px={2}>
      {loading === true ? (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000029",
              zIndex: "999",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <Row>
        <Col md={7}>
          <form>
            <Stack>
              <Stack mb={2}>
                <ArrowBackIcon
                  style={{
                    color: toggle ? "white" : "#161C24",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/en/fiat/withdraw/EUR");
                  }}
                />
              </Stack>
              <Typography
                className="capitalize-text"
                variant="subtitle1"
                style={{
                  color: toggle ? "white" : "#161C24",
                }}
              >
                2. Enter Amount
              </Typography>
              <Stack mt={3}>
                <FormControl variant="filled">
                  <Stack
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <FormHelperText
                      id="filled-weight-helper-text"
                      style={{
                        color: toggle ? "white" : "#161C24",
                        margin: "0px",
                      }}
                    >
                      Amount
                    </FormHelperText>
                    <FormHelperText
                      id="filled-weight-helper-text"
                      style={{
                        color: toggle ? "white" : "#161C24",
                        margin: "0px",
                      }}
                    >
                      Transaction Requirement{" "}
                      <InfoIcon style={{ fontSize: "16px" }} />
                    </FormHelperText>
                  </Stack>
                  <FilledInput
                    id="filled-adornment-weight"
                    // label="Enter Amount"
                    endAdornment={
                      <InputAdornment position="end">
                        <Stack sx={{ flexDirection: "row" }}>
                          <Typography
                            variant="subtitle4"
                            style={{
                              marginRight: "5px",
                              color: toggle ? "white" : "#161C24",
                            }}
                          >
                            Balance:
                          </Typography>
                          <Typography
                            variant="subtitle5"
                            style={{
                              color: toggle ? "white" : "#161C24",
                            }}
                          >
                            {`$ ${balance}` || "0.00 EUR"}
                          </Typography>
                        </Stack>
                      </InputAdornment>
                    }
                    value={amount}
                    required
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    aria-describedby="filled-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    sx={{
                      backgroundColor: toggle
                        ? "rgba(255, 255, 255, 0.09)"
                        : "#DFE3E8",
                      color: toggle ? "white" : "#161C24",
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack mt={4} className="d-flex">
                <Stack>
                  <Typography
                    variant="subtitle4"
                    style={{
                      fontSize: "12px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                    You recive:
                  </Typography>
                  <Typography
                    className="capitalize-text"
                    variant="subtitle1"
                    style={{
                      fontSize: "26px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                    0.00 EUR
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row" }} mt={3} mb={1}>
                  <Typography
                    variant="subtitle4"
                    style={{
                      width: "200px",
                      fontSize: "14px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                    Card Number:
                  </Typography>
                  <Typography
                    variant="subtitle5"
                    style={{ color: toggle ? "white" : "#161C24" }}
                  >
                    0.00 EUR
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row" }} mb={1}>
                  <Typography
                    variant="subtitle4"
                    style={{
                      width: "200px",
                      fontSize: "14px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                    Transaction Mathod:
                  </Typography>
                  <Typography
                    variant="subtitle5"
                    style={{ color: toggle ? "white" : "#161C24" }}
                  >
                    Bank Card (Visa)
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row" }} mb={1}>
                  <Typography
                    variant="subtitle4"
                    style={{
                      width: "200px",
                      fontSize: "14px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                    Transaction Fee:
                  </Typography>
                  <Typography
                    variant="subtitle5"
                    style={{ color: toggle ? "white" : "#161C24" }}
                  >
                    0.00 EUR
                  </Typography>
                </Stack>
              </Stack>
              <Stack mt={4} direction="row" sx={{ flexDirection: "row" }}>
                <Stack style={{ width: "50%" }} px={1}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      color: "white",
                      width: "100%",
                      backgroundColor: "rgb(69, 79, 91)",
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      navigate("/en/fiat/withdraw/EUR");
                    }}
                  >
                    {" "}
                    Previous
                  </Button>
                </Stack>
                <Stack style={{ width: "50%" }} px={1}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ color: "white", width: "100%" }}
                    onClick={(e) => onCompleteWithdraw(e)}
                  >
                    {" "}
                    Continue
                  </Button>
                </Stack>
              </Stack>
              <Stack mt={2}>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: toggle ? "white" : "#161C24",
                  }}
                >
                  The withdraw to card service is powered by Bifinity UAB
                  (Company Registration Number: 305595206, registered office
                  address: Didžioji g. 18, Vilnius, Lithuania).
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Col>
        <Col>
          <Typography
            className="capitalize-text"
            variant="subtitle1"
            style={{ color: toggle ? "white" : "#161C24" }}
          >
            Notice
          </Typography>
          <Stack
            mt={3}
            sx={{ color: toggle ? "white" : "#161C24", fontSize: "12px" }}
          >
            <Stack>
              <li>
                Please note that Binance only accepts 1st party transfers with
                accounts in your name (3rd party transfers are not allowed) and
                will not be held responsible for any potential losses/rejection
                of funds associated with 3rd party transfers.
              </li>
            </Stack>
            <Stack mt={3}>
              <li>
                Withdrawals via French banks SOCIETE GENERALE S.A./LE CREDIT
                LYONNAIS/BNP PARIBAS may experience transaction declines. If you
                experience such issues, please try with another card.
              </li>
            </Stack>
            <Stack mt={3}>
              We do not support withdrawing EUR to Binance Visa card. You can
              transfer EUR from your Spot Wallet to Funding Wallet and it will
              be immediately be available for use.
            </Stack>
          </Stack>
        </Col>
      </Row>
      )}
    </Stack>
  );
};

export default ProcessWithdrawal;
