import React, { useState, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Radio,
  useTheme,
  FormControlLabel,
  Box,
  Divider,
  Chip,
  Switch,
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Controller, useForm } from "react-hook-form";
import {
  AddCreditCard,
  getCreditCards,
} from "../../redux/actions/StripeAction";
import { useDispatch } from "../../redux/store";
import { statesData } from "./states";
import { ThemeContext } from "../../contexts/ThemeContext";
import { RadioGroup } from "@mui/material";

const AddCard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validAge, setValidAge] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);

  const { handleSubmit, control, formState} = useForm({
    mode: 'onChange'
  });

  const submitValue = async (values: any) => {
    if(!validAge){
      toast.error("Minimum  age required.");
      return
    }
    setIsLoading(true);
    const formData = {
      ...values,
      exp_month:moment(values.date).format('MM'),
      exp_year:moment(values.date).format('YYYY'),
    };
    const data = _.omit(formData,['date']);
    dispatch(AddCreditCard(data)).then((res: boolean) => {
      toast.success('Card has been added successfully.');
      setIsLoading(false);
      navigate('/cards')
    }).catch((e)=>{
      toast.error(e.response.data.error);
      setIsLoading(false);
    })
  }

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
            height: '100vh'
          }}
        >

          <Stack
            p={1}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              borderBottom: `2px solid ${theme.palette.grey[700]}`
            }}
          >

            <IconButton size="small" onClick={() => navigate(-1)}>
              <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
            </IconButton>
            <Typography className="primary-text-color capitalize-text" variant="subtitle1">
              Add CARD
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(submitValue)}>
            <Stack p={2}>
              <Typography className="secondary-text-color capitalize-text" variant="subtitle1">
                BILLING DETAILS
              </Typography>
              <Typography className="primary-text-color" style={{ fontSize: '12px' }}>
                We are fully complaint with Payment Industry Data Security Standards.
              </Typography>

              <Stack direction="row" gap={2} mt={2}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = '', ref } }: any) => (
                    <FormControl variant="filled" style={{ flex: 1 }}>
                      <InputLabel>Country</InputLabel>
                     <Select
                        error={formState.errors?.country?.type === 'required'}
                        label="Country"
                        variant="filled"
                        value={value}
                        inputRef={ref}
                        onChange={(e: any) => onChange(e.target.value)}
                        style={{
                          backgroundColor: toggle
                            ? "rgba(255, 255, 255, 0.13)"
                            : "#DFE3E8",
                          color: toggle ? "white" : "#161C24",
                        }}
                      >
                        <MenuItem
                          style={{
                            backgroundColor: toggle ? "transparent" : "#DFE3E8",
                            color: toggle ? "white" : "#161C24",
                          }}
                          value="USA"
                        >
                          United States of America
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="state"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <FormControl variant="filled" style={{ flex: 1 }}>
                      <InputLabel>State</InputLabel>
                      <Select
                        error={formState.errors?.state?.type === "required"}
                        label="State"
                        variant="filled"
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        inputRef={ref}
                        style={{
                          backgroundColor: toggle
                            ? "rgba(255, 255, 255, 0.13)"
                            : "#DFE3E8",
                          color: toggle ? "white" : "#161C24",
                        }}
                      >
                        {statesData.map((state: string, index: number) => (
                          <MenuItem
                            style={{
                              backgroundColor: toggle
                                ? "transparent"
                                : "#DFE3E8",
                              color: toggle ? "white" : "#161C24",
                            }}
                            key={index}
                            value={state}
                          >
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>

              <Stack direction="row" gap={2} mt={2}>
                <Controller
                  name="street"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={formState.errors?.street?.type === "required"}
                      style={{ flex: 1 }}
                      label="Street"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
              </Stack>

              <Stack direction="row" gap={2} mt={2}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={formState.errors?.city?.type === "required"}
                      style={{ flex: 1 }}
                      label="City"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
                <Controller
                  name="zip_code"
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 6,
                  }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={
                        formState.errors?.zip_code?.type === "required" ||
                        formState.errors?.zip_code?.type === "maxLength"
                      }
                      style={{ flex: 1 }}
                      label="Zip code"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
              </Stack>

              <Typography
                pt={2}
                className="secondary-text-color capitalize-text"
                variant="subtitle1"
              >
                CARD DETAILS
              </Typography>

              <Stack direction="row" gap={2} mt={2}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={formState.errors?.email?.type === "required"}
                      style={{ flex: 1 }}
                      label="Email"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
                <Controller
                  name="card_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={formState.errors?.card_name?.type === "required"}
                      style={{ flex: 1 }}
                      label="Name on the card"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
              </Stack>
              <Stack direction="row" gap={2} mt={2}>
                <Controller
                  name="card_number"
                  control={control}
                  rules={{ required: true, maxLength: 16 }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={
                        formState.errors?.card_number?.type === "required" ||
                        formState.errors?.card_number?.type === "maxLength"
                      }
                      style={{ flex: 1 }}
                      label="Card number"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      inputProps={{ maxLength: 16 }}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
              </Stack>
              <Stack direction="row" gap={2} mt={2}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label="Expiry date"
                          views={['year']}
                          inputFormat="MM/YYYY"
                          value={value}
                          inputRef={ref}
                          onChange={(e: any) => onChange(e)}
                          renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            error={
                              formState.errors?.card_number?.type === "required"
                            }
                            sx={{
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
                    </LocalizationProvider>
                  )}
                />

                <Controller
                  name="cvc"
                  control={control}
                  rules={{ required: true, maxLength: 4 }}
                  render={({ field: { onChange, value = "", ref } }: any) => (
                    <TextField
                      error={
                        formState.errors?.cvc?.type === "required" ||
                        formState.errors?.cvc?.type === "maxLength"
                      }
                      style={{ flex: 1 }}
                      label="CVC"
                      inputRef={ref}
                      variant="filled"
                      value={value}
                      inputProps={{ maxLength: 4 }}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
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
              </Stack>

              <Stack direction="row" gap={2} mt={2}>
                <FormControl>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio />}
                      value={validAge} onChange={(e: any) => setValidAge(e.target.value)}
                      sx={{ color: toggle ? "white" : "#161C24" }}
                      label="Tick here to confirm that you are at least 18 years old and age of majority in your place of residence"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
                sx={{ marginTop: 2, marginBottom: 2 }}
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
     
      </Grid>
    </LocalizationProvider>
  );
};

export default AddCard;
