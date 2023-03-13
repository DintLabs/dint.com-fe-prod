import React, { useContext } from 'react'
import QRCode from 'qrcode.react'
import { useLocation } from 'react-router'
import { isMobile } from 'frontend/utils'
import { saveAs } from 'file-saver'
import { toast } from 'react-toastify'
import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material'
import { ThemeContext } from 'frontend/contexts/ThemeContext'

interface Props {
  open: boolean
  onClose: () => void
}

const ShareProfileModal: React.FC<Props> = ({ open, onClose }) => {
  const { themeToggle } = useContext(ThemeContext)
  const location = useLocation()
  const mobileView = isMobile()
  const profileLink = window.location.href
  const qrCodeColor = themeToggle ? 'black' : 'black'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink)
    toast.success('Link copied to clipboard')
  }

  const saveQRCode = async () => {
    const canvas = document.getElementById('qr-code-profile') as HTMLCanvasElement;
    canvas?.toBlob && (canvas.toBlob = (blob: any) => {
      saveAs(blob, 'qr_code_profile.png')
    })
  }

  const shareQRCode = async () => {
    const canvas = document.getElementById('qr-code-profile') as HTMLCanvasElement;
    const qrCodeUrl = canvas?.toDataURL('image/png')
    const file = new File([await (await fetch(qrCodeUrl)).blob()], 'qr_code_profile.png', {
      type: 'image/png',
    })

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Share profile`,
          files: [file],
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      console.warn('Web Share API not supported')
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '700px',
          height: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 2,
        }}
      >
        <Typography align='center' variant='h4' sx={{ pb: 1 }}>
          Share Profile
        </Typography>

        <Divider />

        <Typography align='center' variant='inherit' sx={{ p: 1 }}>
          {location.pathname.substring(1)}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <QRCode value={profileLink} size={200} fgColor={qrCodeColor} id='qr-code-profile' />
        </Box>

        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={copyToClipboard}>
            Copy profile link
          </Button>
          <Button variant='contained' onClick={mobileView ? shareQRCode : saveQRCode}>
            {mobileView ? 'Share' : 'Save'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ShareProfileModal
