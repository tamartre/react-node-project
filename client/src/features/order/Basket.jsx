import React, { useState, useEffect, useRef } from 'react';
import { OrderList } from 'primereact/orderlist';
import { useGetBasketQuery, useGetOrdersQuery, useUpdatePaidMutation } from './ordersApiSlice'
import axios from 'axios'
import { Button } from "primereact/button";
import { useRemoveProductMutation } from './ordersApiSlice'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import UpdateUser from '../user/UpdateUser';
import useAuth from '../../hooks/useAuth';


const Basket = () => {
    const { data: basket, isLoading, isSuccess, isError, error } = useGetBasketQuery()
    const { data: order,refetch ,isLoading2, isSuccess: isSuccess2 } = useGetOrdersQuery()
    const { _id, userName, name, email, phone, address, roles } = useAuth()
    const user = { _id: _id, userName: userName, name: name, email: email, phone: phone, address: address, roles: roles }
    const [removeProduct] = useRemoveProductMutation()

    const [updatePaid] = useUpdatePaidMutation()


    const toast = useRef(null);

    const accept = () => {
        let o;
        debugger
        order.forEach(element => {
            if (element.paid == 0)
                o = element
        });
        
        updatePaid(o._id)
        refetch()
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Your order is finish', life: 3000 });
    }

    useEffect(()=>
    {
       debugger
    },[order])
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm2 = () => {
        confirmDialog({
            message: `Do you want to confirn the order?it is cost ${basket.price} ₪`,
            header: 'Order Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };




    const [prodList, setProdList] = useState([]);

    const createList = async () => {
        let p = []

        if (basket.productsList) {
            for (let index = 0; index < basket.productsList.length; index++) {
                const data = await axios.get('http://localhost:1000/api/product/' + basket.productsList[index]);
                p.push(data.data)
            }
            setProdList(p)
        }
    }
    useEffect(() => {

        if (isSuccess) {
            createList()
        }

        if (isSuccess2) {
            // createList()
            setProdList([])
        }

    }, [isSuccess, basket, isSuccess2]);

    const handleDelete = async (item) => {
        if (isSuccess) {
            await removeProduct(item._id)
            await createList();
        }

    }

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.image} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                    </div>
                </div>
                <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" />
                <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" onClick={() => handleDelete(item)} />
                {/* <span className="font-bold text-900">${item.price}</span> */}

            </div>
        );
    };

    if(user.userName){
    return (
        <>
            <div className="card xl:flex xl:justify-content-center">
                <OrderList dataKey="id" value={prodList}
                    // onChange={prodList=e.value} 
                    itemTemplate={itemTemplate} header="MyBasket"></OrderList>
                {isSuccess ? <Button label={`Overall: ${basket.price} ₪`} severity="help" /> :
                    <Button label="0" severity="help" />}
</div>
            
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card flex flex-wrap gap-2 justify-content-center">
            {console.log("prodList==========",prodList)}
                {prodList.length != 0 ?
                    
                    <Button onClick={confirm2} icon="pi pi-check" label="Finish order" className="mr-2"></Button>
                    : <h2 style={{ fontFamily: "cursive", color: "black" }}>you didnd have products in your basket</h2>
                }
            </div>
            <div className="card flex flex-wrap gap-2 justify-content-center">
                {/* <Button onClick={handleClick2} label="Update Details" severity="success" raised />
                <br></br><br></br> */}

                <UpdateUser user={user} />
            </div>
        </>
    )}
    else{
        return(
            <div className="card flex flex-wrap gap-2 justify-content-center">
            <h1 style={{ fontFamily: "cursive", color: "black" }}>For buying, please login / register!</h1>
            </div>

    )}
}














export default Basket