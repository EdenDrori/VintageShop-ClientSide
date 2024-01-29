import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    axios
      .get("/contact")
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => {
        toast("Error from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  const handleDeleteClick = (message) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const { data } = await axios.delete("/contact/" + selectedMessage);
      setMessages((messagesCopy) =>
        messagesCopy.filter((message) => message._id !== selectedMessage)
      );
      setDeleteDialogOpen(false);
    } catch (err) {
      toast("There is an error on deleting", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDeleteDialogOpen(false);
    }
    
  };
const handleDeleteClickButton=()=>{
    
}
  const handleDeleteCancel = () => {
    setSelectedMessage(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: "200", textAlign: "center",mt:"5vh" }}>
        Messages
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "200", textAlign: "center" ,mb:"7vh" }}>
        Check now customers messages
      </Typography>
      {messages.map((messageInfo, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography >
                <PersonIcon sx={{ verticalAlign: "middle", mr: "2vw" }}/> {messageInfo.email}
              </Typography>
              <IconButton onClick={() => handleDeleteClick(messageInfo._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{messageInfo.name}</Typography>
            <Typography>{messageInfo.message}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this message?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MessagesPage;
