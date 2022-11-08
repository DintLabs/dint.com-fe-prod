import * as React from 'react';
import { useContext, useState } from 'react';

import { Switch, Typography, Grid, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Submenu from 'frontend/components/submenu';
import TitleBlock from 'frontend/components/submenu/sections/TitleBlock';

import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';
import { ThemeContext } from '../../../../contexts/ThemeContext';

interface CheckboxesInterface {
  email: boolean;
  fullMessage: boolean;
  newsletter: boolean;
  newPostsSummary: boolean;
  newStream: boolean;
  upcomingStreamReminders: boolean;
  newPrivateMessage: boolean;
  receiveLess: boolean;
  importantSubscription: boolean;
}

interface DropDownInterface {
  postSummary: number;
  privateMessage: number;
}

interface IsOpenInterface {
  postSummary: boolean;
  privateMessage: boolean;
}

const EmailNotif = () => {
  const [checkboxes, setCheckboxes] = useState<CheckboxesInterface>({
    email: false,
    fullMessage: true,
    newsletter: false,
    newPostsSummary: false,
    newStream: false,
    upcomingStreamReminders: true,
    newPrivateMessage: true,
    receiveLess: true,
    importantSubscription: true
  });

  const [dropDown, setDropDown] = useState<DropDownInterface>({
    postSummary: 12,
    privateMessage: 12
  });

  const [open, setOpen] = useState<IsOpenInterface>({ postSummary: false, privateMessage: false });

  const handleChangeCheckboxes = (key: string, value: boolean) => {
    setCheckboxes((p) => ({ ...p, [key]: value }));
  };

  const handleChange = (key: string, value: string | number) => {
    setDropDown((p) => ({ ...p, [key]: value }));
  };

  const handleIsOpen = (key: string, value: boolean) => {
    setOpen((p) => ({ ...p, [key]: value }));
  };
  const { toggle } = useContext(ThemeContext);

  return (
    <Grid container>
      <Submenu title="EMAIL NOTIFICATIONS" username="" routes={[]} noTag md={12} />

      {/* first block */}
      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Email notifications
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            Get email to find out what\'s going on when you\'re not on Dint.com. You can turn them
            off anytime
          </Typography>
        </FlexCol>
        <Switch
          checked={checkboxes.email}
          onChange={() => handleChangeCheckboxes('email', !checkboxes.email)}
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            }
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          Show full text of the messages in the notifications email
        </Typography>
        <Switch
          checked={checkboxes.fullMessage}
          onChange={() => handleChangeCheckboxes('fullMessage', !checkboxes.fullMessage)}
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            }
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          Monthly Newsletter
        </Typography>
        <Switch
          checked={checkboxes.newsletter}
          onChange={() => handleChangeCheckboxes('newsletter', !checkboxes.newsletter)}
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            },
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>

      {/* two block */}
      <TitleBlock title="Subscriptions and following" noTag topDiv isLink={false} />

      <GridWithBoxConteiner>
        <FlexCol w="100%">
          <FlexRow ai="center" jc="space-between" w="100%">
            <Typography className="primary-text-color" variant="subtitle2">
              New Posts Summary
            </Typography>
            <Switch
              checked={checkboxes.newPostsSummary}
              onChange={() => handleChangeCheckboxes('newsletter', !checkboxes.newPostsSummary)}
              color="primary"
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: toggle ? 'white' : 'black'
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </FlexRow>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">New Posts Summary</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open.postSummary}
              onClose={() => handleIsOpen('postSummary', false)}
              onOpen={() => handleIsOpen('postSummary', true)}
              value={dropDown.postSummary}
              label="Age"
              onChange={(e) => handleChange('postSummary', e.target.value)}
              style={{
                backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                color: toggle ? 'white' : '#161C24'
              }}
            >
              <MenuItem
                value=""
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
              >
                <em>None</em>
              </MenuItem>
              <MenuItem
                value={12}
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
              >
                Every 12 Hours
              </MenuItem>
              <MenuItem
                value={20}
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
              >
                Twenty
              </MenuItem>
              <MenuItem
                value={30}
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
              >
                Thirty
              </MenuItem>
            </Select>
          </FormControl>
        </FlexCol>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          New Stream
        </Typography>
        <Switch
          checked={checkboxes.newStream}
          onChange={() => handleChangeCheckboxes('newStream', !checkboxes.newStream)}
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            },
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <Typography className="primary-text-color" variant="subtitle2">
          Upcoming stream reminders
        </Typography>
        <Switch
          checked={checkboxes.upcomingStreamReminders}
          onChange={() =>
            handleChangeCheckboxes('upcomingStreamReminders', !checkboxes.upcomingStreamReminders)
          }
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            },
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>

      {/* Three block */}
      <TitleBlock title="New messages" noTag topDiv isLink={false} />

      <GridWithBoxConteiner>
        <FlexCol w="100%">
          <FlexRow ai="center" jc="space-between" w="100%">
            <Typography className="primary-text-color" variant="subtitle2">
              New Private Message Summary
            </Typography>
            <Switch
              checked={checkboxes.newPrivateMessage}
              onChange={() =>
                handleChangeCheckboxes('newPrivateMessage', !checkboxes.newPrivateMessage)
              }
              color="primary"
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: toggle ? 'white' : 'black'
                },
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </FlexRow>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              New Private Message Summary
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open.privateMessage}
              onClose={() => handleIsOpen('privateMessage', false)}
              onOpen={() => handleIsOpen('privateMessage', true)}
              value={dropDown.privateMessage}
              label="Age"
              onChange={(e) => handleChange('privateMessage', e.target.value)}
              style={{
                backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                color: toggle ? 'white' : '#161C24'
              }}
            >
              <MenuItem
                value=""
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
              >
                <em>None</em>
              </MenuItem>
              <MenuItem
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
                value={12}
              >
                Every 12 Hours
              </MenuItem>
              <MenuItem
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
                value={20}
              >
                Twenty
              </MenuItem>
              <MenuItem
                style={{
                  backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                }}
                value={30}
              >
                Thirty
              </MenuItem>
            </Select>
          </FormControl>
        </FlexCol>
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Receive less notifications
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            Receive email notifications for direct messages only
          </Typography>
        </FlexCol>
        <Switch
          checked={checkboxes.receiveLess}
          onChange={() => handleChangeCheckboxes('receiveLess', !checkboxes.receiveLess)}
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            },
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>

      <GridWithBoxConteiner>
        <FlexCol>
          <Typography className="primary-text-color" variant="subtitle2">
            Important subscription notifications
          </Typography>
          <Typography className="primary-text-color" variant="caption">
            Notofications about upcoming subscription renewals and expirations
          </Typography>
        </FlexCol>
        <Switch
          checked={checkboxes.importantSubscription}
          onChange={() =>
            handleChangeCheckboxes('importantSubscription', !checkboxes.importantSubscription)
          }
          color="primary"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: toggle ? 'white' : 'black'
            },
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </GridWithBoxConteiner>
    </Grid>
  );
};

export default EmailNotif;
