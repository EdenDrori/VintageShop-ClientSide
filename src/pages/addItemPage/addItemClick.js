import { toast } from "react-toastify";
import { validateItem } from "../../validation/itemValidation";
import { normalizeDataItem } from "./normalizeDataItem";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";

const addItemClick = async (
  inputsValue,
  setErrorsState,
  navigate,
  childState,
  category
) => {
  try {
    const joiResponse = validateItem(inputsValue);

    setErrorsState(joiResponse);
    if (joiResponse) return;
    if (category === "") {
      setErrorsState("category");
      return;
    }
    const request = normalizeDataItem(inputsValue, childState, category);

    const { data } = await axios.post("/items", request);
    data;

    toast("New item has been published! :)", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(ROUTES.MYITEM);
  } catch (err) {
    toast("Somthing is missing... try again", {
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
export { addItemClick };
