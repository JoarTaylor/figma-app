import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PAUSE } from "redux-persist";
import { addUserToFirebase, getUserAuthId, getUserFromFireBase, signInWithGoogle, signOutFromGoogle } from "../../../firebase";

const initialState = {
  cart: [],
  savedProducts: [],
  userEmail: {},
  isSignedIn: false,
  userId: "",
  userName: '',
  profileImageSrc: ''
};

export const getUserAsync = () => async (dispatch, getState) => {
  const state = getState()
  const { userId } = state.user;
  try {
   const user = await getUserFromFireBase('users', userId);
   dispatch(setCurrentUserFromFireBase(user))
  } catch (error) {
    throw new Error(error.code);
  }
}

export const saveUserAsync = () => async (_, getState) => {
  const state = getState()
  const {savedProducts, userId} = state.user;
  const userData = {
    'savedProducts': savedProducts
  }
  try {
    const user = addUserToFirebase('users', userId, userData)
    return user
  } catch (error) {
    console.log(error)
  }
} 

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
      console.log(user)
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
    setCurrentUserFromFireBase: (state, {payload}) => {
      const { savedProducts } = payload;
      state.savedProducts = savedProducts
    },
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
        (product) => product.id == payload.id
      );
      if (!alreadySaved) {state.savedProducts.push(payload)} else {
        const indexOfProductToRemove = state.savedProducts.findIndex(
          (product) => product.id == payload.id
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
      if(!item) {
        state.cart.push({...payload, quantity: 1}) 
      } else {
        item.quantity++;
      }
    },
    decrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item.quantity === 0) {
        item.quantity = 0;
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
  setProfileImageSrc,
  setCurrentUserFromFireBase
} = userSlice.actions;

export default userSlice.reducer;
