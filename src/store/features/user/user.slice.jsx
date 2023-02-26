import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PAUSE } from "redux-persist";
import { getUserAuthId, signInWithGoogle, signOutFromGoogle } from "../../../firebase";

const initialState = {
  cart: [],
  savedProducts: [],
  userEmail: {},
  isSignedIn: false,
  userId: "",
  userName: '',
  profileImageSrc: ''
};

export const signInWithGoogleAsync = createAsyncThunk(
  "signInWithGoogleAsync",
  async () => {
    try {
      const userEmail = await signInWithGoogle();
      return userEmail;
    } catch (error) {
      console.log(error);
      return error
    }
  }
);

export const signOutFromGoogleAsync = createAsyncThunk(
  'signOutFromGoogle',
  async () => {
    try {
      const signedOut = await signOutFromGoogle();
      return signedOut
    } catch (error) {
      return error
    }
  }
) 

export const getUserAuthIdAsync = () => async (dispatch) => {
  const listenForIfUserIsSignedIn = async (user) => {
    if (user) {
      dispatch(setUserName(user.displayName))
      dispatch(setSignedIn(true));
      dispatch(setUserId(user.uid));
      dispatch(setProfileImageSrc(user.photoURL))
    } else {
      dispatch(setSignedIn(false));
    }
  };
  await getUserAuthId(listenForIfUserIsSignedIn);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileImageSrc: (state, {payload}) => {
      state.profileImageSrc = payload
    },
    setUserName: (state, {payload}) => {
      state.userName = payload
    },
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
    setSignedIn: (state, { payload }) => {
      state.isSignedIn = payload;
    },
    setSavedProducts: (state, { payload }) => {
      const alreadySaved = state.savedProducts.some(
        (id) => id == payload
      );
      if (!alreadySaved) {state.savedProducts.push(payload)} else {
        const indexOfProductToRemove = state.savedProducts.findIndex(
          (id) => id == payload
        );
        state.savedProducts.splice(indexOfProductToRemove, 1);
      };
    },
    addToCart: (state, { payload }) => {
      const itemInCart = state.cart.find((item) => item.id === payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);
      item.quantity++;
    },
    decrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteFromCart: (state, { payload }) => {
      console.log(payload.id);
      state.cart.splice(
        state.cart.findIndex((item) => item.id == payload.id),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogleAsync.fulfilled, (state, { payload }) => {
      state.userEmail = payload;
    });
    builder.addCase(signOutFromGoogleAsync.fulfilled, (state, {payload}) => {
      payload ? state.isSignedIn = false : state.isSignedIn = true;
    })
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  setSignedIn,
  setSavedProducts,
  setUserId,
  removeProductFromSaved,
  setUserName,
  setProfileImageSrc
} = userSlice.actions;

export default userSlice.reducer;
