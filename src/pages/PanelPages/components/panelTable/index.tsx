import React, {useEffect, useState} from "react";
import DirectoryTable from "./components/DirectoryTable";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./components/Hooks/useModal";
import {DeleteProducts} from "../../../../api/product";

const ProductsTable = (props: any) => {
    const getTableItems = props.getTableItems


    const [tableItems, setTableItems] = useState([]);
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
    const [currentTableItem, setCurrentTableItem] = useState(initialFormState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState(10);
    const {isShowing, toggle} = useModal();

    function fetchTableItems() {
        getTableItems()
            .then((response: any) =>
                response.data.map((item: any) => ({
                    ...item
                }))
            )
            .then((data: any) => {
                setTableItems(data);
            })
            .catch((err: any) => console.log(err));
    }


    useEffect(() => {
        fetchTableItems();
    }, []);


    const addTableItem = (user: any) => {
        toggle();
        user.id = tableItems.length + Math.random();
        console.log(user)
        // @ts-ignore
        setTableItems([user, ...tableItems]);
    };

    const editTableItem = (item: any) => {
        setEditing(true);
        toggle();
        setCurrentTableItem({
            ...item,
        });
    };

    const updateTableItem = (id: string, updatedUser: any) => {
        setEditing(false);
        // @ts-ignore
        setTableItems(tableItems.map((user: any) => (user.id === id ? updatedUser : user)));
        toggle();
    };

    const deleteTableItem = (id: string) => {
        // setTableItems(tableItems.filter((user: any) => user.id !== id));
        DeleteProducts(id)
        setTableItems(tableItems.filter((user: any) => user.id !== id));
    };

    // pagination
    const indexOfLastTableItem = currentPage * ordersPerPage;
    const indexOfFirstTableItem = indexOfLastTableItem - ordersPerPage;
    const currentTableItems = tableItems.slice(indexOfFirstTableItem, indexOfLastTableItem);
    // change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // turn strings to path

    console.count('panel-listItems')



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
                                currentUser={currentTableItem}
                                updateTableItem={updateTableItem}
                            />
                        }
                    />
                ) : (
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                        setEditing={setEditing}
                        content={<AddForm addUser={addTableItem}
                        />}
                    />
                )}
                <DirectoryTable
                    tableHeader={props.tableHeads}
                    tableItems={currentTableItems}
                    editOrder={editTableItem}
                    deleteOrder={deleteTableItem}
                    filter={props.filter}
                    searchTableItems={props.searchTableItems}
                    hasActionButtons={props.hasActionButtons}
                />
                <Pagination
                    usersPerPage={ordersPerPage}
                    totalUsers={tableItems.length}
                    paginate={paginate}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </React.Fragment>
    );
};

export default ProductsTable;
