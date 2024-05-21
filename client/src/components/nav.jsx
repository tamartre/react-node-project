import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { useSelector, useDispatch } from 'react-redux';
import { removeToken } from '../features/auth/authSlice';
import { Routes, Route, Router, Link, NavLink, useNavigate } from 'react-router-dom'
import apiSlice from '../app/apiSlice';
import useAuth from '../hooks/useAuth';
import { Button } from 'primereact/button';


const Nav = () => {

    const isUserLoggedIn = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { name } = useAuth()
    const {roles} =useAuth()
    const search = (e) => {
        navigate("/"+e.target.value)
    }
    const manager=()=>{
        navigate("/admin")
    }
    // const handleLogoutClick = () => {
    //     dispatch(removeToken())
    //     dispatch(apiSlice.util.resetApiState())
    //     navigate("/home")

    // }

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>)
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate("/")
        },
        {
            label: 'login',
            icon: 'pi pi-circle',
            command: () => navigate("/login")
        },
        {
            label: 'register       ',
            icon: 'pi pi-cog',
            command: () => navigate("/register")
        },
        {
            label: 'Logout       ',
            icon: 'pi pi-star',
            command: () => navigate("/logout")

        },
        {
            label: 'Orders history',
            icon: "pi pi-history",
            command: () => navigate("/history")
        },
        {
            label: 'Basket',
            icon: 'pi pi-cart-plus',
            // badge: 1,
            template: itemRenderer,
            command: () => navigate("/basket")
        },
        // {          
        //     label:<i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i>

        // },

        {
            label: `hello ${name}`,
            icon: "pi pi-thumbs-up-fill"

        }

    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={search} />
        </div>
    );
    return (
        <>
            
            {!isUserLoggedIn && <NavLink to="/home" style={{ color: 'white', my: 2 }}>Login</NavLink>}

            {/* {isUserLoggedIn &&<a onClick={handleLogoutClick}>Logout</a>} */}

            <div className="card">
                <Menubar model={items}
                    //start={start} 
                    end={end} />
            </div>
            {roles=="manager"?
             <Button onClick={()=>{manager()}} label="Manager Setting"  severity="warning" className="mr-2" />
            :""}
        </>
    )
}
export default Nav