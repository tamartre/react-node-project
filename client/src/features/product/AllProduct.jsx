import React, { useEffect, useState } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetProductsQuery } from './productApiSlice'
import { useNavigate, useParams } from 'react-router-dom';


const AllProduct = () => {
    const navigate = useNavigate()
    const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery()
    const [layout, setLayout] = useState('grid');
    const [prod, setProd] = useState('grid');
    const { search } = useParams();
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>


    const handleClick = (product) => {

        navigate(`productItem?producId=${product._id}`)
    }

    const handleClick2 = (productId) => {
        navigate(`/components/order/basket/${productId}`)
    }




    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>


                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${`${product.price}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">


                    <div className="flex flex-column align-items-center gap-3 py-5" onClick={() => handleClick(product)}>
                        <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{`₪ ${product.price}`}</span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={search?products.filter(e=>e.describtion.includes(search)):products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}


export default AllProduct

//