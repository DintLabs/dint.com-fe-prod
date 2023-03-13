import { useTheme } from "@emotion/react";
import { Button, Stack } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Loader from './common/Loader';
// import "./media.css";

const CaptureImageComponent = ({ handleClose, handleSubmit }: { handleClose: () => void, handleSubmit: (img:string) => void }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUserMedia = () => {
    setTimeout(() => setLoading(false), 1000);
  };
  const capture = useCallback(() => {
    if (webcamRef.current) {
    const imageSrc = webcamRef?.current?.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  return (
    <div className="imageCaptureWrapper">
      {loading && (
        <Loader loading={loading} />
      )}
      {!loading && imgSrc && <img src={imgSrc} />}
      {!imgSrc && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ opacity: loading ? 0 : 1, width: loading ? 0 : 500 }}
          onUserMedia={handleUserMedia}
        />
      )}
      {!loading && <div className="imgCaputreControl">
        {imgSrc && (
          <Stack
            p={3}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              justifyContent: 'center'
            }}
          >
            <Button onClick={() => setImgSrc("")} variant="contained">Retake</Button>
            <Button variant="contained" onClick={() => {
              handleSubmit(imgSrc);
              handleClose();
            }}>Submit</Button>
            <Button variant="outlined" onClick={() => {
              handleUserMedia();
              setImgSrc("");
              handleClose();
            }}>Close</Button>
          </Stack>
        )}
        {!imgSrc && (
          <Stack
            p={2}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              justifyContent: 'center'
            }}
          >
            <Button onClick={capture} variant="contained">Capture</Button>
            <Button variant="outlined" onClick={() => {
              handleUserMedia();
              setImgSrc("");
              handleClose();
            }}>Close</Button>
          </Stack>
        )}
      </div>}
    </div>
  );
};

export default CaptureImageComponent;
