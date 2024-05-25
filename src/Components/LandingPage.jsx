import React, { useState, useEffect } from 'react';
import Header from './Other/Header';
import PropertyList from './PropertyList';
import Pagination from './Other/Pagination';
import { propertyData } from './Other/propertyData';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LandingPage = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const itemsPerPage = 3; // Number of properties per page
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await propertyData();
      setProperties(response.data);
      console.log(response.data)
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      navigate("*");
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    sortProperties(event.target.value);
  };

  const sortProperties = (criteria) => {
    let sortedProperties = [...properties];
    if (criteria === 'likes') {
      sortedProperties.sort((a, b) => b.likes - a.likes);
    } else if (criteria === 'price') {
      sortedProperties.sort((a, b) => a.price - b.price);
    } else if(criteria === 'bhk'){
      sortedProperties.sort((a, b) => a.bhk - b.bhk);
    }
    setProperties(sortedProperties);
    setCurrentPage(1); // Reset to first page after sorting
    setTotalPages(Math.ceil(sortedProperties.length / itemsPerPage));
  };

  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2}}>
  <FormControl sx={{width : '50%'}}>
    <InputLabel>Sort By</InputLabel>
    <Select value={sortBy} onChange={handleSortChange}>
      <MenuItem value="likes">Likes</MenuItem>
      <MenuItem value="price">Price</MenuItem>
      <MenuItem value="bhk">No. of Bedrooms/Bathrooms</MenuItem>
    </Select>
  </FormControl>
</Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} sx={{ width: '80%' }}>
          <Grid item xs={12}>
            <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>

              <PropertyList properties={paginatedProperties} />

            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;
