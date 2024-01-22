import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AutoDeleteSoldItems = ({ dataFromServer, setDataFromServer }) => {
  useEffect(() => {
    // Set up an interval to check and delete sold items
    const intervalId = setInterval(() => {
      handleAutoDelete();
    }, 24 * 60 * 60 * 1000); // Run every 24 hours

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Only run this effect once on component mount

  const handleAutoDelete = async () => {
    try {
      const currentDate = new Date();

      // Filter items that are sold and have been sold for 3 or more days
      const itemsToDelete = dataFromServer.filter(
        (item) =>
          item.status === "sold" && isSoldForThreeDays(item, currentDate)
      );

      // Delete each item that meets the criteria
      for (let itemToDelete of itemsToDelete) {
        const { data } = await axios.delete("/items/" + itemToDelete._id);
        setDataFromServer((prevData) =>
          prevData.filter((item) => item._id !== itemToDelete._id)
        );
        toast.success(`Item "${itemToDelete.title}" deleted automatically.`);
      }
    } catch (err) {
      toast.error("Auto delete failed. Check the server or logs.");
    }
  };

  const isSoldForThreeDays = (item, currentDate) => {
    const saleDate = new Date(item.saleDate);
    const daysDifference = (currentDate - saleDate) / (1000 * 60 * 60 * 24);
    console.log(daysDifference);
    return daysDifference >= 3;
  };

  return null; // This component doesn't render anything visible
};

export default AutoDeleteSoldItems;
