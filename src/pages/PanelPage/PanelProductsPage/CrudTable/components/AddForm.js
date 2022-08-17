import React, { useState } from "react";
import CustomInput from "./CustomInput";
import {addOrder} from "../../../../../api/updateOrder";


const AddForm = (props) => {
  const initialFormState = {
    id: null,
    first_name: "",
    last_name: "",
    total_bill: "",
    order_registration_date: "",
    image: "",
  };
  const [order, setOrder] = useState(initialFormState);

  const handleInputChange = (event, inputValue) => {
    const { name } = event.target;

    setOrder({ ...order, [name]: inputValue });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!order.first_name || !order.last_name) return;
        props.addUser(order);
        addOrder(order)
        setOrder(initialFormState);
      }}
    >
      <h2>اضافه کردن سفارش</h2>
      <div className="form-group">
        <label>نام محصول</label>
        <CustomInput
          type="text"
          name="first_name"
          value={order.first_name}
          onChange={handleInputChange}
          pattern="^[a-zA-Z]+$"
          required
        />
      </div>
      <div className="form-group">
        <label>نام خانوادگی کاربر</label>
        <CustomInput
          type="text"
          name="last_name"
          value={order.last_name}
          onChange={handleInputChange}
          pattern="[آ-ی]"
          required
        />
      </div>
      <div className="form-group">
        <label>مجموع مبلغ</label>
        <CustomInput
          type="number"
          name="total_bill"
          value={order.total_bill}
          onChange={handleInputChange}
          pattern="^[a-zA-Z0-9-]+$"
          required
        />
      </div>
      <div className="form-group">
        <label>زمان ثبت سفارش</label>
        <CustomInput
          type="date"
          name="order_registration_date"
          value={order.order_registration_date}
          onChange={handleInputChange}
          pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
          required
        />
      </div>
      <button className="modal-button">Add</button>
    </form>
  );
};

export default AddForm;
