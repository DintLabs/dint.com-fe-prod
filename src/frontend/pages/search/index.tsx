import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import _axios from 'frontend/api/axios';
import SearchItemSkeleton from 'frontend/components/common/skeletons/SearchItemSkeleton';
import SearchItem from 'frontend/components/search/SearchItem';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { ThemeContext } from '../../contexts/ThemeContext';

import '../../layouts/SearchDrawer.css';
import { useNavigate } from 'react-router';

const Search = () => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    if(widthScreen > 899) navigate('/lounge')
  }, [widthScreen])

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const search = async (val?: string) => {
    setIsLoadingSearch(true);
    try {
      const { data } = await _axios.get(`/api/chat/search_user/?search=${val || ''}`);
      if (data.code === 200) {
        setSuggestions(data.data);
      }
    } catch (e: any) {
      console.error('e ====>', e.message);
    }
    setIsLoadingSearch(false);
  };

  const removeItem = (id: any) => {
    setSuggestions(suggestions.filter((suggestion: any) => suggestion.id !== id));
  };

  return (
    <div className={toggle ? "searchDrawerDark" : "searchDrawer"}>
      <div className={toggle ? 'searchHeaderDark' : 'searchHeader'}>
        <label>Search</label>
        <TextField
          // {...params}
          id="user-search-input"
          // value={userSearchText}
          onChange={(e) => {
            search(e.target.value);
            setSearchText(e.target.value);
          }}
          value={searchText}
          placeholder="Search here..."
          InputProps={{
            //   ...params.InputProps,
            endAdornment: (
              <div onClick={() => {
                setSearchText("");
                search();
              }}>
                <InputAdornment position="end">
                    <HighlightOffRoundedIcon />
                </InputAdornment>
              </div>
            ),
            style: {
              backgroundColor:  toggle ? theme.palette.grey[800] : '#F7F6F6',
              paddingLeft: 10,
              color : toggle ? '#FFFFFF' : '#000000'
            }
          }}
          fullWidth
          size="small"
          sx={{
            borderWidth: 0,
            marginTop: 2,
            '& label.Mui-focused': {
              // color: 'white'
            },
            '& .MuiInput-underline:after': {
              // borderBottomColor: theme.palette.grey[800]
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                // borderColor: 'white'
              },
              '&:hover fieldset': {
                // borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.grey[600],
                borderWidth: 1
              }
            }
          }}
        />
      </div>
      <div className='searchList'>
        <Stack flexDirection="row" justifyContent="space-between" sx={{ cursor: 'pointer' }}>
          <h4 className={toggle ? 'recentClassDark' : 'recentClass'}>Recent</h4>
          <span style={{ color: '#0C5DD6', fontSize: '12px', fontWeight: 600 }} onClick={() => setSuggestions([])}>Clear All</span>
        </Stack>
        <Stack pt={2} gap={2}>
          {isLoadingSearch && (
            <>
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
            </>
          )}
          {!isLoadingSearch && suggestions.map((item, i) => <SearchItem key={i} data={item} removeItem={removeItem} />)}
          {!isLoadingSearch && suggestions.length === 0 && (
            <Typography variant="h5" sx={{ color: 'text.primary', textAlign: 'center' }}>
              No data available.
            </Typography>
          )}
        </Stack>
        {/* <Autocomplete
          // freeSolo
          forcePopupIcon={false}
          id="free-solo-2-demo"
          disableClearable
          loading={isLoadingSearch}
          options={suggestions}
          autoHighlight
          onChange={(e, val: any) => navigate(`/${val.custom_username}`)}
          getOptionLabel={(option: any) => option.display_name || option.custom_username}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                // loading="lazy"
                width="20"
                height="20"
                src={option.profile_image}
                // srcSet={option.profile_image}
              />
              {option.display_name || option.custom_username}
            </Box>
          )}
          renderInput={(params) => (
            
          )}
          style={{
            width: "100%",
            marginRight: 20,
            flex: 1
          }}
        /> */}
      </div>
    </div>
  );
};

export default Search;
