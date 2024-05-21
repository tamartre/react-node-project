
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGetAllUsersQuery } from "./userSlice";
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
const AllUsers = () => {
    const navigate = useNavigate()
    const { data: users, isLoading, isSuccess ,isError, error } = useGetAllUsersQuery()
    console.log("=========",users);
    const Home = () => {
        navigate("/admin")
    }
    return (
        <>

        <div className="card">
            <DataTable value={users} tableStyle={{ minWidth: '40rem' }}>
                <Column field="userName" header="userName"></Column>
                <Column field="name" header="name"></Column>
                <Column field="email" header="email"></Column>
                <Column field="roles" header="roles"></Column>
                <Column field="phone" header="phon"></Column>
                <Column field="createdAt" header="createdAt"></Column>
            </DataTable>
        </div>
        </>
    );

}
export default AllUsers