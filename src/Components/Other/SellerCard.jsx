import React from "react";
import "./Card.css";
import IconRow from "./IconRow";
import { useNavigate } from "react-router-dom";

const SellerCard = ({
  bhk,
  title,
  location,
  price,
  image,
  nearby,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="card h-100 w-100 border-success">
      <img
        className="card-img-top"
        src={image}
        style={{ height: 250 }}
        alt="Card"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://placehold.co/1100x900?text=Image+Not+Found";
        }}
      />

      <p className="card-title text-muted text-center m-1">{title}</p>
      <IconRow location={location} bed={bhk} nearby={nearby} price={price} />

      <div className="d-flex justify-content-between m-2">
        <button
          type="button"
          name="edit"
          id="edit"
          className="btn btn-outline-dark btn-sm w-50 me-1"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type="button"
          name="delete"
          id="delete"
          className="btn btn-warning btn-sm w-50 ms-1"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
