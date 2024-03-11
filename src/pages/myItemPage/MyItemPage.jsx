import {
  Container,
  Grid,
  Typography,
  Alert,
  Box,
  Popover,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import likeItemNormalization from "../itemsPage/likeItemNormalization";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ItemComponent from "../../components/ItemComponent";
import { validateBankDetails } from "../../validation/bankValidation";
import ConvertCurrency from "./ConvertUSDtoILS";

const MyItemPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [myItemHeader, setMyItemHeader] = useState(
    "Effortlessly manage, like, edit, or delete your business items. Elevate your professional presence and connections with ease."
  );
  const [moneyForWithdrawal, setMoneyForWithdrawal] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [bankS, setBank] = useState("");
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    fullName: "",
    branch: "",
    accountNumber: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("/items/my-items").then(({ data }) => {
        const isItems = data.message;
        if (isItems) {
          setMyItemHeader("No items yet, add new item easily now ");
          return;
        }
        if (userData) data = likeItemNormalization(data, userData._id);
        setDataFromServer(data);
        let sum = 0;
        for (let item of data) {
          if (item.status === "sold") {
            const price = item.price;

            sum += price;
          } else {
            sum += 0;
          }
        }
        setMoneyForWithdrawal(sum);
      });
    } catch (e) {
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
    }
  }, [moneyForWithdrawal]);

  const handleEditItem = (_id) => {
    navigate(`${ROUTES.EDITITEM}/${_id}`);
  };
  const handleAddItem = () => {
    navigate(ROUTES.ADDITEM);
  };
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleDeleteItem = async (_id) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(_id);
  };

  const confirmDeleteItem = async () => {
    try {
      const { data } = await axios.delete("/items/" + deleteItemId);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((item) => item._id !== deleteItemId)
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
  const cancelDeleteItem = () => {
    setDeleteDialogOpen(false);
    setDeleteItemId(null);
  };
  const handleLikeItem = async (_id) => {
    try {
      const { data } = await axios.patch("/items/" + _id);
    } catch (err) {
      toast("There's a problem at liking the item from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeSuccess = (_id) => {
    setDataFromServer(
      dataFromServer.map((item) =>
        item._id === _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleDeleteSoldItems = async () => {
    const data = dataFromServer;
    for (let item of data) {
      if (item.status === "sold") {
        const _id = item._id;
        try {
          const { data } = await axios.delete("/items/" + _id);
          setDataFromServer((dataFromServerCopy) =>
            dataFromServerCopy.filter((item) => item._id !== _id)
          );
          setMoneyForWithdrawal(0);
        } catch (err) {
          toast("There's a problem at deleting the item from server", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } 
    }
  };
  const handleSubmit = () => {
    const joiResponse = validateBankDetails(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;
    if (bankS === "") {
      setErrorsState("bankS");
      return;
    }
    handleDeleteSoldItems();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChangeBank = (event) => {
    let bank = event.target.value;
    setBank(bank);
  };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          pb: "0px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Your items
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "10%" }}
      >
        {myItemHeader}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {dataFromServer.map((item) => (
              <Grid item key={nextKey()} xs={12} sm={6} md={6} lg={4}>
                <ItemComponent
                  _id={item._id}
                  title={item.title}
                  brand={item.brand}
                  price={`${item.price}  $`}
                  size={item.size}
                  phone={item.phone}
                  address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
                  img={item.image.url}
                  alt={item.image.alt}
                  description={item.description}
                  status={item.status}
                  date={item.createdAt}
                  itemNumber={item.itemNumber}
                  like={item.likes}
                  onDeleteItem={handleDeleteItem}
                  onEditItem={handleEditItem}
                  onLikeItem={handleLikeItem}
                  onLikeSuccess={handleLikeSuccess}
                  onViewItem={handleViewItem}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              height: "auto",
              backgroundColor: "background.default",
              pt: 2,
              pr: 1,
              pl: 1,
              ml: { xs: 0, md: 5 },
            }}
          >
            <Typography variant="h4">Account Balance</Typography>

            <Typography variant="h2">{moneyForWithdrawal}</Typography>
            <Box>
              <ConvertCurrency
                api_key={"69eb4eb0b7cdf5687d7f3464639f7935"}
                amount={moneyForWithdrawal}
              />
            </Box>
            <Button
              variant={!moneyForWithdrawal ? "disabled" : "contained"}
              sx={{
                mt: 5,
                width: "70%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={handleClick}
              aria-describedby={id}
            >
              Get your money
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ padding: 2, minWidth: 300 }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 0, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ width: { xs: "80vw", md: "auto" } }}
                  gutterBottom
                >
                  Fill here your account details for transfer
                </Typography>
                <form noValidate autoComplete="off">
                  <Grid
                    container
                    spacing={2}
                    sx={{ width: { xs: "80vw", md: "auto" } }}
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        id="fullName"
                        onChange={handleInputsChange}
                        value={inputsValue.fullName}
                        fullWidth
                      />
                      {errorsState && errorsState.fullName && (
                        <Alert severity="warning">{errorsState.fullName}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Bank
                        </InputLabel>
                        <Select
                          labelId="bank-label"
                          id="bank"
                          fullWidth
                          value={bankS}
                          label="Bank"
                          onChange={handleChangeBank}
                        >
                          <MenuItem value={"discount"}>
                            Discount Bank - 11
                          </MenuItem>
                          <MenuItem value={"hapoalim"}>
                            Bank Hapoalim - 12
                          </MenuItem>
                          <MenuItem value={"Leumi"}>Bank Leumi - 14</MenuItem>
                          <MenuItem value={"otsarHahayal"}>
                            Bank Otsar Ha-hayal - 10
                          </MenuItem>
                          <MenuItem value={"mizrahiTefahot"}>
                            Mizrahi Tefahot Bank - 20
                          </MenuItem>
                        </Select>
                        {errorsState && bankS === "" && (
                          <Alert severity="warning">Please choose a Bank</Alert>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Branch Number"
                        id="branch"
                        variant="outlined"
                        onChange={handleInputsChange}
                        value={inputsValue.branch}
                        fullWidth
                      />
                      {errorsState && errorsState.branch && (
                        <Alert severity="warning">{errorsState.branch}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Account Number"
                        variant="outlined"
                        id="accountNumber"
                        onChange={handleInputsChange}
                        value={inputsValue.accountNumber}
                        fullWidth
                      />
                      {errorsState && errorsState.accountNumber && (
                        <Alert severity="warning">
                          {errorsState.accountNumber}
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3, width: { xs: "75vw", md: "auto" } }}
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit transfer
                  </Button>
                </form>
              </Box>
            </Popover>
          </Box>
        </Grid>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            width: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
          onClick={handleAddItem}
        >
          Add new item
        </Button>
      </Grid>
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDeleteItem}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteItem}>Cancel</Button>
          <Button onClick={confirmDeleteItem} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyItemPage;
