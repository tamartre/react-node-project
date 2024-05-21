import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Galleria } from 'primereact/galleria';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetProductByIdQuery } from './productApiSlice';
import { useCounter } from 'primereact/hooks';
import Basket from '../../features/order/Basket';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { useAddProductMutation } from '../order/ordersApiSlice';


const ProductItem = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get('producId')
    const { data: product, isLoading, isSuccess, isError, error } = useGetProductByIdQuery(productId)


    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [describtion, setDescribtion] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate()
    const { count, increment, decrement, reset } = useCounter(1, { step: 1, min: 0 });
    const [addProduct] = useAddProductMutation()
    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => handleClick()} autoFocus />
        </div>
    )
    useEffect(() => {
        if (isSuccess) {
            setImages(product.imageArr)
            setName(product.name)
            setDescribtion(product.describtion)
            setPrice(product.price)

        }
    }, [isSuccess])

    const handleClick = () => {

        navigate(`/basket`)
    }
    const handleClickAddToBasket = () => {
        addProduct(productId)
        setVisible(true)
    }



    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
    const itemTemplate = (item) => {
        return <img src={`${item}`} alt={item.alt} style={{ width: '100%', height: '400px' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={`${item}`} alt={item.alt} style={{ maxHeight: '100px', maxHeight: '100px' }} />
    }

    return (
        <div className="card">

            <h1 style={{ fontFamily: "cursive", color: "orange", fontSize: '45px' }}>{name}</h1>
            <h2 style={{ fontFamily: "monospace", color: "black", fontSize: '30px' }}>{describtion}</h2>


            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '450px' }}
                item={itemTemplate} thumbnail={thumbnailTemplate} />

            <h2 style={{ fontFamily: "cursive", color: "orange", fontSize: '35px' }}>price: {price} ₪</h2>


            <div className="card flex justify-content-center">
                <Button style={{ borderColor: "black", backgroundColor: "orange", color: "black" }} onClick={() => handleClickAddToBasket()} label="Add to basket" />
            </div>
            <div className="card flex justify-content-center">
                {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
                <Dialog header='The product has been added to the cart.' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <p className="m-0">
                        Would you like to see your basket?
                    </p>

                </Dialog>
            </div>
        </div>

    )

}

export default ProductItem