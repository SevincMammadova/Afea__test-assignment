import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFilteredProductsThunk, getProductsThunk} from "./thunk";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, FormControl, InputLabel, MenuItem, NativeSelect} from '@mui/material';
import { Select } from '@mui/material';
import './style.scss';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state['@homePage']);
    const [order, setOrder] = useState('');
    const [productList, setProductList] = useState(products);
    const [brands, setBrands] = useState([]);
    const [prices, setPrices] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectBrand, setSelectBrand] = useState('None');
    const [selectPrice, setSelectPrice] = useState('None');
    const [selectRating, setSelectRating] = useState('None');

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])


    useEffect(() => {
      setProductList(products)
    }, [])

    useEffect(() => {
        const brands = products?.map((product) => product?.brand);
        const prices = products?.map((product) => product?.price);
        const ratings = products?.map((product) => product?.rating);

        setPrices(prices);
        setBrands(brands);
        setRatings(ratings);
    }, [productList])



    // useEffect(() => {
    //     dispatch(getFilteredProductsThunk('Apple'))
    // }, [])


    const sortByPriceAscending = (productList) => {

        const data = [...productList].sort((a, b) => a.price - b.price);

         setProductList(data)
    }

    const sortByPriceDescending = (productList) => {

        const data = [...productList].sort((a, b) => b.price - a.price);

        setProductList(data)
    }

    const sortByTitleAscending = (productList) => {

        const data = [...products].sort((a, b) => a.title.localeCompare(b.title));

        setProductList(data)
    }

    const sortByTitleDescending = (productList) => {

        const data = [...products].sort((a, b) => b.title.localeCompare(a.title))

        setProductList(data)
    }

    const sortByRatingAscending = (productList) => {

        const data = [...productList].sort((a, b) => a.rating - b.rating)

        setProductList(data)
    }
     const sortByRatingDescending = (productList) => {

        const data = [...productList].sort((a, b) => b.rating - a.rating)

        setProductList(data)
    }

    const filterProductsByPrice = (value) => {
        setSelectPrice(value);
        const filteredList = productList?.filter((product) => (
            product?.price === value
        ))

        setProductList(filteredList)
    }

    const filterProductsByBrands = (value) => {
        setSelectBrand(value);
        const filteredList = productList?.filter((product) => (
            product?.brand === value
        ))

        setProductList(filteredList)
    }

    const filterProductsByRating = (value) => {
        setSelectRating(value);
        const filteredList = productList?.filter((product) => (
            product?.rating === value
        ))

        setProductList(filteredList)
    }

    const resetFilters = () => {
        setBrands('None');
        setPrices('None');
        setRatings('None');
        setProductList(products)
    }


    return (
        <>
            <div className="filter-box">
                <div className="filter-box__title">Order by</div>
                <div className='filter-box__product-order product-order'>
                    <div onClick={() => sortByPriceAscending(productList)} className='product-order__item'>From cheap to expensive</div>
                    <div onClick={() => sortByPriceDescending(productList)} className='product-order__item'>From expensive to cheap</div>
                    <div onClick={() => sortByTitleAscending(productList)} className='product-order__item'>Title from A to Z</div>
                    <div onClick={() => sortByTitleDescending(productList)} className='product-order__item'>Title from Z to A</div>
                    <div onClick={() => sortByRatingAscending(productList)} className='product-order__item'>Rating from low to
                        high</div>
                    <div onClick={() => sortByRatingDescending(productList)} className='product-order__item'>Rating from high to
                        low</div>
                </div>
            </div>
            <div className="filter-box">
                <div className="filter-box__title">Filter by</div>
                <div className='filter-box__product-filter product-order'>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-standard-label">Price</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={selectPrice}
                            onChange={(e) => {
                                filterProductsByPrice(e?.target?.value)
                            }}
                            label="Price"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {prices?.map((price, index) => (
                                <MenuItem key={price+index} value={price}>{price}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-standard-label">Brands</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={selectBrand}
                            onChange={(e) => {
                                filterProductsByBrands(e?.target?.value)
                            }}
                            label="Brand"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {brands?.map((brand, index) => (
                                <MenuItem key={brand+index} value={brand}>{brand}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200}}>
                        <InputLabel id="demo-simple-select-standard-label">Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={selectRating}
                            onChange={(e) => filterProductsByRating(e?.target?.value)}
                            label="Rating"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {ratings?.map((rating, index) => (
                                <MenuItem key={rating+index} value={rating}>{rating}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <button
                        onClick={() => resetFilters()}
                        className="filter-box__reset-btn"
                    >
                            Reset filters
                    </button>
                </div>
            </div>

            <div className={'product-box'}>
                {loading
                    ? <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                    : productList?.map((product) => (
                        <Card key={product?.id} sx={{ width: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product?.images[0]}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Title: {product?.title}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Brand: {product?.brand}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Rating: {product?.rating}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Price: {product?.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product?.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }
            </div>
        </>

    )
}