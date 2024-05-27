import React, { useState, useEffect } from 'react';
import Header from './Other/Header';
import PropertyList from './PropertyList';
import Pagination from './Other/Pagination';
import { propertyData } from './Other/propertyData';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, TextField } from '@mui/material';

const LandingPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3; // Number of properties per page
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await propertyData();
      setProperties(response.data);
      setFilteredProperties(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      navigate("*");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
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
    sortProperties(event.target.value, filteredProperties);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterProperties(event.target.value);
  };

  const filterProperties = (query) => {
    const filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
    setSortBy('price'); // Reset sorting
    setCurrentPage(1); // Reset to first page after filtering
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const sortProperties = (criteria, propertiesToSort) => {
    let sortedProperties = [...propertiesToSort];
    if (criteria === 'likes') {
      sortedProperties.sort((a, b) => b.likes - a.likes);
    } else if (criteria === 'price') {
      sortedProperties.sort((a, b) => a.price - b.price);
    } else if (criteria === 'bhk') {
      sortedProperties.sort((a, b) => a.bhk - b.bhk);
    }
    setFilteredProperties(sortedProperties);
    setCurrentPage(1); // Reset to first page after sorting
    setTotalPages(Math.ceil(sortedProperties.length / itemsPerPage));
  };

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
        <FormControl sx={{ width: '25%' }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="likes">Likes</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="bhk">No. of Bedrooms/Bathrooms</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ ml: 2, width: '25%' }}
          placeholder="By title or location"
        />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : (
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
        )}
      </Box>
    </Box>
  );
};

export default LandingPage;
