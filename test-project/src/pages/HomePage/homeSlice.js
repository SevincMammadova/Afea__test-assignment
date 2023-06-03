import { createSlice } from '@reduxjs/toolkit';
import { getProductsThunk } from './thunk';

const initialState = {
    products: [],
    limit: 0,
    skip: 0,
    total: 0,
    loading: false,
}

export const homeSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            const { payload } = action;

            console.log('payload', payload);
            state.products = payload.products;
            state.limit = payload.limit;
            state.total = payload.total;
            state.skip = payload.skip;
            state.loading = false;

        });
        builder.addCase(getProductsThunk.rejected, (state) => {
            state.loading = false;
        });
    }
})

export const homePageActions = {
    ...homeSlice.actions
};

export const homePageReducer = homeSlice.reducer;
