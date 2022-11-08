import { Box, useTheme } from '@mui/material';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

interface TitleBlockProps {
  title: string;
  noTag?: boolean;
  topDiv?: boolean;
  isLink?: boolean;
}

const TitleBlock = ({ title, noTag = false, topDiv, isLink = false }: TitleBlockProps) => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        cursor: 'pointer',
        fontWeight: 'bolder',
        bottomDivider: 'bolder',
        borderTop: topDiv ? `6px solid ${theme.palette.grey[700]}` : `none`,
        width: '100%'
      }}
      display="flex"
      p={1}
      pl="16px"
      alignItems="center"
      justifyContent="space-between"
    >
      {isLink ? (
        <Link className="primary-text-color" to={`/${title}`}>
          {!noTag && '@'}
          {title}
        </Link>
      ) : (
        <FlexRow className="primary-text-color" style={{ color: toggle ? '#FFFFFF' : '' }}>
          {!noTag && '@'}
          {title}
        </FlexRow>
      )}
    </Box>
  );
};

export default TitleBlock;
