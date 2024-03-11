import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  Grid,
  
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useState } from "react";
import IconsGuard from "../Guard/IconsGuard";
import LoggedOutGuard from "../Guard/LoggedOutGuard";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import IconsGuardLocation from "../Guard/IconsGuardLocation";
import IconsGuardFavorite from "../Guard/IconsGuardFavorite";

const ItemComponent = ({
  _id,
  title,
  brand,
  category,
  phone,
  price,
  value,
  currecy,
  status,
  size,
  likes,
  address,
  description,
  date,
  img,
  alt,
  like,
  itemNumber,
  onDeleteItem,
  onLikeItem,
  onEditItem,
  onLikeSuccess,
  onViewItem,
}) => {
  const theme = useTheme();
  const handlePhoneClick = () => {
    toast.info(`Phone Num:${phone}. `, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const statusVal = status;
  
  const handleDeleteItemClick = () => {
    onDeleteItem(_id);
  };
  const handleClickEditItem = () => {
    onEditItem(_id);
  };
  const handleLikeItem = async () => {
    try {
      const { data } = await axios.patch("/items/" + _id);

      onLikeSuccess(_id);
    } catch (err) {
      toast.info(`Somthing is wrong on server`, err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleClickViewItem = () => {
    onViewItem(_id);
  };
 
  return (
    <Card
      sx={{
        boxShadow: "none",
        margin: { xs: 0, lg: "5%" },
        marginTop: { xs: 5, lg: "5%" },
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        width: { xs: "80vw", sm: "40vw", md: "25vw", lg: "17vw" },
        paddingLeft: { xs: "0 !important", sm: "auto" },
        paddingRight: { xs: "0 !important", sm: "auto" },
      }}
    >
      <CardActionArea
        sx={{
          "&:hover img": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleClickViewItem}
      >
        <CardMedia
          component="img"
          image={img}
          alt={alt}
          sx={{
            height: "40vh",
            objectFit: "cover",
            width: "100%",
            transition: "transform 0.1s ease-in-out", 
          }}
        />
      </CardActionArea>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <CardHeader
              title={title}
              subheader={brand}
              sx={{ p: 0, mb: 1, textTransform: "capitalize" }}
            />
          </Grid>
          <Grid
            item
            sx={{ display: statusVal === "available" ? "none" : "block" }}
          >
            <Typography variant="body2">{status}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{price}</Typography>
          </Grid>
        </Grid>
        <Divider />

        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton
              sx={{
                padding: { xs: "4px", md: "8px" },
                paddingTop: { xs: "12px" },
                marginTop: { md: "10px" },
              }}
              onClick={handlePhoneClick}
            >
              <PhoneIcon />
            </IconButton>
            <IconsGuardLocation>
              <IconsGuard>
                <IconButton
                  sx={{
                    padding: { xs: "4px", md: "8px" },
                    paddingTop: { xs: "12px" },
                    marginTop: { md: "10px" },
                  }}
                  onClick={handleClickEditItem}
                >
                  <CreateIcon />
                </IconButton>
              </IconsGuard>
            </IconsGuardLocation>
          </Box>

          <Box>
            <LoggedOutGuard>
              <IconsGuard>
                <IconsGuardFavorite>
                  <IconButton
                    sx={{
                      padding: { xs: "4px", md: "8px" },
                      paddingTop: { xs: "12px" },
                      marginTop: { md: "10px" },
                    }}
                    onClick={handleDeleteItemClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </IconsGuardFavorite>
              </IconsGuard>
            </LoggedOutGuard>
            <LoggedOutGuard>
              <IconButton
                sx={{
                  padding: { xs: "4px", md: "8px" },
                  paddingTop: { xs: "12px" },
                  marginTop: { md: "10px" },
                }}
                onClick={handleLikeItem}
              >
                <FavoriteIcon color={like ? "error" : ""} />
              </IconButton>
            </LoggedOutGuard>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
ItemComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  brand: PropTypes.string,
  price: PropTypes.string,
  size: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  itemNumber: PropTypes.number,
  like: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onLikeItem: PropTypes.func,
  onLikeSuccess: PropTypes.func,
  onViewItem: PropTypes.func.isRequired,
};
ItemComponent.defaultProps = {
  img: "https://i.pinimg.com/564x/cb/c1/c1/cbc1c1aeef9092676adcd3c13a167860.jpg",
  alt: "running",
};
export default ItemComponent;
