import React, {useState, useMemo, useEffect} from "react";
import SearchBox from "./SearchBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {GetProducts} from "../../../../../api/Product.api";

const useSortableData = (products, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);


  const sortedProducts = useMemo(() => {
    let sortableUsers = [...products];
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
  }, [products, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { products: sortedProducts, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { products, requestSort, sortConfig } = useSortableData(props.products);
  const { editOrder, deleteOrder } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateProducts = products.filter((product) => {
    return Object.keys(product).some((key) =>
      product[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  let updateSuggestion = products.filter((user) => {
    return Object.keys(user).some((key) =>
        user[key]
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("name")}
                  className={getClassNamesFor("name")}
                >
                  کالا
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("price")}
                  className={getClassNamesFor("price")}
                >
                  قیمت
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("quantity")}
                  className={getClassNamesFor("quantity")}
                >
                  موجودی
                </button>
              </th>


              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateProducts.length > 0 ? (
              updateProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        editOrder(product);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteOrder(product.id)}
                    >
                      <DeleteIcon />
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

export default DirectoryTable;
