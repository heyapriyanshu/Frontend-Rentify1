import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { apiClient } from '../Api/ApiClient';

const EditProperty = ({ propertyId, initialDetails, onClose, onUpdate }) => {
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
      <DialogContent>
        <TextField
          name="bhk"
          label="BHK"
          value={updatedDetails.bhk}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="title"
          label="Title"
          value={updatedDetails.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="location"
          label="Location"
          value={updatedDetails.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="price"
          label="Price"
          value={updatedDetails.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="nearby"
          label="Nearby Amenities"
          value={updatedDetails.nearby}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProperty;
