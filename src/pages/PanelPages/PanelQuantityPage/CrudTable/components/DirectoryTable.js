import React, {useState, useMemo, useEffect} from "react";
import SearchBox from "./SearchBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {GetProducts} from "../../../../../api/product";
import Button from "../../../../../components/Button";

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
  let { products, requestSort, sortConfig } = useSortableData(props.products);
  const [editedProducts, setEditedProducts] = useState([]);
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


    function getSiblings (elem) {
        return Array.from(elem.parentNode.children).filter(function (sibling) {
            return sibling !== elem;
        });
    }

  const handleTDClick = e => {
    e.preventDefault();
    e.target.contentEditable = true;

  };

    const handleTDChange = e => {
      const name = e.target.getAttribute('data-name');
      console.log(name)
      const value = e.target.value;
      console.log(getSiblings(e.target)[0].textContent)
      let productId = getSiblings(e.target)[0].textContent;
      console.log(products)
      setEditedProducts((prevEditedProducts) => {
        return [...prevEditedProducts,{}]
      })

      products = products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            [name]: value,
          }
        } else {
          return product
        }
      })
      console.log(products)
    }

  const handleRefreshButtonClick = () => {

    console.log('hi')
  }

  return (
    <>
      <div className="container">
        <div className="container" onClick={handleRefreshButtonClick}>
          <Button>
            تازه کردن
          </Button>
        </div>
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
                  <td hidden>{product.id}</td>
                  <td >{product.name}</td>
                  <td data-name={'price'} onClick={handleTDClick} onBlur={handleTDChange}>{product.price}</td>
                  <td data-name={'quantity'} onClick={handleTDClick} onBlur={handleTDChange}>{product.quantity}</td>

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
