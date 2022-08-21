import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import {updateOrder} from "../../../../../api/updateOrder";

const EditForm = (props) => {
  const [tableItem, setTableItem] = useState(props.currentUser);

  useEffect(() => {
    setTableItem(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTableItem({ ...tableItem, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateTableItem(tableItem.id, tableItem);
        updateOrder(tableItem.id, tableItem);
      }}
    >
      <div className="form-group">
        <h2>ویرایش</h2>
        <label>نام</label>
        <CustomInput
          type="text"
          name="first_name"
          value={tableItem.first_name}
          onChange={handleInputChange}
          pattern="[آ-ی^]+$"
          required
        />
      </div>
      <div className="form-group">
        <label>نام خانوادگی</label>
        <CustomInput
          type="text"
          name="last_name"
          value={tableItem.last_name}
          onChange={handleInputChange}
          pattern="[آ-ی^]+$"
          required
        />
      </div>
      <div className="form-group">
        <label>مجموع فاکتور</label>
        <CustomInput
          type="number"
          name="total_bill"
          value={tableItem.total_bill}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9-]+$"
          required
        />
      </div>
      <div className="form-group">
        <label>زمان ثبت سفارش</label>
        <CustomInput
          type="date"
          name="order_registration_date"
          value={tableItem.order_registration_date}
          onChange={handleInputChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
      </div>
      <button className="modal-button">Update user</button>
    </form>
  );
};

export default EditForm;
