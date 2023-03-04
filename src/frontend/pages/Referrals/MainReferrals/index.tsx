import { Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import SearchIcon from '@mui/icons-material/Search';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';

import Submenu from 'frontend/components/submenu';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import _axios from 'frontend/api/axios';
import React from 'react';
import { isMobile } from 'frontend/utils';

const MainReferrals = () => {
  const [qrCodeColor, setQrCodeColor] = useState('#000000');
  const [refLink, setRefLink] = useState('https://dint.com/');
  const [refCode, setRefCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const { toggle } = useContext(ThemeContext);

  function handleQrCodeColorChange(newColor: React.SetStateAction<string>) {
    setQrCodeColor(newColor);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    toast.success('Referral link copied!');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(refCode);
    toast.success('Referral code copied!');
  };

  const shareQrCode = async () => {
    const canvas = document.getElementById('qr-code-canvas');
    const qrCodeUrl = canvas.toDataURL('image/png');
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join Dint with my referral code at sign up ${refCode}, or just scan my QR code`,
          files: [
            new File([await (await fetch(qrCodeUrl)).blob()], 'qr-referral-code.png', {
              type: 'image/png'
            })
          ]
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      console.warn('Web Share API not supported');
    }
  };

  const getRefUrl = async () => {
    try {
      const response = await _axios.get('api/user/get_referral_id/');
      if (response.data && response.data.data && response.data.data.length > 0) { // Check that data exists and has length > 0
        const code = response.data.data[0];
        setRefLink(`https://dint.com/auth/refer?ref=${code}`);
        setRefCode(code);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQrCodeUrl = async () => {
    try {
      const url = `https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&address=${encodeURIComponent(
        refLink
      )}`;
      setQrCodeUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch referral data and generate QR code when the component is mounted
  useEffect(() => {
    getRefUrl();
  },[]); // Only fetch referral URL, not QR code URL

  // Generate QR code URL when referral URL changes
  useEffect(() => {
    getQrCodeUrl();
  }, [refLink]);  // Re-generate QR code URL when referral URL changes

  return (

    <Grid container sx={{ position: 'relative' }}>
      <Submenu title="REFERRAL PROGRAM" username=" " routes={[]} noTag md={12} />
  
      <GridWithBoxConteiner
        sx={{
          color: '#919eab',
          '&:hover': {
            color: toggle ? '#fff' : '#fff'
          }
        }}
      >
        <FlexCol>
          <Typography variant="subtitle2"> REFERRAL CODE</Typography>
          <Typography variant="caption" id="ref-code">
            {refCode}
          </Typography>
        </FlexCol>
        <FlexRow color="#00aeff" onClick={copyCode}>
          COPY
        </FlexRow>
      </GridWithBoxConteiner>
  
      <GridWithBoxConteiner
        sx={{
          color: '#919eab',
          '&:hover': {
            color: toggle ? '#fff' : '#fff'
          }
        }}
      >
        <FlexCol>
          <Typography variant="subtitle2">REFERRAL URL</Typography>
          <Typography variant="caption" id="ref-link">
            {refLink}
          </Typography>
        </FlexCol>
        <FlexRow color="#00aeff" onClick={copyLink}>
          COPY
        </FlexRow>
      </GridWithBoxConteiner>
  
   

    {/* Other code here */}
{/* QR Code */}
<GridWithBoxConteiner sx={{
  color: '#919eab',
  '&:hover': {
    color: toggle ? '#fff' : '#fff'
  }
}}>
  <Typography variant="subtitle2">REFERRAL QR CODE</Typography>
  <QRCode value={refLink} size={200} fgColor={qrCodeColor} id="qr-code-canvas" />
  <div>
    <Typography variant="caption" style={{ marginTop: '10px' }}>
      Choose QR Code color:
    </Typography>
    <input type="color" value={qrCodeColor} onChange={(e) => handleQrCodeColorChange(e.target.value)} />
  </div>
  {isMobile() ? (
    <React.Fragment>
      <FlexRow color="#00aeff" onClick={shareQrCode}>
        SHARE
      </FlexRow>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <FlexRow color="#00aeff" onClick={() => {document.getElementById('qr-code-canvas').toBlob(function (blob: string | Blob) {
        saveAs(blob, 'referral_qr_code.png');
      });}}>
        DOWNLOAD
      </FlexRow>
    </React.Fragment>
  )}
</GridWithBoxConteiner>



    <GridWithBoxConteiner>
        <Typography
          className="primary-text-color labels"
          variant="subtitle2"
          sx={{
            width: '100%',
            color: '#919eab',
            '&:hover': {
              '& .referrals': {
                color: toggle ? '#fff' : '#fff'
              }
            }
          }}
        >
          <FlexRow ai="center" jc="space-between" w="100%">
            <Typography variant="subtitle2" className="referrals">
              YOUR REFERRALS
            </Typography>
            <SearchIcon />
          </FlexRow>
        </Typography>
      </GridWithBoxConteiner>
  </Grid>
  );
        }

        export default MainReferrals;