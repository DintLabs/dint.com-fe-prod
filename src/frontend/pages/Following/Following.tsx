import React, { useLayoutEffect } from 'react'
import _axios from 'frontend/api/axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { Box, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import { RootState, useDispatch, useSelector } from 'frontend/redux/store'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ThemeContext } from '../../contexts/ThemeContext'

import Sidebar from '../Lounge/Sidebar'
import FollowingDetails from './FollowingDetails'
import MobileTopHeader from '../Lounge/MobileTopHeader'
import SidebarMobile from '../Lounge/SidebarMobile'

const listWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  p: '10px',
  '& .listInnerWrapper': {
    mr: '10px',
    ml: '10px',
    mb: '15px',
    border: '1px solid #000',
    borderRadius: '50px',
    cursor: 'pointer',
    '& > .MuiCardHeader-root': {
      p: '7px 20px',
      '& .MuiCardHeader-avatar > .MuiAvatar-circular': {
        border: '2px solid #ffffff',
      },
      '& img': { width: '100%', height: '100%' },
    },
  },
  '& .listSelect': {
    backgroundColor: '#000',
    border: '1px solid #000',
    '& > .MuiCardHeader-root': {
      '& img': { width: '100%', height: '100%' },
      '& .MuiCardHeader-content > span': { color: '#ffffff' },
    },
  },
}
const BackBTNWrapper = { display: 'flex', alignItems: 'center' }

const Following = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = useSelector((state: RootState) => state?.user?.userData)
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome)
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width)
  const [clicked, setClicked] = useState(false)
  const [allFollowing, setAllFollowing] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeUsers, setActibveUsers] = useState<any>([])
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const [tabConfigObject, setTabConfigObject] = useState<any>([
    { id: 0, title: 'All', count: 0, data: [] },
    { id: 1, title: 'Active', count: 0, data: [] },
    { id: 2, title: 'Expired', count: 0, data: [] },
  ])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const { data } = await _axios.get('api/connection/get-following-list/')
      if (data.code === 200) {
        setAllFollowing(data.data)
      }
    } catch (err: any) {
      console.error('err ===>', err.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const translate = () => {
    setTimeout(() => {
      const selectedLanguage = localStorage.getItem('selectedLanguage')
      if (selectedLanguage !== null && selectedLanguage !== 'en') {
        const languageDropdown = $('.goog-te-combo')
        languageDropdown.val(selectedLanguage)
        languageDropdown[0].dispatchEvent(new Event('change'))
      }
    }, 10)
  }
  const { toggle } = useContext(ThemeContext)

  useEffect(() => {
    if (clicked) {
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign('https://paydev.dint.com')
    }
  })

  const filteredActiveUser = allFollowing.filter((allFollowing: any) => {
    return allFollowing.is_active === true
  })
  const filteredExpiredUser = allFollowing.filter((allFollowing: any) => {
    return allFollowing.is_active === false
  })

  const handleTabSelection = (index: number) => {
    setSelectedTabIndex(index)
  }

  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState
      oldTabs[0].count = allFollowing?.length
      oldTabs[0].data = allFollowing
      return oldTabs
    })
  }, [allFollowing])
  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState
      oldTabs[1].count = filteredActiveUser?.length
      oldTabs[1].data = filteredActiveUser
      return oldTabs
    })
  }, [filteredActiveUser])
  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState
      oldTabs[2].count = filteredExpiredUser?.length
      oldTabs[2].data = filteredExpiredUser
      return oldTabs
    })
  }, [filteredExpiredUser])

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width)
    }
    window.addEventListener('resize', updateWidth)
    updateWidth()
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <>
      <Grid container>
        <Grid item xs={0} md={1} className='desktop-nav'>
          {userData && !!userData.id && <Sidebar />}
        </Grid>
        <Grid item className='mobile-nav'>
          {userData && !!userData.id && (
            <>
              <MobileTopHeader
                userName={userData.display_name || ''}
                avatar={userData.profile_image || ''}
              />
              <SidebarMobile widthScreen={widthScreen} />
            </>
          )}
        </Grid>

        <Grid item md={10} sm={10} xs={10}>
          <Stack
            className='subscriptions-page-container'
            sx={{
              borderLeft: `1px solid #000`,
              borderRight: `1px solid #000`,
              position: 'relative',
            }}
          >
            {/* main header */}
            <Stack
              direction='row'
              alignItems='center'
              className='container-header'
              justifyContent='space-between'
              spacing={2}
              sx={{ p: { xs: 1, md: 1, xl: 1 } }}
            >
              <Box sx={BackBTNWrapper}>
                <IconButton
                  className='primary-text-color'
                  size='small'
                  onClick={() => navigate(-1)}
                >
                  <AiOutlineArrowLeft className='primary-text-color' />
                </IconButton>
                <Typography
                  className='primary-text-color'
                  textTransform='uppercase'
                  variant='subtitle1'
                  sx={{ pt: 0.25, ml: '10px !important' }}
                >
                  Following
                </Typography>
              </Box>
            </Stack>

            <Stack direction='row' alignItems='center' sx={{ p: { xs: 1.5, md: 1.5, xl: 1.5 } }}>
              <Typography
                className='secondary-text-color'
                textTransform='uppercase'
                variant='body2'
              >
                {tabConfigObject[selectedTabIndex].title}
              </Typography>
            </Stack>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ px: { xs: 1.5, md: 1.5, xl: 1.5 }, pb: 1 }}
            >
              {tabConfigObject.map((tab: any) => (
                <Chip
                  key={tab.id}
                  label={`${tab.title} ${tab.count}`}
                  clickable
                  className={
                    selectedTabIndex === tab.id ? 'active-chip-color' : ' inactive-chip-color'
                  }
                  onClick={() => {
                    handleTabSelection(tab.id)
                  }}
                />
              ))}
            </Stack>
            <Divider />

            <Box sx={listWrapper}>
              {tabConfigObject[selectedTabIndex].count > 0 ? (
                <FollowingDetails followings={tabConfigObject[selectedTabIndex].data} />
              ) : (
                <Stack justifyContent='center' alignItems='center' sx={{ pt: 18 }}>
                  Nothing found
                </Stack>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Following
