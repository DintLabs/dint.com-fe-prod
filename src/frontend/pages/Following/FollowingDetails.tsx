import React from 'react'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import FollowingPageCard from './FollowingPageCard'

const BoxWrapper = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',

  '@media (max-width: 899px)': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '& .innerBox': {
    border: '1px solid #000',
    borderRadius: '50px',
    p: '7px 15px 7px 10px',
    m: '0 5px 15px 5px',
  },
}

const FollowingDetails = ({ followings }: any) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={BoxWrapper}>
          {followings?.map((following: any) => (
            <Box className='innerBox' key={following?.id}>
              <FollowingPageCard following={following} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}

export default FollowingDetails
