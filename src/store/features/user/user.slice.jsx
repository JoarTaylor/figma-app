import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAuthId, signInWithGoogle } from "../../../firebase";

const initialState = {
  cart: [],
  savedProducts: [],
  userEmail: {},
  isSignedIn: false,
  userId: "",
  userName: ''
};

export const signInWithGoogleAsync = createAsyncThunk(
  "signInWithGoogleAsync",
  async () => {
    try {
      const userEmail = await signInWithGoogle();
      return userEmail;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserAuthIdAsync = () => async (dispatch) => {
  const listenForIfUserIsSignedIn = async (user) => {
    if (user) {
      console.log(user)
      dispatch(setUserName(user.displayName))
      dispatch(setSignedIn(true));
      dispatch(setUserId(user.uid));
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
        (product) => product.id == payload
      );
      if (!alreadySaved) state.push.payload;
    },
    removeProductFromSaved: (state, { payload }) => {
      const indexOfProductToRemove = state.savedProducts.findIndex(
        (product) => product.id == payload
      );
      state.savedProducts.splice(indexOfProductToRemove, 1);
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
  setUserName
} = userSlice.actions;

export default userSlice.reducer;
