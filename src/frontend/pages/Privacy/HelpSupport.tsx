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
                            <Typography>What can you pay with Melio?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                                Melio is a free, simple, and secure way for businesses to pay their bills and get paid by other businesses. It is designed for the needs of small businesses.
                                In just a few clicks, you can pay business utility bills, vendors, contractors, and even rent.
                                <span style={{ fontWeight: 'bold' }}> The first and most important thing to remember is that both payor and payee must be businesses. Meaning you can only pay other businesses with Melio.</span>
                            </Typography>
                            <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>Here is the full list of types of bills you can and can't pay with Melio.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={expanded === 'panel2' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>How to make recurring payments in Melio</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                                With Melio you can set up automatic payments to pay vendors regularly, so they always get paid on time and you have fewer tasks on your to-do list at the end of the month.
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>Here's how to do it:</Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>1.</span> Go to your Pay dashboard.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>2.</span>Click New Payment.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>3.</span>Choose how you'd like to add the bill.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>4.</span>Fill in the details of the bill.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>5.</span>Under payment frequency, choose monthly or weekly. This shows how often the amount will be paid to your vendor.Remember to select the date you'd like the payment to arrive.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>6.</span>Choose the payment method.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>7.</span>Choose how your vendor will receive the payments.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>8.</span>Review and click <span style={{ fontWeight: 'bold' }}>Confirm and schedule payment.</span>
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    To read the full article click here.
                                </Typography>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={expanded === 'panel3' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>Expedite your check payment</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                                Pay your vendors faster with the fast check option. Fast checks are sent in 3 days via FedEx, instead of USPS’s regular delivery time of 5-7 days.
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    You’ll have the option to make a fast check delivery when scheduling your payment deduction date:
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>1.</span> Select Paper check when asked how your vendor would like to receive the payment.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>2.</span> When selecting a date for your payment to be deducted, make sure to select the fast check option (at a $20 fee).
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>3.</span> In the Review & confirm page, click Confirm and schedule payment to complete the process.
                                </Typography>
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    Read the article here for a complete guide of the steps.
                                </Typography>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={expanded === 'panel4' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>How to use the Partial Payments feature</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                                The Partial Payments feature gives you more flexibility in how you choose to pay vendors. It allows you to divide a single invoice into several payments and use different methods at various stages of the payment.
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    When you schedule a partial payment, Melio will track and display the remaining balance.
                                </Typography>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={expanded === 'panel5' ? <RemoveIcon /> : <AddIcon />}>
                            <Typography>Does Melio support international payments?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='h5' style={{ fontWeight: 'normal' }}>
                                Yes, we do!
                                Currently, Melio supports international payments outside the US and its territories in USD only.
                                You can make international payments to countries in Europe, Asia-pacific, Latin America and more. Every week other locations are added to the list of available countries:
                                <Typography variant='h5' style={{ fontWeight: 'normal', marginTop: '10px' }}>
                                    In the near future other currencies will be available.
                                </Typography>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </Grid>
                <Typography variant="h3" sx={{ color: toggle ? "white" : "#161c24" }} mb={2}>
                    Contact us
                </Typography>
                <p style={{ color: toggle ? "white" : "#161c24" }}>
                    You can find additional resources in our Help Center. If you have a specific inquiry, contact us here.
                </p>
                <Button variant="outlined" sx={{ "&:hover": { background: "transparent", borderColor: "transparent" } }}
                    style={{ border: toggle ? "1px solid white" : "1px solid #161c24", color: toggle ? "white" : "#161c24" }}
                    onClick={() => { }}>Start a chat</Button>
            </div>
        </>
    )
}

export default HelpSupport;