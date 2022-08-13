import React, { useState } from "react";
import Header from "./components/Header";
import DirectoryTable from "./components/DirectoryTable";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./components/Hooks/useModal";
import Button from "../../../components/Button";
// import axios from "axios";

const QuantityTable = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users") || "") || []);
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    first_name: "",
    last_name: "",
    total_bill: "",
    order_registration_date: "",
    image: "",
  };
  const [currentOrder, setCurrentOrder] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState(5);
  const { isShowing, toggle } = useModal();

  // useEffect(() => {
  //   axios("/api/matters")
  //     .then((response) =>
  //       response.data.map((user) => ({
  //         id: user.id.value,
  //         first_property: user.name.first,
  //         second_property: user.name.last,
  //         username: user.login.username,
  //         email: user.email,
  //         image: user.picture.thumbnail,
  //       }))
  //     )
  //     .then((data) => {
  //       setUsers(data);
  //     });
  // }, []);

  localStorage.setItem("users", JSON.stringify(users));

  // incrementing ids + adding placeholder image manually
  // TODO: update id and image handling when tying this to a database
  const addUser = (user: any) => {
    toggle();
    user.id = users.length + Math.random();
    console.log(user)
    setUsers([user, ...users]);
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
    });
  };

  const updateUser = (id: string, updatedUser: any) => {
    setEditing(false);
    setUsers(users.map((user: any) => (user.id === id ? updatedUser : user)));
    toggle();
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user: any) => user.id !== id));
  };

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Header />
      <div className="page-control">
      <div className="container">
        <Button color={'blue'} onClick={toggle} animate icon={'bx bx-add-to-queue'}>
          افزودن
        </Button>
      </div>
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
      <DirectoryTable
        users={currentUsers}
        editUser={editUser}
        deleteUser={deleteUser}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
      </div>
    </React.Fragment>
  );
};

export default QuantityTable;
