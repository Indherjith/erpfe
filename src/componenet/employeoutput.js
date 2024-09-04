import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	MenuItem,
	Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from './../backenddata';

const Navbar = () => {
	const navigate = useNavigate();
	const EmployeeAuth = localStorage.getItem('employeeauth');
 
	const [data, setData] = useState([]);
	const [sortConfig, setSortConfig] = useState({
		key: "Date",
		direction: "asc",
	});
	const [filters, setFilters] = useState({
		Type: "",
		Category: "",
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(`${baseUrl}sales`);
			setData(response.data.Items);
			console.log(response.data.Items);
			
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const sortedData = data
		.filter((item) => {
			return (
				(filters.Type === "" || item.Type === filters.Type) &&
				(filters.Category === "" || item.Category === filters.Category)
			);
		})
		.sort((a, b) => {
			let aValue = a[sortConfig.key];
			let bValue = b[sortConfig.key];

			if (sortConfig.key !== "Type" && sortConfig.key !== "Category") {
				aValue = parseFloat(aValue);
				bValue = parseFloat(bValue);
			}

			if (isNaN(aValue) || isNaN(bValue)) {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
			} else {
				if (aValue < bValue) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
			}
			return 0;
		});

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getFilteredCategories = () => {
		if (filters.Type === "Chicken") {
			const uniqueCategories = [
				...new Set(
					data
						.filter((item) => item.Type === filters.Type)
						.map((item) => item.Category)
				),
			];
			return uniqueCategories;
		}
		return [];
	};

	if(EmployeeAuth){
	return (
		<Box sx={{ width: "100%", overflowX: "hidden" }}>
			<Box
				sx={{
					height: "75px",
					position: "relative",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
					backgroundColor: "#FFFFFF",
				}}
			>
				<Box
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					<Link to="/homeemployee" style={{ position: "absolute", left: 20 }}>
						<Button
							color="inherit"
							variant="contained"
							sx={{
								backgroundColor: "#004E69",
								color: "white",
								"&:hover": {
									backgroundColor: "#003c4c",
								},
							}}
						>
							Back
						</Button>
					</Link>
					<Typography
						sx={{
							fontFamily: "Lato",
							fontSize: "36px",
							fontWeight: 700,
							lineHeight: "15px",
							textAlign: "center",
							color: "#004E69",
						}}
					>
						கொங்கு கறி கடை
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					width: "100%",
					padding: "20px",
					boxSizing: "border-box",
				}}
			>
				<TableContainer
					component={Paper}
					sx={{
						width: "100%",
						overflowX: "auto",
					}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<Typography
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										ID
									</Typography>
								</TableCell>
								<TableCell onClick={() => handleSort("Date")}>
									<Typography
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										Date
									</Typography>
								</TableCell>
								<TableCell>
									<TextField
										name="Type"
										value={filters.Type}
										onChange={handleFilterChange}
										variant="outlined"
										size="small"
										select
										sx={{ width: "100%" }}
									>
										<MenuItem value="">All Types</MenuItem>
										<MenuItem value="Chicken">Chicken</MenuItem>
										<MenuItem value="Mutton">Mutton</MenuItem>
										<MenuItem value="Oil">Oil</MenuItem>
										<MenuItem value="SKM Frozen item">SKM Frozen Items</MenuItem>
									</TextField>
								</TableCell>
								<TableCell>
									<TextField
										name="Category"
										value={filters.Category}
										onChange={handleFilterChange}
										variant="outlined"
										size="small"
										select
										sx={{ width: "100%" }}
										disabled={filters.Type !== "chicken"}
									>
										<MenuItem value="">All Categories</MenuItem>
										{getFilteredCategories().map((category) => (
											<MenuItem key={category} value={category}>
												{category}
											</MenuItem>
										))}
									</TextField>
								</TableCell>
								<TableCell onClick={() => handleSort("NoOfKg")}>
									<Typography
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										No of Kg
									</Typography>
								</TableCell>
								<TableCell onClick={() => handleSort("PricePerKg")}>
									<Typography
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										Price per Kg
									</Typography>
								</TableCell>
								<TableCell onClick={() => handleSort("TotalAmount")}>
									<Typography
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										Total Amount
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedData.map((row,index) => (
								<TableRow key={index}>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{index+1}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{row.Date}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{row.Type}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{row.Category}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{row.NoOfKg}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{row.PricePerKg}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "Lato",
											fontSize: "19px",
											fontWeight: 700,
											lineHeight: "27px",
											color: "#000000",
										}}
									>
										{row.TotalAmount}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
	}
	else{
		window.location.href = '/';
	}
};

export default Navbar;
