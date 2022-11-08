import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import blacklogo from '../material/black.png';
import { FlexRow } from './reusableStyled';

//------------------------------------------------------------------------------

interface TextProp {
  colorHead?: string;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | any;
}

interface LiProp {
  ta?: string;
  disabled?: string;
}

// interface WrappProp {
//   children?: React.ReactNode | JSX.Element | JSX.Element[] | any;
// }
interface ItemChanges {
  onChange?: () => void;
  title: string | JSX.Element;
}

interface DropdownProps {
  // value: boolean;
  // setValue: React.Dispatch<boolean>;
  colorHead?: string;
  title: string | IconType | JSX.Element;
  arrChanges: ItemChanges[];
  ta?: string;
  mobile?: boolean;
}

//------------------------------------------------------------------------------

const TextStyled = styled.span<TextProp>`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ colorHead }) => colorHead || `#494e5b`};
  cursor: pointer;
`;

//------------------------------------------------------------------------------

const UlStyled = styled.ul`
  position: absolute;
  top: 35px;
  left: -90px;

  display: 'none';

  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 150px;
  width: fit-content;

  padding: 0px;
  margin: 0;

  list-style: none;

  background: #ffffff;
  border-radius: 4px;

  box-sizing: border-box;
`;

const LiStyled = styled.li<LiProp>`
  display: flex;
  flex-wrap: nowrap;

  font-weight: 600;

  text-align: ${({ ta }) => ta || `left`};

  list-style: none;

  color: ${({ disabled }) => (disabled ? '#b2b2b2' : '#494e5b')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  width: 100%;

  margin: 0 !important;
  padding: 10px;

  * {
    margin: 0 !important;
    font-size: 16px !important;
  }

  border-radius: 4px !important;

  z-index: 5;

  :hover {
    font-weight: 650;
    background: #e9ecef;
  }
`;

//------------------------------------------------------------------------------

const Wrapp = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  min-width: 50px;
  min-height: 37px;

  height: fit-content;
  width: fit-content;

  &:hover ${UlStyled} {
    display: flex;
    flex-direction: column;
  }
`;

const OverlayBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

//------------------------------------------------------------------------------

const Dropdown = ({ mobile, colorHead, title, arrChanges, ta }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeDropdown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(false);
  };
  return (
    <Wrapp onMouseOver={() => !mobile && setIsOpen(true)} onClick={() => setIsOpen(true)}>
      <TextStyled colorHead={colorHead}>
        {mobile ? <MenuIcon style={{ color: 'white' }} /> : title}

        {!mobile && <ArrowDropDownIcon style={{ color: 'white' }} />}
      </TextStyled>

      {isOpen && (
        <UlStyled>
          {mobile && (
            <LiStyled
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <FlexRow jc="space-between" ai="center" w="100%">
                <Link to="/lounge">
                  <img src={blacklogo} width="40" height="40" className="" alt="" />
                </Link>

                <FlexRow onClick={closeDropdown}>
                  <CloseIcon />
                </FlexRow>
              </FlexRow>
            </LiStyled>
          )}

          {arrChanges.filter(f => f.title != '').map((item, index) => {
            return (
              <LiStyled
                ta={ta}
                key={`arrChanges_${index}`}
                onClick={(e) => {
                  if (mobile && index !== 2) {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }

                  if (!mobile) {
                    setIsOpen(false);
                  }

                  item.onChange && item.onChange();
                }}
              >
                {item.title}
              </LiStyled>
            );
          })}

          <OverlayBlock onClick={closeDropdown} />
        </UlStyled>
      )}
    </Wrapp>
  );
};

export default Dropdown;
