import React, { useState, useEffect } from 'react';
import Header from './Other/Header';
import Pagination from './Other/Pagination';
import { Grid, Box } from '@mui/material';
import SellerCard from './Other/SellerCard';
import { useAuth } from './security/AuthContext';
import { apiClient } from '../Api/ApiClient';
import EditProperty from './EditProperty';

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3; // Number of posts per page
 
  const {  usersDetails } = useAuth()
  const [editProperty, setEditProperty] = useState(null);

  const fetchPosts = async () => {
    try {
      
      const currentSellerProperties = await apiClient.get(`seller/${usersDetails.id}/property`)
      setPosts(currentSellerProperties.data);
      setTotalPages(Math.ceil(currentSellerProperties.data.length / itemsPerPage));

    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (propertyId) => {
    const propertyToEdit = posts.find(post => post.id === propertyId);
    setEditProperty(propertyToEdit);
  };

  const handleUpdateProperty = (updatedDetails) => {
    setPosts(posts.map(post => post.id === updatedDetails.id ? updatedDetails : post));
  };

  const handleDelete = async (userId, propertyId) => {
    try {
      await apiClient.delete(`seller/${userId}/delete/property/${propertyId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, display: 'flex', mt: 4, flexDirection: 'column', alignItems: 'center' }}>
        <Grid container spacing={2} sx={{ maxWidth: '1200px', justifyContent: 'center' }}>
          {paginatedPosts.map((post) => (
            <Grid item xs={12} md={4} key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <SellerCard
                bhk={post.bhk}
                title={post.title}
                location={post.location}
                price={post.price}
                image={post.propertyImage}
                nearby={post.nearby}
                onEdit={() => handleEdit(post.id)}
                onDelete={() => handleDelete(usersDetails.id, post.id)}
              />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
      {editProperty && (
        <EditProperty
          propertyId={editProperty.id}
          initialDetails={editProperty}
          onClose={() => setEditProperty(null)}
          onUpdate={handleUpdateProperty}
        />
      )}
    </Box>
  );
};

export default ViewPosts;
