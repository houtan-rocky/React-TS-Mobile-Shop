import React, {useState, useMemo, useEffect} from "react";
import SearchBox from "./SearchBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);


  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
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
  }, [users, sortConfig]);

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

  return { users: sortedUsers, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
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

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  let updateSuggestion = users.filter((user) => {
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((order) => (
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
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteOrder(order.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteOrder(order.id)}
                    >
                      <AssessmentIcon />
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
