import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useRef } from "react";
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';

import { useUpdateUserMutation } from "./userSlice"

const UpdateUser = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const [updateUser] = useUpdateUserMutation()
    const updateUser2 = () => {
        setVisible(true)

    }

    const cancal=()=>{
        setVisible(false)
    }
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'product updated', detail: formik.values.value });
    };

    const formik = useFormik({

        initialValues: {
            _id: user._id,
            userName: user ? user.userName : "",
            name: user ? user.name : "",
            email: user ? user.email : "",
            address: user ? user.address : "",
            // street: user ? user.address.street : "",
            // city: user ? user.address.city : "",
            // buildNumber: user ? user.address.buildNumber : "",
            // zipCode: user ? user.address.zipCode : "",
            phone: user ? user.phone : 0

        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name - name is required.';
            }
            if (!data.userName)
                errors.userName = 'userName - userName is required.';


            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            updateUser(data)
            formik.resetForm();
            setVisible(false)
        }
    })
    return (
        <>
            
            <div className="card flex justify-content-center">
            <Button onClick={updateUser2}label="Update Details" severity="success" raised/>
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
                                    id="userName"
                                    name="userName"
                                    value={formik.values.userName}
                                    onChange={(e) => {
                                        formik.setFieldValue('userName', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('userName') })}
                                />
                                <label htmlFor="input_value">UserName</label>
                            </span>
                            {getFormErrorMessage('userName')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue('email', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                                />
                                <label htmlFor="input_value">Email</label>
                            </span>
                            {getFormErrorMessage('email')}


                            <Button type="submit" label="Update" />
                            <Button type="submit" onClick={cancal}label="Cancal" />
                        </form>
                    )}
                ></Dialog>
            </div>
        </>
    )
}
export default UpdateUser