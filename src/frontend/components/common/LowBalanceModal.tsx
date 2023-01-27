import React from "react";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router";

type LowbBalancePayload = {
  isOpen: boolean;
  handleClose: () => void;
};

const StyledDailog = styled(Dialog)(() => ({
  "& .MuiTypography-h6": {
    color: "black",
    padding: "16px 24px",
    fontSize: "1.25rem",
    fontWeight: 500,
  },
  "& .MuiDialog-paper": {
    backgroundColor: "white",
  },
}));
const LowBalanceModal = (props: LowbBalancePayload) => {
  const navigate = useNavigate();

  const { isOpen, handleClose } = props;
  return (
    <StyledDailog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <ErrorOutlineIcon
          color="error"
          sx={{ fontSize: "22px", marginRight: "7px" }}
        />
        Insufficient Balance
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to process this transaction you must purchase Dint Tokens
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => navigate(`/buy-dint-token`)}>
          Buy Dint Tokens
        </Button>
      </DialogActions>
    </StyledDailog>
  );
};

export default LowBalanceModal;
