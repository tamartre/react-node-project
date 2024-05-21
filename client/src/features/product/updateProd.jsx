import React, { useState,useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetProductsQuery } from './productApiSlice'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import  { useRef } from "react";
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';

import { useDeleteProductItemMutation,useUpdateProductItemMutation } from "./productApiSlice"

const UpdateProd = ({product}) => {
    const [visible, setVisible] = useState(false);

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const[updateProductItem]=useUpdateProductItemMutation() 
    const updateProd = () => {
        setVisible(true)

    }


    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'product updated', detail: formik.values.value });
    };

        const formik = useFormik({
      
            initialValues: {
                _id:product._id,
                name: product?product.name:"",
                code: product?product.code:0,
                describtion: product?product.describtion:"",
                image: product?product.image:"",
                imageArr: product?product.imageArr:[],
                price:product?product.price:0
            },
            validate: (data) => {
                let errors = {};

                if (!data.name) {
                    errors.name = 'Name - name is required.';
                  }
                  if (!data.code) {
                    errors.code = 'Code - code is required.';
                  }
                  if (!data.price) {
                    errors.price = 'Price - price is required.';
                  }

    
                return errors;
            },
            onSubmit: (data) => {
                data && show(data);
                updateProductItem(data)
                formik.resetForm();
                setVisible(false)
            }
        })
        const cancal=()=>{
            setVisible(false)
        }
    return (
        <>
        <Button onClick={updateProd} icon="pi pi-pencil" rounded severity="info" aria-label="User" />
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={(e) => {
                            formik.setFieldValue('name', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                    />
                    <label htmlFor="input_value">Name</label>
                </span>
                {getFormErrorMessage('name')}

                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="code"
                        name="code"
                        value={formik.values.code}
                        onChange={(e) => {
                            formik.setFieldValue('code', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('code') })}
                    />
                    <label htmlFor="input_value">Code</label>
                </span>
                {getFormErrorMessage('code')}

                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="describtion"
                        name="describtion"
                        value={formik.values.describtion}
                        onChange={(e) => {
                            formik.setFieldValue('describtion', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('describtion') })}
                    />
                    <label htmlFor="input_value">Describtion</label>
                </span>
                {getFormErrorMessage('describtion')}

                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={(e) => {
                            formik.setFieldValue('price', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                    />
                    <label htmlFor="input_value">Price</label>
                </span>
                {getFormErrorMessage('price')}


                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="image"
                        name="image"
                        value={formik.values.image}
                        onChange={(e) => {
                            formik.setFieldValue('image', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('image') })}
                    />
                    <label htmlFor="input_value">Image</label>
                </span>
                {getFormErrorMessage('image')}

                <span className="p-float-label">
                    <Toast ref={toast} />
                    <InputText
                        id="imageArr"
                        name="imageArr"
                        value={formik.values.imageArr}
                        onChange={(e) => {
                            formik.setFieldValue('imageArr', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('imageArr') })}
                    />
                    <label htmlFor="input_value">ImageArr</label>
                </span>
                {getFormErrorMessage('imageArr')}

                <Button type="submit" label="Update" />
                <Button type="submit" onClick={cancal}label="Cancal" />
            </form>
                )}
            ></Dialog>
        </div>
        </>
    )
}
export default UpdateProd