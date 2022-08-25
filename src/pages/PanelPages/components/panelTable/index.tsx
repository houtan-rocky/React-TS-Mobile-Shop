import React, {useEffect, useState} from "react";
import DirectoryTable from "./components/DirectoryTable";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Pagination from "./components/Pagination";
import AddEditModal from "./components/AddEditModal";
import useModal from "./components/Hooks/useModal";
import {DeleteProducts, UpdateProduct} from "../../../../api/product";
import swal from "sweetalert";
import {GetCategories} from "../../../../api/getCategory.api";

const ProductsTable = (props: any) => {
    const getTableItems = props.getTableItems

    const [categories, setCategories] = useState([]);
    const [tableItems, setTableItems] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = {
        id: '',
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

    const updateCurrentTableItem = () => {
        UpdateProduct(currentTableItem.id, currentTableItem).then(() => {
            fetchTableItems();
            swal({
                title: "کالا با موفقیت ویرایش شد",
                text: "کالای مورد نظر با موفقیت ویرایش شد",
                icon: "success",
                dangerMode: true,
                buttons: [
                    'باشه'
                ]
            })
        }).catch(() =>
            swal({
                title: "مشکلی پیش آمد",
                text: "در به روز رسانی کالا مشکلی وجود دارد",
                icon: "error",
                dangerMode: true,
                buttons: [
                    'باشه'
                ]
            }))

        toggle();
        setEditing(false);
    }

    useEffect(() => {
        // setTableItem(props.currentUser);
        fetchCategories()
    }, [props]);

    const fetchCategories = () => {
        GetCategories().then(res => setCategories(res.data))
    }

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

    };

    const deleteTableItem = (id: string) => {
        // setTableItems(tableItems.filter((user: any) => user.id !== id));
        swal({
            title: "حذف کردن؟",
            text: "شما در حال حذف کردن داده هستید",
            icon: "warning",
            buttons: [
                'توقف عملیات',
                'حذف کن'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'حذف شد',
                    text: 'داده با موفقیت حذف شد',
                    icon: 'success'
                }).then(function () {
                    DeleteProducts(id)
                    setTableItems(tableItems.filter((user: any) => user.id !== id));
                });
            } else {
                swal("رد شد", "داده حذف نشد", "error");
            }
        })

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
                    <AddEditModal
                        isShowing={isShowing}
                        hide={toggle}
                        setEditing={setEditing}
                        content={
                            <EditForm
                                currentUser={currentTableItem}
                                updateTableItem={updateTableItem}
                                setCurrentTableItem={setCurrentTableItem}
                                currentTableItem={currentTableItem}
                                updateCurrentTableItem={updateCurrentTableItem}
                                categories={categories}
                            />
                        }
                    />
                ) : (
                    <AddEditModal
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
                    categories={categories}
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
