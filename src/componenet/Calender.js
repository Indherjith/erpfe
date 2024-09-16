import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TextField, Box, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'


const Calendar = ({ onButtonClick }) => {
	const [date, setDate] = useState(new Date());

	const handleDateChange = (newDate) => {
		setDate(newDate);
		onButtonClick(newDate);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Box
				sx={{
					color: "#004E69",
					height: "320px",
					maxWidth: "350px",
					border: "1px solid #004E69",
					borderRadius: "15px",
				}}
			>
				<Typography
					variant="h6"
					sx={{ marginLeft: "13px", marginBottom: "-9px" }}
				>
					Calendar
				</Typography>
				<StaticDatePicker
					displayStaticWrapperAs="desktop"
					value={date}
					onChange={handleDateChange}
					renderInput={(params) => <TextField {...params} />}
					sx={{
						height: "269px",
						width: "330px",
						"& .MuiPickersDay-dayWithMargin": {
							color: "#004E69",
						},
						"& .Mui-selected": {
							backgroundColor: "#004E69", // Change the background color of selected date
							color: "#fff", // Change the color of the selected date
						},
						"& .MuiPickersDay-root": {
							borderRadius: "50%",
						},
						"& .MuiTypography-root": {
							color: "#004E69", // Change the color of the text in the calendar
						},
					}}
				/>
			</Box>
		</LocalizationProvider>
	);
};

export default Calendar;
