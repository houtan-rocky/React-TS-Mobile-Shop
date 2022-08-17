import React, {useEffect, useState} from "react";
import OrdersTable from "./components/OrdersTable";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./components/Hooks/useModal";
import Button from "../../../../components/Button";
import {getOrders} from "../../../../api/getOrder.api";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
// import axios from "axios";

const ProductsTable = () => {
    const [orders, setOrders] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = {
        id: null,
        first_name: "",
        last_name: "",
        total_bill: "",
        order_registration_date: "",
        image: "",
        status: ""
    };
    const [currentOrder, setCurrentOrder] = useState(initialFormState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState(10);
    const {isShowing, toggle} = useModal();

    function fetchOrders() {
        getOrders()
            .then((response) =>
                response.data.map((order: any) => ({
                    id: order.id,
                    first_name: order.first_name,
                    last_name: order.last_name,
                    total_bill: order.total_bill,
                    order_registration_date: order.order_registration_date,
                    status: order.status,
                    image: order.user_avatar,
                }))
            )
            .then((data) => {
                setOrders(data);
            })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        fetchOrders();
    }, []);


    // incrementing ids + adding placeholder image manually
    // TODO: update id and image handling when tying this to a database
    const addUser = (user: any) => {
        toggle();
        user.id = orders.length + Math.random();
        console.log(user)
        // @ts-ignore
        setOrders([user, ...orders]);
    };

    const editUser = (user: any) => {
        setEditing(true);
        toggle();
        setCurrentOrder({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total_bill: user.total_bill,
            order_registration_date: user.order_registration_date,
            image: user.image,
            status: user.status
        });
    };

    const updateUser = (id: string, updatedUser: any) => {
        setEditing(false);
        // @ts-ignore
        setOrders(orders.map((user: any) => (user.id === id ? updatedUser : user)));
        toggle();
    };

    const deleteUser = (id: string) => {
        setOrders(orders.filter((user: any) => user.id !== id));
    };

    // pagination
    const indexOfLastUser = currentPage * ordersPerPage;
    const indexOfFirstUser = indexOfLastUser - ordersPerPage;
    const currentUsers = orders.slice(indexOfFirstUser, indexOfLastUser);
    // change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    console.count('panel-orders')



    // @ts-ignore
    return (
        <React.Fragment>

            <div className="page-control">

                {editing ? (
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                        setEditing={setEditing}
                        content={
                            <EditForm
                                currentUser={currentOrder}
                                updateUser={updateUser}
                            />
                        }
                    />
                ) : (
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                        setEditing={setEditing}
                        content={<AddForm addUser={addUser}
                        />}
                    />
                )}
                <OrdersTable
                    orders={currentUsers}
                    editOrder={editUser}
                    deleteOrder={deleteUser}
                />
                <Pagination
                    usersPerPage={ordersPerPage}
                    totalUsers={orders.length}
                    paginate={paginate}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </React.Fragment>
    );
};

export default ProductsTable;
