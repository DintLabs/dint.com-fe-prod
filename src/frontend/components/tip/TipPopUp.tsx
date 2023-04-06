import { FC, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import _axios from "frontend/api/axios";
import { toast } from "react-toastify";
import { truncate } from "../common/utils";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { UserDataInterface } from "frontend/interfaces/reduxInterfaces";
import { FlexRow } from "frontend/reusable/reusableStyled";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useSelector, RootState } from "frontend/redux/store";
import { ethers } from "ethers";
import { Box } from "@mui/material";
import LowBalanceModal from "../common/LowBalanceModal";

interface TipPopUpProps {
  user: UserDataInterface | null;
  openPopUpTip: boolean;
  setOpenPopUpTip: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onOpen: () => void;
}

const TipPopUp: FC<TipPopUpProps> = ({
  openPopUpTip,
  setOpenPopUpTip,
  onClose,
  onOpen,
  user,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);
  const userData = useSelector((state: any) => state.user.userData);
  const { address, balance } = useSelector(
    (rootState: RootState) => rootState.wallet
  );

  const { control } = useForm();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dintTxn, setDintTxn] = useState<any>();
  const [lowBalance, setLowBalance] = useState(false);
  const goToProfile = () => {
    navigate(`/${user && user.custom_username}`);
  };
  const sendClick = async () => {
    setLoading(true);
    const toastId = toast.loading("");
   

    if (amount >= 1) {
      const sendDetail = {
        sender_id: userData?.id,
        reciever_id: user?.id,
        amount: amount,
      };
      if(amount < balance){
        setLoading(false);
        console.log("more----", amount, balance);
        const sendDetail = {
          sender_id: userData?.id,
          reciever_id: user?.id,
          amount: amount,
        };
        if (sendDetail) {
          await _axios
            .post(`api/user/send-dint/`, sendDetail)
            .then((response: any) => {
              setDintTxn(response.data);
              if (response.data.code == 201) {
                setLoading(false);
                toast.update(toastId, {
                  render: "Dint Sent Successfully",
                  type: "success",
                  isLoading: false,
                });
              } else {
                setLoading(false);
                toast.update(toastId, {
                  render: "Something went wrong!",
                  type: "error",
                  isLoading: false,
                });
              }
            })

            .catch((error: any) => {
              setLoading(false);
              console.log("err", error);
              toast.update(toastId, {
                render: "Something went wrong!",
                type: "error",
                isLoading: false,
              });
            });
        }
      }else{
          toast.update(toastId, {
            render:`Insufficient Funds!`,
            type: "error",
            isLoading: false,
          });
        setLoading(false);
        setLowBalance(true);
      }


      
    } else {
      toast.update(toastId, {
        render: "Amount Should not be  less then 1",
        type: "error",
        isLoading: false,
      });
      setLoading(false);
    }
    setTimeout(() => toast.dismiss(), 2000);
  };

  const handleConfirmation = () =>{
    setLowBalance(false);
  }

  return (
    <Dialog
      open={openPopUpTip}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: toggle ? "#212B36" : "#DFE3E8",
        },
      }}>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: toggle ? "white" : "#161C24" }}>
          SEND TIP
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "300px",
            justifyContent: "space-between",
          }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ width: "100%", color: toggle ? "white" : "#161C24" }}
            component="span">
            <FlexRow ai="center" w="100%" jc="space-around">
              <Avatar
                component="span"
                onClick={goToProfile}
                src={user?.profile_image}
                sx={{ width: 75, height: 75, cursor: "pointer" }}
              />
              <Stack component="span">
                <Typography
                  component="span"
                  onClick={goToProfile}
                  variant="h3"
                  sx={{
                    color: toggle ? "text.primary" : "#000000",
                    cursor: "pointer",
                  }}>
                  {user?.display_name || ""}
                </Typography>
                <Typography
                  component="span"
                  onClick={goToProfile}
                  variant="h6"
                  sx={{ color: "text.secondary", cursor: "pointer" }}>
                  {user?.custom_username || ""}
                </Typography>
              </Stack>
            </FlexRow>
          </DialogContentText>

          <DialogContentText id="alert-dialog-description" component="span">
            <FormControl fullWidth>
              <Controller
                control={control}
                name="tip_amount"
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({ field: { onChange, value = "", ref } }: any) => (
                  <TextField
                    // error={}
                    inputRef={ref}
                    value={value}
                    label="Tip amount"
                    variant="filled"
                    onChange={(e: any) => {
                      onChange(e.target.value);
                      setAmount(e.target.value);
                    }}
                    sx={{
                      flex: 1,
                      "& .MuiFormHelperText-root": {
                        color: theme.palette.grey[600],
                        marginLeft: 0,
                      },
                      "& .MuiFilledInput-input": {
                        color: toggle ? "white" : "#161C24",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: toggle
                          ? "rgba(255, 255, 255, 0.09)"
                          : "#DFE3E8",
                        "&:focus, &:hover": {
                          backgroundColor: "",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {/* {isUniqueUsername ? <BsCheckLg color="green" /> : <ImCross color="red" />} */}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
            <Typography
              component="span"
              variant="caption"
              sx={{ color: "text.secondary", cursor: "pointer" }}>
              Minimum $1 USD
            </Typography>
          </DialogContentText>

          <DialogContentText id="alert-dialog-description" component="span">
            <FormControl fullWidth>
              <Controller
                control={control}
                name="message"
                defaultValue=""
                render={({ field: { onChange, value = "", ref } }: any) => (
                  <TextField
                    inputRef={ref}
                    value={value}
                    label="Message (optional)"
                    variant="filled"
                    onChange={(e: any) => {
                      onChange(e.target.value);
                    }}
                    sx={{
                      flex: 1,
                      "& .MuiFormHelperText-root": {
                        color: theme.palette.grey[600],
                        marginLeft: 0,
                      },
                      "& .MuiFilledInput-input": {
                        color: toggle ? "white" : "#161C24",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: toggle
                          ? "rgba(255, 255, 255, 0.09)"
                          : "#DFE3E8",
                        "&:focus, &:hover": {
                          backgroundColor: "",
                        },
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: "10px 24px 20px" }}>
          <Button disabled={loading} onClick={onClose}>
            CANCEL
          </Button>
          <Button disabled={loading} onClick={sendClick} autoFocus>
            SEND TIP
          </Button>
        </DialogActions>
        {dintTxn ? (
          <>
            <Box sx={{ p: "10px 24px 20px" }}>
              <Typography
                sx={{ color: "#6a6a6a" }}
                component={"h6"}
                // sx={{ color: "text.secondary" }}
              >
                <Typography
                  component={"span"}
                  sx={{ color: "#000000", fontWeight: "bold" }}>
                  Status:
                </Typography>{" "}
                {dintTxn.message}
              </Typography>

              <Typography
                sx={{ color: "#000000", fontWeight: "bold" }}
                component={"h6"}
                // sx={{ color: "text.secondary" }}
              >
                Transaction Hash:{" "}
                <Typography
                  sx={{ color: "#7635dc", textDecoration: "none" }}
                  component="a"
                  href={`https://polygonscan.com/tx/${dintTxn.data.Hash}`}
                  target="_blank">
                  {truncate(dintTxn.data.Hash, 18)}
                </Typography>
              </Typography>
            </Box>
          </>
        ) : (
          ""
        )}
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
              }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
      <LowBalanceModal isOpen={lowBalance} handleClose={() => handleConfirmation()} />
    </Dialog>
  );
};

export default TipPopUp;
