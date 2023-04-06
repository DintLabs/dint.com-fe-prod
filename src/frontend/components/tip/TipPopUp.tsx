import { FC, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
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
import { useSelector, RootState, useDispatch } from 'frontend/redux/store';
import { Box } from "@mui/material";
import LowBalanceModal from "../common/LowBalanceModal";
import { sendTip } from 'frontend/redux/slices/wallet';

interface TipPopUpProps {
  user: UserDataInterface | null;
  open: boolean;
  onClose: () => void;
}

const TipPopUp: FC<TipPopUpProps> = ({ open, onClose, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggle } = useContext(ThemeContext);

  const userData = useSelector((state: any) => state.user.userData);
  const { balance } = useSelector((state: RootState) => state.walletState);

  const { control } = useForm();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lowBalance, setLowBalance] = useState(false);
  const goToProfile = () => {
    navigate(`/${user && user.custom_username}`);
  };

  const sendClick = async () => {
    if (!user || !userData) return;

    setIsLoading(true);
    const toastId = toast.loading("");

    if (amount < 1) {
      toast.update(toastId, {
        render: 'Amount should not be less then 1',
        isLoading: false,
        type: 'error',
      });
      setIsLoading(false);
      return;
    }

    if (amount > balance) {
      toast.update(toastId, {
        render: 'Insufficient Funds!',
        isLoading: false,
        type: 'error',
      });
      setIsLoading(false);
      setLowBalance(true);
      return;
    }

    dispatch(sendTip({
      senderId: userData.id,
      receiverId: user.id,
      amount,
    }));

    setIsLoading(false);
    toast.update(toastId, {
      render: 'Transaction has been created. You can see details in the wallet history',
      isLoading: false,
      type: 'success',
    });

    onClose();
    setTimeout(() => toast.dismiss(), 2000);
  };

  return (
    <Dialog
      open={open}
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
          <Button disabled={isLoading} onClick={onClose}>
            CANCEL
          </Button>
          <Button disabled={isLoading} onClick={sendClick} autoFocus>
            SEND TIP
          </Button>
        </DialogActions>

        {isLoading && (
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
        )}
      </Box>

      <LowBalanceModal
        isOpen={lowBalance}
        handleClose={() => setLowBalance(false)}
      />
    </Dialog>
  );
};

export default TipPopUp;
