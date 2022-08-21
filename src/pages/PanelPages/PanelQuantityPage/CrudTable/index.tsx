import React, {useEffect, useState} from "react";
import DirectoryTable from "./components/DirectoryTable";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./components/Hooks/useModal";
import Button from "../../../../components/Button";
import {getOrders} from "../../../../api/getOrder.api";
import {GetProducts} from "../../../../api/product";
// import axios from "axios";

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = {
        id: null,
        name: "",
        price: "",
        quantity: "",
        image: "",
    };
    const [currentOrder, setCurrentProduct] = useState(initialFormState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState(10);
    const {isShowing, toggle} = useModal();

    function fetchProducts() {
        GetProducts()
            .then((response) =>
                response.data.map((product: any) => ({
                    ...product,
                    id: product.id,
                    name: product['product-name-fa'],
                    price: product.price.amount,
                    image: product.image,
                    quantity: product.count
                }))
            )
            .then((data) => {
                setProducts(data);
            });
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    // incrementing ids + adding placeholder image manually
    // TODO: update id and image handling when tying this to a database
    const addProduct = (user: any) => {
        toggle();
        user.id = products.length + Math.random();
        console.log(user)
        // @ts-ignore
        setProducts([user, ...products]);
    };

    const editProduct = (product: any) => {
        setEditing(true);
        toggle();
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            price: product.price.amount,
            quantity: product.count,
        }));
    };

    const updateUser = (id: string, updatedUser: any) => {
        setEditing(false);
        // @ts-ignore
        setProducts(products.map((user: any) => (user.id === id ? updatedUser : user)));
        toggle();
    };

    const deleteUser = (id: string) => {
        setProducts(products.filter((user: any) => user.id !== id));
    };

    // pagination
    const indexOfLastUser = currentPage * ordersPerPage;
    const indexOfFirstUser = indexOfLastUser - ordersPerPage;
    const currentProducts = products.slice(indexOfFirstUser, indexOfLastUser);
    // change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    console.count('quantity-table')
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
                        content={<AddForm addUser={addProduct}
                        />}
                    />
                )}
                <DirectoryTable
                    products={currentProducts}
                    editUser={editProduct}
                    deleteUser={deleteUser}
                />
                <Pagination
                    usersPerPage={ordersPerPage}
                    totalUsers={products.length}
                    paginate={paginate}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </React.Fragment>
    );
};

export default ProductsTable;
