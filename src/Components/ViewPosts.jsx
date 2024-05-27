import React, { useState, useEffect } from 'react';
import Header from './Other/Header';
import Pagination from './Other/Pagination';
import { Grid, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SellerCard from './Other/SellerCard';
import { useAuth } from './security/AuthContext';
import { apiClient } from '../Api/ApiClient';
import EditProperty from './EditProperty';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3; // Number of posts per page
  const [loading, setLoading] = useState(true);
  const { usersDetails } = useAuth();
  const [editProperty, setEditProperty] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const fetchPosts = async () => {
    try {
      const currentSellerProperties = await apiClient.get(`seller/${usersDetails.id}/property`);
      setPosts(currentSellerProperties.data);
      setTotalPages(Math.ceil(currentSellerProperties.data.length / itemsPerPage));
      setLoading(false);
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

  const handleDeleteClick = (propertyId) => {
    setPropertyToDelete(propertyId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(`seller/${usersDetails.id}/delete/property/${propertyToDelete}`);
      setDeleteDialogOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, display: 'flex', mt: 4, flexDirection: 'column', alignItems: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <SentimentDissatisfiedTwoToneIcon  sx={{ fontSize: 160 }} color='secondary'/>
            <p className='mt-6 text-muted h3' >You haven't posted yet.</p>
          </Box>
        ) : (
          <>
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
                    onDelete={() => handleDeleteClick(post.id)}
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
          </>
        )}
      </Box>
      {editProperty && (
        <EditProperty
          propertyId={editProperty.id}
          initialDetails={editProperty}
          onClose={() => setEditProperty(null)}
          onUpdate={handleUpdateProperty}
        />
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCancelDelete} className='btn btn-outline-dark'>
            Cancel
          </button>
          <button onClick={handleConfirmDelete} className='btn btn-warning'>
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewPosts;
