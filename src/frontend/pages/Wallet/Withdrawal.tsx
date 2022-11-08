import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
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
  AccordionSummary, AccordionDetails,Accordion
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { currencyData } from './currency';
import { ThemeContext } from '../../contexts/ThemeContext';

const Withdrawal = () => {
  const param = useParams();
  const navigate = useNavigate();
  const cur = param.currency;
  const { toggle } = useContext(ThemeContext);

  const onSubmit = () => {
    navigate('/processWithdraw')
  }
  return (
    <Stack mt={5} px={2}>
    <Row>
      <Col md={8} >
      <form>
        <Stack >
          <Typography className="capitalize-text" variant="subtitle1" style={{
            color: toggle ? 'white' : '#161C24'
          }}>
            1. Select currency
          </Typography>
          <Stack mt={3}>
            <FormControl variant="filled" style={{ flex: 1 }}>
              <InputLabel id="demo-simple-select-filled-label">Currency</InputLabel>
              <Select
                label="Currency"
                variant="filled"
                style={{
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
              >
                {currencyData.map((currency:string,index:number)=>
                  <MenuItem
                    style={{
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                      color: toggle ? 'white' : '#161C24'
                    }}
                    key={index}
                    value={currency}>
                    {currency}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Stack>
          <Stack mt={4} sx={{ flexDirection: 'row',alignItems:"flex-start" }}>

              <Stack>

              {/* <FormControlLabel
                value="1"
                control={<Radio />}
                sx={{ color: 'white',width:'unset' }}
               label=''/>
               */}
              </Stack>
              <Stack>
                <Typography className="capitalize-text" variant="subtitle4" style={{fontSize:"16px", color: toggle ? 'white' : '#161C24'}}>
                  Bank Transfer (SEPA)
                </Typography>
                <Typography className="capitalize-text" variant="subtitle5" style={{fontSize:"14px", color: toggle ? 'white' : '#161C24'}}>
                  1 EUR
                </Typography>

              </Stack>
          </Stack>
          <Stack mt={4} justifyContent="start" direction="row">
            <Button
              variant="contained"
              type="submit"
              sx= {{ color: 'white', width:'100%' }}
              onClick={onSubmit}
            > Submit
            </Button>
          </Stack>
          <Stack mt={2}>
            <Typography variant="subtitle6" style={{fontSize:"12px", color: toggle ? 'white' : '#161C24'}}>
              This service is powered by Bifinity UAB. Your information is used for identity verification only, and will be kept secure by Bifinity UAB.
            </Typography>
          </Stack>
        </Stack>
      </form>
      </Col>
      <Col >
        <Typography className="capitalize-text" variant="subtitle1" style={{
          color: toggle ? 'white' : '#161C24'
        }}>
          FAQ
        </Typography>
        <Stack mt={3}>
          <Accordion sx={{
            backgroundColor: toggle ? '#212B36' : 'white',
            color: toggle ? 'white' : '#161C24'
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>How long does the withdrawal take?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                SEPA might take about 1-4 business days.
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