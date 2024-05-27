import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { apiClient } from '../Api/ApiClient';

const EditProperty = ({  initialDetails, onClose, onUpdate }) => {
  const [updatedDetails, setUpdatedDetails] = useState(initialDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await apiClient.put("seller/update", updatedDetails); // Update the URL
      onUpdate(updatedDetails);
      onClose();
    } catch (error) {
      console.error('Error editing property:', error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent className='p-2'>
        <TextField
          name="bhk"
          label="BHK"
          className='p-2'
          value={updatedDetails.bhk}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="title"
          label="Title"
          className='p-2'
          value={updatedDetails.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="location"
          label="Location"
          className='p-2'
          value={updatedDetails.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="price"
          label="Price"
          className='p-2'
          value={updatedDetails.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="nearby"
          className='p-2'
          label="Nearby Amenities"
          value={updatedDetails.nearby}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className='btn btn-outline-dark'>Cancel</button>
        <button onClick={handleSubmit} className='btn btn-warning'>Save Changes</button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProperty;
