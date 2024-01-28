// import axios from "axios";
// import { validateEditUser } from "../../validation/editUserValidation";
// import { toast } from "react-toastify";
// import ROUTES from "../../routes/ROUTES";
// const editUserSubmit = async (
//   inputsValue,
//   setErrorsState,
//   navigate,
//   userId,
//   childState
// ) => {
//   try {
//     const joiResponse = validateEditUser(inputsValue);
//     setErrorsState(joiResponse);
//     if (joiResponse) return;
//     const { data } = await axios.put("/users/" + userId, {
//       name: {
//         first: inputsValue.first,
//         middle: inputsValue.middle,
//         last: inputsValue.last,
//       },
//       phone: inputsValue.phone,
//       image: {
//         url: childState,
//         alt: inputsValue.alt,
//       },
//       address: {
        
//         country: inputsValue.country,
//         city: inputsValue.city,
//         street: inputsValue.street,
//         houseNumber: inputsValue.houseNumber,
       
//       },
//     });
//     toast("You Edited the user", {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     navigate(ROUTES.USERS);
//   } catch (err) {
//     console.log(err);
//     toast("Something is missing..", {
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
// export { editUserSubmit };
