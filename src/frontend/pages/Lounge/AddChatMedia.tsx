import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { uploadMedia } from "frontend/services/mediaService";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { postTypes } from "frontend/data";
import { toast } from "react-toastify";

import MultimediaIcon from "../../assets/img/icons/picture.png";
import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./navbarTab.css";

interface Props {
  sendMessageHandler: Function;
  openMedia: boolean;
  onOpenMedia: () => void;
}

const AddChatMedia = ({
  openMedia,
  onOpenMedia,
  sendMessageHandler,
}: Props) => {
  const mobileView = useMediaQuery("(max-width:899px)");
  const theme = useTheme();
  const navigate = useNavigate();

  const [file, setFile] = useState<any>({});
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toggle } = useContext(ThemeContext);

  const onCreatePost = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!loading) {
      setLoading(true);
      const toastId = toast.loading("Uploading File...");
      onOpenMedia()

      const user = JSON.parse(localStorage.getItem("userData") ?? "{}");
      if (!user.id) {
        toast.update(toastId, {
          type: "error",
          render: "Can't find User Id",
        });
        setTimeout(() => toast.dismiss(), 2000);
        return;
      }

      if (file) {
        try {
          const uploadResult = await uploadMedia(file, "photos", false, "post");
          const mediaUrl = uploadResult?.data?.data?.data[0]?.media_file_url;

          if (!mediaUrl) {
            throw new Error('The file has not been uploaded.');
          }

          toast.update(toastId, {
            render: "File Uploaded Successful",
            type: "success",
            isLoading: false,
          });
          await sendMessageHandler(mediaUrl);
        } catch (exception: any) {
          toast.update("Error adding...", {
            render: exception.toString(),
            type: "error",
          });

          setTimeout(() => toast.dismiss(), 2000);
        }
      }

      setTimeout(() => {
        setContent("");
        setFile(null);
        setImage("");
        setLoading(false);
        setVideo("");
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? (event.target.files[0] as File) : null;
    if (!file) return;
    setFile(file);
    if (getFileType(file) === "image") {
      setImage(URL.createObjectURL(file));
      setVideo("");
    } else if (getFileType(file) === "video") {
      setVideo(URL.createObjectURL(file));
      setImage("");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
    if (getFileType(file) === "image") {
      setImage(URL.createObjectURL(file));
      setVideo("");
    } else if (getFileType(file) === "video") {
      setVideo(URL.createObjectURL(file));
      setImage("");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  function getFileType(file: File) {
    if (file.type.match("image.*")) return "image";

    if (file.type.match("video.*")) return "video";

    if (file.type.match("audio.*")) return "audio";

    // etc...

    return "other";
  }

  return (
    <Modal open={openMedia} onClose={onOpenMedia}>
      <Box
        className={mobileView ? "custom-modal-mobile" : "custom-modal"}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Box
          className={`compose-background ${toggle ? "bg-dark" : "bg-white"} ${
            !mobileView ? "shadow" : ""
          }`}
        >
          <Box
            className="d-flex justify-content-center align-items-center"
            style={{ color: toggle ? "#ffffff" : "#161C24" }}
          >
            <h4>Select Media</h4>
          </Box>

          <Divider />

          {image && (
            <div className="position-relative d-flex media-file-preview-container">
              <img src={image} className="mb-3 media-file-preview" alt="imag" />
            </div>
          )}
          {video && (
            <div className="post_video media-file-preview-container">
              <video
                width="100%"
                height="100%"
                controls
                className="media-file-preview"
              >
                <source src={video} id="video_here" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}

          <Stack className="d-flex flex-column justify-content-between h-100 flex-1 align-items-center flex-row center-pos">
            {video.length > 0 || image.length > 0 ? null : (
              <Stack className="d-flex align-items-center justify-content-center w-100 upload-img flex-column">
                <img
                  src={MultimediaIcon}
                  style={{ width: "20%", height: "auto", marginTop: "3%" }}
                />
                <Button
                  aria-label="upload story"
                  component="label"
                  variant="contained"
                  style={{ marginTop: "2%", width: "20%" }}
                >
                  <input
                    hidden
                    accept="video/*,image/*"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                  />
                  Select
                </Button>
              </Stack>
            )}
          </Stack>
          <div className="confirm-buttons-block">
            <>
              <Button
                onClick={() => {
                  setVideo("");
                  setFile({});
                  setImage("");
                  setContent("");
                }}
                variant="contained"
                color="secondary"
                disabled={
                  video.length > 0 || image.length > 0 || content.length > 0
                    ? false
                    : true
                }
              >
                Remove
              </Button>
              <Button
                disabled={
                  video.length > 0 || image.length > 0 || content.length > 0
                    ? false
                    : true
                }
                onClick={onCreatePost}
                variant="contained"
              >
                Publish
              </Button>
            </>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddChatMedia;
