import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  Typography,
  Button,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Box,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { currencyData } from "./currency";
import { ThemeContext } from "../../contexts/ThemeContext";
import _axios from "frontend/api/axios";
import { toast } from "react-toastify";
import { FormHelperText } from "@mui/material";

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

const Withdrawal = () => {
  const param = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const cur = param.currency;
  const { toggle } = useContext(ThemeContext);
  const [bankSelect, setBankSelect] = useState();
  const [bankData, setBankData] = useState<any | []>([]);
  const { handleSubmit, formState, control } =
    useForm({
      mode: "onChange",
    });

  useEffect(() => {
    _axios
      .get("api/user/get_bank_accounts/")
      .then((res: any) => {
        res?.data?.data?.length
          ? (setBankData(res.data.data),
            setBankSelect(
              res?.data?.data.find((data: any) => data.primary === true)
            ))
          : navigate("/your-bank");
      })
      .catch((error: any) => {
        console.log("error fetch bank details", error);
        toast.error("Action Failed");
      });
  }, []);

  const submitValues = () => {
    navigate("/processWithdraw");
  };
  const handleChange = (e: any) => {
    setBankSelect(e.target.value);
  };
  return (
    <Stack mt={5} px={2}>
      <Row>
        <Col md={8}>
          <form onSubmit={handleSubmit(submitValues)}>
            <Stack>
              <TabPanel value={0} index={0}>
                <FormControl style={{ padding: "0" }} fullWidth>
                  {bankSelect && (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      onChange={(e) => handleChange(e)}
                      value={bankSelect}
                      style={{ background: "#DFE3E8", borderRadius: "5px" }}
                    >
                      {[
                        ...bankData.filter((d: any) => d.primary === true),
                        ...bankData.filter((d: any) => d.primary === false),
                      ]?.map((bank: string | any, index: number) => {
                        return (
                          <MenuItem
                            style={{ paddingTop: "0px", paddingBottom: "0" }}
                            value={bank}
                          >
                            <Stack
                              className="card"
                              key={index}
                              sx={{
                                background: "#0b1419",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                              p={1}
                              m={1}
                            >
                              <Stack
                                key={index}
                                sx={{ background: "#0b1419" }}
                                p={2}
                                mb={2}
                              >
                                <Stack
                                  direction="row"
                                  gap={1}
                                  sx={{
                                    pr: 1,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    className="primary-text-color"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Account Number:*** *** ****{" "}
                                    {bank ? bank.accountNumber.substr(-4) : ""}
                                  </Typography>
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
                            </Stack>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                </FormControl>
              </TabPanel>
              <Typography
                className="capitalize-text"
                variant="subtitle1"
                style={{
                  color: toggle ? "white" : "#161C24",
                }}
              >
                1. Select currency
              </Typography>
              <Stack mt={3}>
                <FormControl variant="filled" style={{ flex: 1 }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Currency
                  </InputLabel>
                  <Controller
                    control={control}
                    name="currency"
                    rules={{ required: true }}
                    render={({ field: { onChange, value = '', ref } }: any) => (
                      <Select
                        inputRef={ref}
                        className="mb-3"
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        style={{
                          backgroundColor: toggle
                            ? "rgba(255, 255, 255, 0.13)"
                            : "#DFE3E8",
                          color: toggle ? "white" : "#161C24",
                        }}
                      >
                        {currencyData.map((currency: string, index: number) => (
                          <MenuItem
                            style={{
                              backgroundColor: toggle
                                ? "rgba(255, 255, 255, 0.13)"
                                : "#DFE3E8",
                              color: toggle ? "white" : "#161C24",
                            }}
                            key={index}
                            value={currency}
                          >
                            {currency}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {formState.errors?.currency?.type === "required" && (
                    <FormHelperText error={true}>
                      Currency is required
                    </FormHelperText>
                  )}
                  {/* <Select
                    label="Currency"
                    variant="filled"
                    style={{
                      backgroundColor: toggle
                        ? "rgba(255, 255, 255, 0.13)"
                        : "#DFE3E8",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                    {currencyData.map((currency: string, index: number) => (
                      <MenuItem
                        style={{
                          backgroundColor: toggle
                            ? "rgba(255, 255, 255, 0.13)"
                            : "#DFE3E8",
                          color: toggle ? "white" : "#161C24",
                        }}
                        key={index}
                        value={currency}
                      >
                        {currency}
                      </MenuItem>
                    ))}
                  </Select> */}
                </FormControl>
              </Stack>
              <Stack
                mt={4}
                sx={{ flexDirection: "row", alignItems: "flex-start" }}
              >
                <Stack>
                  {/* <FormControlLabel
                value="1"
                control={<Radio />}
                sx={{ color: 'white',width:'unset' }}
               label=''/>
               */}
                </Stack>
                <Stack>
                  <Typography
                    className="capitalize-text"
                    variant="subtitle4"
                    style={{
                      fontSize: "16px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                 
                  </Typography>
                  <Typography
                    className="capitalize-text"
                    variant="subtitle5"
                    style={{
                      fontSize: "14px",
                      color: toggle ? "white" : "#161C24",
                    }}
                  >
                  
                  </Typography>
                </Stack>
              </Stack>
              <Stack mt={4} justifyContent="start" direction="row">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ color: "white", width: "100%" }}
                >
                  {" "}
                  Submit
                </Button>
              </Stack>
              <Stack mt={2}>
                <Typography
                  variant="subtitle6"
                  style={{
                    fontSize: "12px",
                    color: toggle ? "white" : "#161C24",
                  }}
                >
                 Your information is
                  used for identity verification only, and will be kept secure
                  by Dint.
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Col>
        <Col>
          <Typography
            className="capitalize-text"
            variant="subtitle1"
            style={{
              color: toggle ? "white" : "#161C24",
            }}
          >
            FAQ
          </Typography>
          <Stack mt={3}>
            <Accordion
              sx={{
                backgroundColor: toggle ? "#212B36" : "white",
                color: toggle ? "white" : "#161C24",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How long does the withdrawal take?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                A withdrawal might take up to 7 business days.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Col>
      </Row>
    </Stack>
  );
};

export default Withdrawal;
