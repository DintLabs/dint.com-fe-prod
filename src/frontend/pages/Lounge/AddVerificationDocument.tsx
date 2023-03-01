import { Box, Button, Stack, } from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./navbarTab.css";
import MultimediaIcon from "../../assets/img/icons/picture.png";

interface Props {
  widthScreen: number;
  onAttachDocument: Function;
}

const AddVerificationDocument = ({
  widthScreen,
  onAttachDocument,
}: Props) => {
  const [file, setFile] = useState<any>({});
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toggle } = useContext(ThemeContext);

  const onAttachIdDocument = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!loading) {
      setLoading(true);

      if (isFileUploaded && file) {
        try {
          onAttachDocument(file);
        } catch (exception: any) {
          toast.update("Error adding...", {
            render: exception.toString(),
            type: "error",
          });

          setTimeout(() => toast.dismiss(), 2000);
        }
      }

      setTimeout(() => {
        setFile(null);
        setIsFileUploaded(false);
        setImage("");
        setLoading(false);
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? (event.target.files[0] as File) : null;
    if (!file) return;
    setIsFileUploaded(true);
    setFile(file);
    if (getFileType(file) === "image") {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
    if (getFileType(file) === "image") {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  function getFileType(file: File) {
    if (file.type.match("image.*")) return "image";
    // etc...

    return "other";
  }

  return (
    <>
      <Box
        className="custom-modal"
        sx={{
          height: widthScreen >= 900 ? "75vh" : "full",
          overflowY: "scroll",
          maxWidth: "720px",
          margin: "auto",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Box
          sx={{ borderRadius: 3 }}
          className={`shadow compose-background p-3 m-3 ${
            toggle ? "bg-dark" : "bg-white"
          }`}
        >
          <Box className="d-flex justify-content-center align-items-center">
            <h4>Attach you ID card</h4>
          </Box>
          <div style={{ borderBottom: "1px solid grey" }} className="w-100" />
          {image && (
            <div
              className="position-relative"
              style={{ width: "100%", flex: 1, height: "100%" }}
            >
              <img
                src={image}
                style={{ maxWidth: "100%", height: "auto" }}
                className="mb-3"
                alt="imag"
              />
            </div>
          )}
          <h4>{!image && "Please select only image!"}</h4>

          <Stack className="d-flex flex-column justify-content-between h-100 flex-1 align-items-center flex-row center-pos">
            {image.length > 0 ? null : (
              <Stack className="d-flex align-items-center justify-content-center w-100 upload-img flex-column">
                <img
                  src={MultimediaIcon}
                  style={{ width: "20%", height: "20%", marginTop: "3%" }}
                />
                <Button
                  aria-label="upload story"
                  component="label"
                  variant="contained"
                  style={{ marginTop: "2%", width: "20%" }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                  Select
                </Button>
              </Stack>
            )}
          </Stack>
          <div className="d-flex justify-content-between align-items-end mt-2 w-100">
            {image.length > 0 ? (
              <>
                <Button
                  onClick={() => {
                    setFile({});
                    setImage("");
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Remove
                </Button>
                <Button onClick={onAttachIdDocument} variant="contained">
                  Publish
                </Button>
              </>
            ) : null}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AddVerificationDocument;
