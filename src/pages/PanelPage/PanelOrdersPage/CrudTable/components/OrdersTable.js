import React, {useState, useMemo, useEffect, useLayoutEffect, useRef} from "react";
import SearchBox from "./SearchBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {searchOrder} from "../../../../../api/getOrder.api";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const useSortableData = (orders, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);


    const sortedUsers = useMemo(() => {
        let sortableUsers = [...orders];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [orders, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({key, direction});
    };

    return {orders: sortedUsers, requestSort, sortConfig};
};

const OrdersTable = (props) => {
    let {orders, requestSort, sortConfig} = useSortableData( props.orders);
    const [updateOrders, setUpdateOrders] = useState(orders)
    const {editOrder, deleteOrder} = props;
    const [searchValue, setSearchValue] = useState("");



    useEffect(() => {
        let updateFlag = true
        console.log('filter')
        var timeoutId = setTimeout(() => searchOrder(searchValue).then((data) => {
                if (searchValue) {
                    updateFlag = true;
                    orders = (data.data)

                    setUpdateOrders(orders)
                }
            }), 400
        )
        if (updateFlag)
            setUpdateOrders(orders)

        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchValue, orders])


    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const searchHandler = (value) => {
        setSearchValue(value);
    };


    const onRadioChange = (event) => {
        const value = event.target.value
        setSearchValue(value)
        console.log(value)
    }

    return (
        <>
            <div className="container">
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">فیلتر سفارشات</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="تحویل شده"
                        name="radio-buttons-group"
                        onChange={onRadioChange}
                    >
                        <FormControlLabel value="shipped" control={<Radio/>} label="تحویل شده"/>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <FormControlLabel value="pending" control={<Radio/>} label="در حال بررسی"/>
                        <FormControlLabel value="rejected" control={<Radio/>} label="رد شده"/>
                    </RadioGroup>
                </FormControl>
                <SearchBox searchHandler={searchHandler}/>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("first_name")}
                                className={getClassNamesFor("first_name")}
                            >
                                نام کاربر
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("last_name")}
                                className={getClassNamesFor("last_name")}
                            >
                                نام خانوادگی کاربر
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("total_bill")}
                                className={getClassNamesFor("total_bill")}
                            >
                                مجموع مبلغ
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("order_registration_date")}
                                className={getClassNamesFor("order_registration_date")}
                            >
                                زمان ثبت سفارش
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("status")}
                                className={getClassNamesFor("status")}
                            >
                                وضعیت
                            </button>
                        </th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {updateOrders.length > 0 ? (
                        updateOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.first_name}</td>
                                <td>{order.last_name}</td>
                                <td>{order.total_bill}</td>
                                <td>{order.order_registration_date}</td>
                                <td>{order.status}</td>
                                <td>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => {
                                            editOrder(order);
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        <AssessmentIcon/>
                                    </IconButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No Data</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default OrdersTable;
