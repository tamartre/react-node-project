
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGetOrdersQuery } from "./ordersApiSlice";
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const AllOrders = () => {
    const { data: allOrders, isLoading, isSuccess, isError, error } = useGetOrdersQuery()
    const navigate = useNavigate()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    

    const Home = () => {
        navigate("/admin")
    }
    
    return (
        <>
         {/* <Button onClick={Home} label="Home" severity="success" raised />
            <br></br><br></br> */}
        <div className="card">
            <DataTable value={allOrders} tableStyle={{ minWidth: '40rem' }}>
                <Column field="user" header="user"></Column>
                <Column field="orderDate" header="orderDate"></Column>
                <Column field="updatedAt" header="updatedAt"></Column>
                <Column field="paid" header="paid"></Column>
                <Column field="price" header="price"></Column>
            </DataTable>
        </div>
        </>
    );

}
export default AllOrders