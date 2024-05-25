import React, { useState } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import Header from "./Header";
import { apiClient } from "../../Api/ApiClient";
import { imageDb } from "../../Api/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const PropertyAdd = () => {
    const [img, setImg] = useState(null);
    const navigate = useNavigate();
    const { usersDetails } = useAuth();

    const [property, setProperty] = useState({
        bhk: "",
        title: "",
        location: "",
        price: "",
        likes: 0,
        nearby: "",
        sellerId: usersDetails.id,
        file: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setImg(files[0]);
        } else {
            setProperty({
                ...property,
                [name]: value,
            });
        }
    };

    const uploadImage = async (image) => {
        const imgRef = ref(imageDb, `files/${v4()}`);
        try {
            const snapshot = await uploadBytes(imgRef, image);
            const url = await getDownloadURL(snapshot.ref);
            console.log("Download URL:", url);
            return url;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error; // Propagate error to be handled in the caller function
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setError("All fields are required.");
            return;
        }

        try {
            const imageUrl = img ? await uploadImage(img) : "";
            const updatedProperty = {
                ...property,
                file: imageUrl,
            };

            const data = new FormData();
            Object.keys(updatedProperty).forEach((key) => {
                data.append(key, updatedProperty[key]);
            });

            const response = await apiClient.post(
                `seller/${usersDetails.id}/property/add`,
                data
            );

            console.log("Property added successfully:", response.data);
            navigate("/");
        } catch (error) {
            console.error("There was an error adding the property:", error);
        }
    };

    const validateForm = () => {
        const { bhk, title, location, price } = property;
        if (!bhk || !title || !location || !price) {
            return false; // Validation failed
        }
        return true; // Validation passed
    };

    return (
        <>
            <Header />
            <Container maxWidth="sm" className="mt-5">
                <Typography variant="h4" align="center" gutterBottom>
                    Add Property
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box
                        className="ms-5"
                        component="form"
                        sx={{
                            width: "auto",
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <TextField
                            type="number"
                            name="bhk"
                            label="Bhk"
                            variant="outlined"
                            value={property.bhk}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="text"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={property.title}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <TextField
                        type="text"
                        name="location"
                        label="Location"
                        variant="outlined"
                        value={property.location}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="number"
                        name="price"
                        label="Rent"
                        variant="outlined"
                        value={property.price}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="nearby"
                        label="Nearby Amenities"
                        variant="outlined"
                        value={property.nearby}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Seller Id"
                        InputProps={{
                            readOnly: true,
                        }}
                        defaultValue={property.sellerId}
                    />
                    <input
                        className="form-control form-control-sm"
                        type="file"
                        name="file"
                        onChange={handleChange}
                        required
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </Box>
            </Container>
        </>
    );
};

export default PropertyAdd;
