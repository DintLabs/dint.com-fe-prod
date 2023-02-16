import { Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';

import Submenu from 'frontend/components/submenu';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import _axios from 'frontend/api/axios';

const MainReferrals = () => {
  const [refLink , setRefLink] = useState('https://dint.com/');
  const { toggle } = useContext(ThemeContext);
  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    toast.success('Copied!');
  };

  useEffect(()=>{
    const getRefCode = async() =>{
      await _axios.get('api/user/get_referral_id/').then(({data}:any)=>{
        if(data){
          setRefLink(`https://dint.com/?ref=${data.data[0]}`)
        }
      }).catch((err:any)=>console.log(err))
    }
    getRefCode()
  },[])

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="REFERRAL PROGRAM" username=" " routes={[]} noTag md={12} />

      <GridWithBoxConteiner  sx={{
              color:"#919eab",
              '&:hover' : {
                color: toggle ? '#fff' : "#6f42c1"
              }
          }} >
        <FlexCol>
          <Typography 
           variant="subtitle2">
            CURRENT REFERRAL EARNINGS
          </Typography>
          <Typography variant="caption">
            Please note, if you do not reach the minimym ypur earnings will roll over tp the next
            monthly pay
          </Typography>
        </FlexCol>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner sx={{
              color:"#919eab",
              '&:hover' : {
                color: toggle ? '#fff' : "#6f42c1"
              }
          }} >
        <FlexCol>
          <Typography variant="subtitle2">
            YOUR PERSONAL REFERRAL URL
          </Typography>
          <Typography variant="caption" id="ref-link">
            {refLink}
          </Typography>
        </FlexCol>
        <FlexRow color="#00aeff" onClick={copyLink}>
          COPY
        </FlexRow>
      </GridWithBoxConteiner>

      <Submenu title="" username="REFERRAL EARNINGS STATEMENT" routes={[]} noTag md={12} />
      <GridWithBoxConteiner sx={{
              color:"#919eab",
              '&:hover' : {
                color: toggle ? '#fff' : "#6f42c1"
              }
          }}>
        <Typography variant="caption">
          You dont not have payouts yet
        </Typography>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography
          className="primary-text-color labels"
          variant="subtitle2"
          sx={{ width: '100%' ,color:"#919eab",
          '&:hover' : {
            '& .referrals' :{
              color: toggle ? '#fff' : "#6f42c1"
            }} 
          }}
        >
          <FlexRow ai="center" jc="space-between" w="100%">
            <Typography 
            variant='subtitle2' className='referrals'> YOUR REFERRALS </Typography><SearchIcon />
          </FlexRow>
        </Typography>
      </GridWithBoxConteiner>
    </Grid>
  );
};

export default MainReferrals;
