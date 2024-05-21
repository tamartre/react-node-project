import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetProductsQuery } from './productApiSlice'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useRef } from "react";
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';

import { useAddProductItemMutation } from "./productApiSlice"

const AddProduct = () => {
  const [visible, setVisible] = useState(true);
  const [addProductItem] = useAddProductItemMutation();
  const navigate = useNavigate()
  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };


  const toast = useRef(null);
  const show = () => {
    toast.current.show({ severity: 'success', summary: 'product added', detail: formik.values.value });
  };

  const formik = useFormik({

    initialValues: {
      name: "",
      code: 0,
      describtion: "",
      image: "",
      imageArr: [],
      price: 0
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
      data && show();
      addProductItem(data)
      formik.resetForm();
      navigate(`/admin`)
    }
  })
  const cancal=()=>{
    setVisible(false)
}

  return (
    <>
      <h1>add product</h1>
      <div className="card flex justify-content-center">
        <Dialog
          visible={visible}
          modal
          onHide={() => setVisible(true)}
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

              <Button type="submit" label="Add" />
              <Button type="submit" onClick={cancal}label="Cancal" />
            </form>
          )}
        ></Dialog>
      </div>
    </>
  )

}
export default AddProduct