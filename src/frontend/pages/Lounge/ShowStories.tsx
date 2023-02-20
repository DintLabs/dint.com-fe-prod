import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Theme, useTheme
} from "@mui/material";
import './navbarTab.css';

import { useNavigate } from 'react-router';

import { useContext, useState } from "react";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import { makeStyles } from '@mui/styles';
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@mui/material/MobileStepper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface Props {
    widthScreen: number;
    item: any;
    image: any;

}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 800,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    img: {
        display: "block",
        maxWidth: 800,
        overflow: "hidden",
        width: "100%"
    },
    stepper: {
        position: "relative",
        top: -32,
        backgroundColor: "transparent"
    },
    buttonsContainer: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center"
    },
    button: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        color: "white",
        margin: "0 8px"
    }
}));

const ShowStories = ({ widthScreen, item, image }: Props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { toggle } = useContext(ThemeContext);

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = image?.length;

    function handleNext() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    function handleStepChange(step: any) {
        setActiveStep(step);
    }

    return (
        <>
            <Box
                sx={{
                    height: widthScreen >= 900 ? '90vh' : 'full', overflowY: 'auto',
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '50px',
                    marginBottom: '50px',
                    borderRadius: '15px',
                    background: '#FFFFFF',
                    flexDirection: 'column',
                    padding: 0,
                }}
            >
                <List className='custom-modal'>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Typography
                                    onClick={() =>
                                        navigate(`/${item?.display_name}`, { replace: true })
                                    }
                                    style={{ cursor: "pointer" }}
                                    variant="subtitle1"
                                    sx={{ color: toggle ? "text.primary" : "#161C24" }}
                                >
                                    {item?.display_name}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{ color: "text.secondary" }}
                                >
                                    @{item?.custom_username}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
                <div className={classes.root}>
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {image.map((step: any, index: number) => {
                            const images = ['jpg', 'gif', 'png', 'svg', 'webp', 'ico', 'jpeg'];
                            const videos = ['mp4', 'MP4', 'MOV', 'mov', '3gp', 'ogg', 'quicktime'];

                            const url = new URL(`https://bedev.dint.com${step?.story}`);
                            const extension = url.pathname.split('.')[1];
                            return (
                                <>
                                    {step?.story && images.includes(extension) && (
                                        <div key={step.label}>
                                            {Math.abs(activeStep - index) <= 2 ? (
                                                <img
                                                    className={classes.img}
                                                    src={`https://bedev.dint.com${step?.story}`}
                                                    style={{ width: '100%', height: '500px' }}
                                                />
                                            ) : null}
                                        </div>)}
                                    {step?.story && videos.includes(extension) && (
                                        <div key={step.label}>
                                            {Math.abs(activeStep - index) <= 2 ? (
                                                <img
                                                    className={classes.img}
                                                    src={`https://bedev.dint.com${step?.story}`}
                                                    style={{ width: '100%', height: '500px' }}
                                                />
                                            ) : null}
                                        </div>)}
                                </>
                            )
                        })}
                    </SwipeableViews>
                    <div className={classes.buttonsContainer}>
                        <div className={classes.buttons}>
                            <IconButton
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                className={classes.button}
                            >
                                {theme.direction === "rtl" ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                                className={classes.button}
                            >
                                {theme.direction === "rtl" ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="dots"
                        activeStep={activeStep}
                        className={classes.stepper}
                        backButton={<div />}
                        nextButton={<div />}
                    />
                </div>
            </Box>
        </>
    );
};

export default ShowStories;
