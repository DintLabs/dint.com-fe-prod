import { Button, Grid, Stack, TextField } from '@mui/material';
import Submenu from 'frontend/components/submenu';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { useContext, useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';

import styled from 'styled-components';
import { ThemeContext } from '../../../../contexts/ThemeContext';

const TextStyled = styled(TextField)`
  .MuiInputBase-root {
    padding-left: 15px;
  }
`;

const Google = () => {
  const [content, setContent] = useState('max@dint.com');
  const { toggle } = useContext(ThemeContext);

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="GOOGLE ACCOUNT" username="" routes={[]} noTag md={12} />

      <GridWithBoxConteiner>
        <FlexRow pos="absolute" pos_L="20px">
          <GoogleIcon />
        </FlexRow>

        <TextStyled
          id="outlined-basic"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ width: '100%',
            '& .MuiInputBase-input': {
              color: toggle ? 'white' : '#161c24'
            }
          }}
        />
      </GridWithBoxConteiner>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ width: '100%', margin: '10px' }}
      >
        <Button variant="outlined">DISCONNECT</Button>
      </Stack>
    </Grid>
  );
};

export default Google;
