import react, { useEffect, useRef, useState } from "react"
import { removeToken } from "./authSlice";
import React from 'react';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accept = () => {
        dispatch(removeToken())
        navigate("/")
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to log out from this site?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,

        });
    };
    return (
        <>
        <div className="card flex flex-wrap gap-2 justify-content-center">
                <ConfirmPopup />
                <Button icon="pi pi-sign-out" onClick={confirm} label="Logout" />
            </div>
        </>
    )
}

export default Logout
