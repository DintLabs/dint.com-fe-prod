import React from 'react'
import Card from '@mui/material/Card';
import { CardContent, Typography, useTheme } from '@mui/material';
import logo from '../../assets/img/logos/logo.png'
export default function Cards(props: any) {
  const theme = useTheme(props);
  const { token } = props
  return (
    <div>
      <Card style={{ background: '#F7F6F6', display: 'flex', justifyContent: 'center', marginTop: '20px' }} >
        <CardContent >
          <Typography style={{ color: 'black', padding: '10px',fontSize: '13.7319px',fontFamily:'Roboto',fontWeight:'600' }}>{token.tokenName}</Typography>
          <img src={logo} alt="logo" id="logo_card" style={{ maxHeight: '50px', padding: '10px' }} />{" "}
          <Typography style={{ color: 'black', padding: '10px',fontSize: '13.7319px',fontFamily:'Roboto',fontWeight:'600'  }}>${token.price}</Typography>
          <button style={{ background: '#4AA081', border: 'none', color: 'white', borderRadius: '5px', width: '95%' }} onClick={() => props.onBuyClick(token.price)}>Buy</button>
        </CardContent>
      </Card>
    </div>
  )
}
