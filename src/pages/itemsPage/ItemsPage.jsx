import { Fragment, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import nextKey from "generate-my-key";
import ItemComponent from "../../components/ItemComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import likeItemNormalization from "./likeItemNormalization";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";

const ItemsPage = () => {
  let { category = "", filter = "" } = useQueryParams();
  category = category.toLowerCase();
  filter = filter.toLowerCase();
  const [items, setItems] = useState([]);
  console.log({ items, category, filter });

  useEffect(() => {
    axios
      .get("/items")
      .then(({ data }) => {
        if (userData) data = likeItemNormalization(data, userData._id);
        setItems(data);
      })
      .catch((err) => {
        toast("Can't get the items from server", {
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const navigate = useNavigate();

  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  const handleDeleteItem = async (_id) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(_id);
  };

  const confirmDeleteItem = async () => {
    try {
      const { data } = await axios.delete("/items/" + deleteItemId);
     
      setItems((data) => data.filter((item) => item._id !== deleteItemId));
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

 
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };

  const handleAllItems = () => {
   
    navigate(ROUTES.ITEMS);
  };
  
  const handleLikeSuccess = (_id) => {
    setItems((items) =>
      items.map((item) =>
        item._id === _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleCategoryButton = (e) => {
    
    const category = e.target.value;
    navigate(`${ROUTES.ITEMS}?category=${category}`);
   
  };


  const filteredItems = items.filter((item) => {
    return (
      (filter ? item.title.toLowerCase().startsWith(filter) : true) &&
      (category ? item.category.toLowerCase() === category : true)
    );
  });

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          mt: 2,
          mb: 2,
          backgroundColor: "background.default",
        }}
      >
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="accessories"
          onClick={handleCategoryButton}
        >
          Accessories
        </Button>
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="clothing"
          onClick={handleCategoryButton}
        >
          Clothing
        </Button>
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="bags"
          onClick={handleCategoryButton}
        >
          Bags
        </Button>
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="shoes"
          onClick={handleCategoryButton}
        >
          Shoes
        </Button>
        <Button variant="text" value="others" onClick={handleCategoryButton}>
          Others
        </Button>
      </Box>
      <Container sx={{ paddingBottom: "60px" }}>
       
        <Grid
          container
          spacing={2}
          sx={{
            paddingLeft: { xs: "0 !important", sm: "auto" },
            paddingRight: { xs: "0 !important", sm: "auto" },
          }}
        >
        
          {filteredItems.map((item) => (
            <Grid item key={nextKey()} xs={12} sm={6} md={6} lg={4}>
              <ItemComponent
                _id={item._id}
                title={item.title}
                brand={item.brand}
                price={`${item.price}  $`}
                size={item.size}
                status={item.status}
                phone={item.phone}
                address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
                img={item.image.url}
                alt={item.image.alt}
                description={item.description}
                date={item.createdAt}
                bizNumber={item.bizNumber}
                like={item.likes}
                itemNumber={item.itemNumber}
                onDeleteItem={handleDeleteItem}
                
                onLikeSuccess={handleLikeSuccess}
                onViewItem={handleViewItem}
              />
            </Grid>
          ))}
        
        </Grid>

        <Button
          variant="outlined"
          sx={{
            mt: 2,
            width: { xs: "auto", md: "30%" },
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "15px",

            display: filter === "" && category === "" ? "none" : "flex",
            justifyContent: "center",
          }}
          onClick={handleAllItems}
        >
          Back to all items
        </Button>
       
      </Container>
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
          <Button onClick={confirmDeleteItem} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ItemsPage;
