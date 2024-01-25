import { useEffect, useState } from "react";
import { Box, Container, Grid, Link, Typography, Button } from "@mui/material";
import nextKey from "generate-my-key";
import ItemComponent from "../../components/ItemComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import likeItemNormalization from "./likeItemNormalization";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// const filterValues = {
//   clothing: ["Dress", "Skirt", "Shirt"],
//   accessories: ["belt", "hat"],
// };

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const { category = "", filter = "" } = useQueryParams();

  useEffect(() => {
    axios
      .get("/items")
      .then(({ data }) => {
        setItems(
          data.filter((x) => {
            return (
              (filter
                ? x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
                : true) &&
              (category
                ? x.category.toLowerCase() === category.toLowerCase()
                : true)
            );
          })
        );
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
  }, [filter]);

  // const [dataFromServer, setDataFromServer] = useState([]);
  // const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  // const [initialFilteredData, setInitialFilteredData] = useState([]);

  // const navigate = useNavigate();

  // const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  // const query = useQueryParams();
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   setRefreshState("1");
  //   // }, 1000);
  //   axios
  //     .get("/items")
  //     .then(({ data }) => {
  //       //console.log("data", data);
  //       if (userData) data = likeItemNormalization(data, userData._id);
  //       //console.log("userData", userData);
  //       setInitialDataFromServer(data);
  //       setDataFromServer(data);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       toast("Can't get the items from server", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   if (!initialDataFromServer.length) return;
  //   const filter = query.filter ? query.filter : "";
  //   // const filterSubvalues = filterValues[filter];
  //   setDataFromServer(
  //     initialDataFromServer.filter((item) =>
  //       item.category.toLowerCase().startsWith(filter.toLowerCase())
  //     )
  //   );
  //   // setDataFromServer(
  //   //   initialDataFromServer.filter(
  //   //     (item) =>
  //   //       filterSubvalues.some((x) => item.title.toLowerCase().startsWith(x))
  //   //     //item.title.toLowerCase().startsWith(filter.toLowerCase())
  //   //   )
  //   // );
  // }, [query, initialDataFromServer]);

  const handleDeleteItem = async (_id) => {
    try {
      const { data } = await axios.delete("/items/" + _id);
      setItems((dataFromServerCopy) =>
        dataFromServerCopy.filter((item) => item._id != _id)
      );
    } catch (err) {
      toast("There is error on deleting", {
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
  // const handleEditItem = async (_id) => {
  //   try {
  //     const { data } = await axios.get("/items/" + _id);
  //     if (data.user_id == userData._id || userData.isAdmin) {
  //       navigate(`${ROUTES.EDITITEM}/${_id}`);
  //     } else {
  //       toast("You can only edit your items", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }
  //   } catch (err) {
  //     toast("There's a problem with the edit request from server", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };
  const handleLikeItem = async (_id) => {
    try {
      const { data } = await axios.patch("/items/" + _id);
      setItems(
        items.map((item) =>
          item._id == _id ? { ...item, likes: !item.likes } : item
        )
      );
    } catch (err) {
      toast("There's a problem with the likes request from server", {
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
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };

  const handleAllItems = () => {
    navigate(ROUTES.ITEMS);
  };
  const handleLikeSuccess = (_id) => {
    setItems(
      items.map((item) =>
        item._id == _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleCategoryButton = (e) => {
    console.log(items, "D");
    if (!items.length) return;
    const category = e.target.value;
    navigate(`${ROUTES.ITEMS}?category=${category}`);

    // setItems(
    //   items.filter((item) =>
    //     item.category.toLowerCase().startsWith(filter.toLowerCase())
    //   )
    // );
  };

  // const handleDressesFilter = () => {
  //   console.log(initialDataFromServer);
  //   if (!initialDataFromServer.length) return;
  //   setDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith("Dress"))
  //   );
  // };
  // const handleBeltsFilter = () => {
  //   console.log(initialDataFromServer);
  //   if (!initialDataFromServer.length) return;
  //   setInitialDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith("Belt"))
  //   );
  // };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={4}>
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
                  like={item.likes.includes(userData._id)}
                  itemNumber={item.itemNumber}
                  onDeleteItem={handleDeleteItem}
                  //onEditItem={handleEditItem}
                  onLikeItem={handleLikeItem}
                  onLikeSuccess={handleLikeSuccess}
                  onViewItem={handleViewItem}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //alignItems: "center",
              //justifyContent: "center",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="accessories"
              onClick={handleCategoryButton}
            >
              Belts
            </Button>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="clothing"
              onClick={handleCategoryButton}
            >
              Dresses
            </Button>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="bags"
              onClick={handleCategoryButton}
            >
              Bags
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        sx={{
          mt: 2,
          width: "30%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={handleAllItems}
      >
        Back to all items
      </Button>
      {/* <div className="App">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
        <img src={file} />
      </div> */}
    </Container>
  );
};

export default ItemsPage;
