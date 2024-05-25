import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOnTwoTone";
import BedIcon from "@mui/icons-material/KingBedTwoTone";
import PlaceIcon from "@mui/icons-material/NearMeTwoTone";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";

const IconRow = ({ location, bed, nearby, price }) => {
	return (
		<Grid className="text-muted card-body m-1 " container spacing={1} alignItems="baseline" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
			 <Grid item xs={6}>
				<LocationOnIcon color="secondary" />
                <Typography variant="body1">{location}</Typography>
			</Grid>
            <Grid item xs={6}>
                <BedIcon color="primary" />
                <Typography variant="body1">{bed} BHK</Typography>
			</Grid>
            <Grid item xs={6}>
                <PlaceIcon color="primary" />
                <Typography variant="body1">{nearby}</Typography>
			</Grid>
            <Grid item xs={6}>
              <CurrencyRupeeTwoToneIcon color="secondary" />
              <Typography variant="body1">{price}/month</Typography>
			</Grid>
          
			
			
		</Grid>
	);
};

export default IconRow;
