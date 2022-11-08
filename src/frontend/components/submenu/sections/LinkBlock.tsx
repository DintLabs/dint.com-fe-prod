import { IconButton, SvgIcon, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { Box } from '@mui/system';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router';
import { ThemeContext } from '../../../contexts/ThemeContext';

interface LinkBlockProps {
  routes: any[];
}

const LinkBlock = ({ routes }: LinkBlockProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <>
      {routes.map((item, i) => (
        <Box
          key={`subroute_${i}`}
          sx={{
            borderBottom: `1px solid ${theme.palette.grey[700]}`,
            padding: '4px'
          }}
        >
          <Box
            sx={{
              background: location.pathname === item.href ? toggle ? theme.palette.grey[700] : theme.palette.grey[400] : 'inherit',
              cursor: 'pointer',
              borderRadius: 1,
              '&:hover': {
                background: toggle ? theme.palette.grey[700] : theme.palette.grey[400],
                '.labels': {
                  color: `#7635dc !important`
                },
                '.typo-label': {
                  color: 'white'
                }
              },
              '& .selected-setting': {
                color: 'white'
              }
            }}
            display="flex"
            pl="12px"
            pt="6px"
            pb="6px"
            pr="12px"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => navigate(item.href)}
          >
            <FlexCol>
              <FlexRow gap="5px">
                {item && 'icon' in item && item.icon !== null && (
                  <SvgIcon sx={{ color: toggle ? 'white' : '#919eab'}} component={item.icon} inheritViewBox />
                )}

                <Typography
                  className={
                    `primary-text-color typo-label ${item.translate && 'notranslate'} ${location.pathname === item.href ? 'selected-setting' : ''}`
                  }
                  variant="subtitle2"
                  style={{ color: toggle ? '#FFFFFF' : '' }}
                >
                  {item.name}
                </Typography>
              </FlexRow>

              <Typography
                className={
                  `primary-text-color ${item.translate && 'notranslate'} ${location.pathname === item.href ? 'selected-setting' : ''}`
                }
                variant="caption"
                style={{ display: `${!item.subname && 'none'}` }}
              >
                {item.subname}
              </Typography>
            </FlexCol>

            <IconButton size="small">
              <IoMdArrowRoundForward
                className={`primary-text-color typo-label cursor-pointer ${location.pathname === item.href ? 'selected-setting' : ''}`}
              />
            </IconButton>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default LinkBlock;
