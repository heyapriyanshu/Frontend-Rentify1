// src/components/Pagination.js
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      shape="rounded"
      showFirstButton
      color = "primary"
      showLastButton
      sx={{ marginY: 4 }}
    />
  );
};

export default Pagination;
