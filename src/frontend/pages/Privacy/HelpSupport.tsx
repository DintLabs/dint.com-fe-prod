import { Grid, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

const HelpSupport = () => {
    const { toggle } = useContext(ThemeContext);
    const [expanded, setExpanded] = React.useState<string | false>('');

    const Accordion = styled((props) => (
        <MuiAccordion children={''} disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        '&:not(:last-child)': {
            borderBottom: `1px solid #CCCCCC`,
        },
        '&:before': {
            display: 'none',
        },
        '& .MuiAccordion-root': {
            border: 'none'
        },
        '& .MuiSvgIcon-root': {
            fill: toggle ? '#fff' : '#161c24'
        }
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor: toggle ? "#161c24" : "white",
        color: toggle ? "white" : "#161c24",
        // flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        background: toggle ? "#161c24" : "white",
        color: toggle ? "white" : "#161c24"
    }));

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return (
        <>
            <div
                className="container"
                style={{
                    position: "sticky",
                    top: "60px",
                    left: 0,
                    zIndex: 2,
                    width: "100vw",
                }}
            >
                <h1
                    // className="text-center mb-5"
                    style={{
                        color: toggle ? "white" : "#161c24",
                        padding: "20px 0",
                        backgroundColor: toggle ? "#161c24" : "white",
                    }}
                >
                    HELP / SUPPORT
                </h1>
            </div>
            <div className="container pt-5 mb-5"
            >
                <Typography variant="h3" sx={{ color: toggle ? "white" : "#161c24" }} mb={2}>
                    How Can we help?
                </Typography>
                <p style={{ color: toggle ? "white" : "#161c24" }}>
                    Ask questions. Browser articles. Find answers. We're here to help with any issue or problem you're experiencing.
                </p>
                <Grid sx={{ my: 5 }} >
                    <Typography variant="h3" sx={{ color: toggle ? "white" : "#161c24" }} mb={2}>
                        Popular help topics
                    </Typography>
                    <Divider />
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={expanded === 'panel1' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>Who can use Dint?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                            To use Dint, you must first create an account by registering with your valid email address and a password. Your password should be unique and strong to protect your account security. Dint also allow you to authenticate using your Google account.
                            </Typography>
                            <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>To register as a user, you must:</Typography>
                            <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>1.</span> Be at least 18 years old, and you will be required to confirm this during registration.

                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>2.</span> Be permitted by the laws of the country or State/province where you are located to use Dint and to view any content available on it and to use any functionality provided by it.

                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>3.</span> Not be a convicted sex offender.

                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>4.</span> If the laws of the country or State/province where you live provide that you can only be legally bound by a contract with us at an age which is higher than 18 years old, then you must be old enough to be legally bound by a contract with us under the laws of the country or State/province where you live.

                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>5.</span> If you do not meet the above requirements, you must not access or use Dint.

                                </Typography>
                              
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={expanded === 'panel2' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>My Wallet
</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
             
                                    <span style={{ fontWeight: 'bold' }}></span>Adding funds to your wallet allows you to subscribe to any user, send tips or unlock paid messages without making a credit card transaction every time. Your wallet balance will be used by default as long as it is sufficient for the attempted purchase (or subscription auto-renew). Wallet Credit transactions are instant and easy to use. There is no wait time in processing new transactions.

                       
                             
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={expanded === 'panel3' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>Finding a profile</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
               
                               
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>1.</span>Standard profiles can be found through the search function.

                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>2.</span>Once you have subscribed to an account, either paid or free, and have had an interaction with a model, a search icon will appear on your home page.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>3.</span> If the user has enabled their profile to be easily found, then you can use the search function to find them in the search results.


                                </Typography>
                           
                          
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={expanded === 'panel4' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>How to subscribe</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          

                        <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>1.</span> Add a valid credit card to your account settings.


                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>2.</span> Get coins by clicking on the 'Buy Coins' button and adding them to your wallet.

                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>3.</span> Click 'Subscribe' on the profile you wish to subscribe to. You will be charged the subscription fee and gain access to the profile's content. </Typography>

                                    <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>4.</span> Once you subscribe, you will instantly unlock all the content in that profile, including previous and future posts.
 </Typography>

                                    <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>5.</span> Subscription periods last one calendar month from the date of purchase
 </Typography>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={expanded === 'panel5' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>How do I start earning on Dint?
</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                            To start earning on Dint, follow these steps:


                            <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>1.</span> Start creating and posting content.



                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>2.</span> Add your bank account in your name.


                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>3.</span> Complete your W-9 form if you are a US creator.
 </Typography>


                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </Grid>
                 
               
                   
            </div>
        </>
    )
}

export default HelpSupport;