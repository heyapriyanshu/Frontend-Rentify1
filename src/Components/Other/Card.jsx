import React, { useState, useEffect } from "react";
import "./Card.css";
import IconRow from "./IconRow";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { apiClient } from "../../Api/ApiClient";
import { Modal, Button } from "react-bootstrap";

const Card = ({
	propertyId,
	bhk,
	title,
	location,
	price,
	isAuthenticated,
	likes,
	image,
	nearby,
	ownerId,
}) => {
	const [likeCount, setLikeCount] = useState(likes);
	const [likeBtn, setLikeBtn] = useState(false);
	const [interested, setInterested] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const authContext = useAuth();
	const navigate = useNavigate();
	const [owner, setOwner] = useState({ firstName: "", lastName: "", email: "", phone: "" });

	const fetchUserDetails = async () => {
		if (!ownerId) return; // Exit early if ownerId is null

		try {
			const ownerDetails = await apiClient.get(`user/${ownerId}/getUserDetailsById`);
			setOwner(ownerDetails.data);
		} catch (error) {
			console.error("Error fetching owner details:", error);
		}
	};

	useEffect(() => {
		fetchUserDetails();
	}, [ownerId]);

	const handleLike = () => {
		if (isAuthenticated) {
			if (!likeBtn) {
				setLikeCount(likeCount + 1);
				//add in the property likes
				setLikeBtn(true);
				authContext.increaseLikes();
			} else {
				setLikeCount(likeCount - 1);
				setLikeBtn(false);
				authContext.decreaseLikes();
			}
		} else {
			navigate("/login");
		}
	};

	const handleInterested = () => {
		if (isAuthenticated) {
			setInterested(true);
		} else {
			navigate("/login");
		}
	};

	const handleSendDetails = () => {
		apiClient.post('/send-email', null, {
			params: {
				userId: authContext.usersDetails.id,
				ownerId: ownerId
			}
		})
			.then((response) => {
				console.log('Email sent successfully', response.data);
				setEmailSent(true); // Set emailSent state to true on success
			})
			.catch((error) => {
				console.error('There was an error while sending email!', error);
			});
	};

	const handleClose = () => {
		setInterested(false);
		setEmailSent(false); // Reset emailSent state when closing the modal
	};

	return (
		<>
			<div className={"card h-100 w-100 " + (interested ? "border-success" : "")}>
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

				{likeBtn ? (
					<button
						className="like-button d-block position-absolute text-danger"
						onClick={handleLike}
					>
						&#9829; {likeCount}
					</button>
				) : (
					<button
						className="like-button d-block position-absolute"
						onClick={handleLike}
					>
						&#9829; {likeCount}
					</button>
				)}

<div className="d-grid gap-2 m-2">
    {authContext.usersDetails && ownerId === authContext.usersDetails.id ? (
        <p className="text-primary text-center justify-content-center">
            You're the owner.
        </p>
    ) : (
        isAuthenticated && (
            <button
                type="button"
                name="interested"
                id="interested"
                className="btn btn-outline-dark mt-3"
                onClick={handleInterested}
            >
                I'm interested
            </button>
        )
    )}
</div>

			</div>

			<Modal show={interested} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Seller Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Name: {owner.firstName + " " + owner.lastName}</p>
					<p>Email: {owner.email}</p>
					<p>Phone: {owner.phone}</p>
					{emailSent && <p className="text-success">Email sent successfully</p>}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSendDetails}>
						Send Me Details
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Card;
