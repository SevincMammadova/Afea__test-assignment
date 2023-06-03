import { createAsyncThunk } from '@reduxjs/toolkit';
import { homePageActions } from './homeSlice';
import {getFilteredProducts, getProducts} from "./const";

export const getProductsThunk = createAsyncThunk(
    getProducts,
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://dummyjson.com/products`
            );

            const data = await response.json();
            // dispatch(homePageActions.setPopularMovies(data));

            console.log('data', data);
            if (!response.ok) {
                throw new Error('Can not get products. Please try again!.');
            }
            return data;


        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getFilteredProductsThunk = createAsyncThunk(
    getFilteredProducts,
    async (value, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://dummyjson.com/products/search?q=${value}`
            );

            const data = await response.json();
            // dispatch(homePageActions.setPopularMovies(data));

            console.log('data1111', data);
            if (!response.ok) {
                throw new Error('Can not get products. Please try again!.');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
