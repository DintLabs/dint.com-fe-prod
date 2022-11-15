import * as React from "react";
import { Grid, Stack, TextField, useTheme } from "@mui/material";

import BackBlock from './sections/BackBlock';
import LinkBlock from './sections/LinkBlock';
import TitleBlock from './sections/TitleBlock';

interface ISubmenuProps {
  title: string;
  username: string;
  routes: any[];
  secondBlocks?: any[];
  noTag?: boolean;
  md?: number;
  topDiv?: boolean;
  isLink?: boolean;
  isPlusIco?: boolean;
  handleOpen: any;
  handleClose: any;
}

const Submenu = ({
  title,
  username,
  routes,
  secondBlocks,
  noTag = false,
  md = 4,
  topDiv = false,
  isLink = false,
  isPlusIco = false,
  handleOpen,
  handleClose,
}: ISubmenuProps) => {
  const theme = useTheme();

  return (
    <>
      <Grid
        item
        xs={12}
        md={md}
        sx={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`,
          width: "100%",
        }}
      >
        {title && (
          <BackBlock
            title={title}
            isPlusIco={isPlusIco}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        )}
        {username && (
          <Stack>
            <TitleBlock title={username} noTag={noTag} isLink={isLink} />

            <LinkBlock routes={routes} />
          </Stack>
        )}

        {secondBlocks &&
          secondBlocks.map((item, i) => (
            <Stack
              key={`${item.title}_${i}`}
              sx={{
                borderTop: `6px solid ${theme.palette.grey[700]}`,
                width: "100%",
              }}
            >
              <TitleBlock
                title={item.title}
                noTag
                topDiv={topDiv}
                isLink={isLink}
              />

              <LinkBlock routes={item.block} />
            </Stack>
          ))}
      </Grid>
    </>
  );
};

export default Submenu;
