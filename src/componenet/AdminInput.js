import React, { useState, useEffect } from "react";
import {
	Box,
	InputLabel,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Button,
	MenuItem,
	AppBar,
	Toolbar,
} from "@mui/material";
import axios from "axios";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { baseUrl } from './../backenddata';

const StockManager = () => {
	
	const prodadmin = localStorage.getItem('prodadmin');


	const [data, setData] = useState([]);
	const [sortConfig, setSortConfig] = useState({
		key: "Date",
		direction: "asc",
	});
	const [formData, setFormData] = useState({
		Date: "",
		Time: "",
		Type: prodadmin,
		Category: (prodadmin != 'Chicken')? prodadmin : '',
		NoOfKg: "",
		PricePerKg: "",
		TotalAmount: "",
	});
	const [categoryItems, setCategoryItems] = useState([]);

	useEffect(() => {
		fetchData();
		setCategoryItems(getCategoryOptions(prodadmin));
	}, []);

	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentDateTime();
		}, 1000);
	
		return () => clearInterval(timerId); // Clean up the timer on component unmount
	  }, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(`${baseUrl}imports`);
			if(response.data.Items){
				setData(response.data.Items);
			}else{
				alert(response.data.msg);
			}
			
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const setCurrentDateTime = () => {
		const now = new Date();
		const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
		const formattedTime = now.toTimeString().slice(0, 8); // HH:MM:SS
		setFormData((prev) => ({
			...prev,
			Date: formattedDate,
			Time: formattedTime,
		}));
	};

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const sortedData = React.useMemo(() => {
		return [...data].sort((a, b) => {
			const aValue = parseFloat(a[sortConfig.key]) || a[sortConfig.key];
			const bValue = parseFloat(b[sortConfig.key]) || b[sortConfig.key];

			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortConfig.direction === "asc"
					? aValue - bValue
					: bValue - aValue;
			} else {
				if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
				if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
				return 0;
			}
		});
	}, [data, sortConfig]);

	const handleInputChange = (e) => {
    const { name, value } = e.target;

	if(name == "Type"){
		setCategoryItems(getCategoryOptions(value));
	}
    
    setFormData((prev) => {
        const updatedFormData = {
            ...prev,
            [name]: value,
        };

        // Calculate TotalAmount if NoOfKg or PricePerKg is updated
        if (name === "NoOfKg" || name === "PricePerKg") {
            const noOfKg = parseFloat(updatedFormData.NoOfKg || 0);
            const pricePerKg = parseFloat(updatedFormData.PricePerKg || 0);
            updatedFormData.TotalAmount = (noOfKg * pricePerKg).toFixed(2);
        }

        return updatedFormData;
    });
};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.post(`${baseUrl}imports`, formData);
			if(result.data.msg == "Item Added Successfully"){
				fetchData();
				setFormData({
					Date: "",
					Time: "",
					Type: prodadmin,
					Category: "",
					NoOfKg: "",
					PricePerKg: "",
					TotalAmount: "",
				});
			}
			else{
				alert(result.data.msg);
			}
		} catch (error) {
			console.error("Error inserting data:", error);
		}
	};

	const getCategoryOptions = (type) => {
		
		switch (type) {
			case "Chicken":
				return [
					{ value: "Broiler", label: "Broiler Chicken" },
					{ value: "Country Chicken", label: "Country Chicken" },
				];
			default:
				return [{ value: type, label: type }];
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			{/* Fixed AppBar */}
			<AppBar
				position="fixed"
				sx={{
					top: 0,
					left: 0,
					width: "100%",
					height: "75px",
					backgroundColor: "#FFFFFF",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
					borderBottom: "1px solid #ddd",
					zIndex: 1000,
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Link to="/homeadmin" style={{ textDecoration: "none" }}>
						<Button
							color="inherit"
							variant="contained"
							sx={{
								backgroundColor: "#004E69",
								color: "white",
								"&:hover": {
									bgcolor: "#004E69",
									color: "white",
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
							flexGrow: 1,
						}}
					>
						கொங்கு கறி கடை
					</Typography>

					<Box
						sx={{
							width: "120px",
							height: "42px",
							backgroundColor: "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Link to="/adminbilling" style={{ textDecoration: "none" }}>
							<Button
								color="inherit"
								variant="contained"
								sx={{
									height: "100%",
									borderRadius: "4px",
									backgroundColor: "#004E69",
									color: "white",
									"&:hover": {
										bgcolor: "#004E69",
										color: "white",
									},
								}}
							>
								Print Bill
							</Button>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Main Content */}
			<Box
				sx={{
					flexGrow: 1,
					marginTop: "75px", // Account for the fixed AppBar height
					padding: "20px",
					overflowY: "auto",
				}}
			>
				<Box
					sx={{
						marginBottom: "20px",
					}}
				>
					<Typography variant="h6">Orders</Typography>
				</Box>
				<Box
					sx={{
						overflowX: "auto",
					}}
				>
					<form onSubmit={handleSubmit}>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: "20px",
								marginBottom: "10px",
							}}
						>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
								>
									Date
								</InputLabel>
								<TextField
									name="Date"
									value={formData.Date}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									InputProps={{ readOnly: true }}
									sx={{
										width: "156px",
										opacity: 1,
										backgroundColor: "#F3F3F3",
									}}
								/>
							</Box>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
								>
									Time
								</InputLabel>
								<TextField
									name="Time"
									value={formData.Time}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									InputProps={{ readOnly: true }}
									sx={{
										width: "156px",
										opacity: 1,
										backgroundColor: "#F3F3F3",
									}}
								/>
							</Box>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
									id="type-label"
								>
									Type
								</InputLabel>
								<TextField
									select
									name="Type"
									value={formData.Type}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									sx={{
										width: "156px",
										backgroundColor: "#F3F3F3",
									}}
								>
									<MenuItem value="">Select Type</MenuItem>
									<MenuItem value="Chicken">Chicken</MenuItem>
									<MenuItem value="Mutton">Mutton</MenuItem>
									<MenuItem value="Meat">Meat</MenuItem>
									<MenuItem value="SKM Frozen item">SKM Frozen Items</MenuItem>
									<MenuItem value="Oil">Oil</MenuItem>
								</TextField>
							</Box>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
									id="category-label"
								>
									Category
								</InputLabel>
								<TextField
									select
									name="Category"
									value={formData.Category}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									sx={{
										width: "156px",
										backgroundColor: "#F3F3F3",
									}}
								>
									{categoryItems.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))
									}
								</TextField>
							</Box>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
								>
									No. of Kg
								</InputLabel>
								<TextField
									name="NoOfKg"
									value={formData.NoOfKg}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									sx={{
										width: "156px",
										backgroundColor: "#F3F3F3",
									}}
								/>
							</Box>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
								>
									Price per Kg
								</InputLabel>
								<TextField
									name="PricePerKg"
									value={formData.PricePerKg}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									sx={{
										width: "156px",
										backgroundColor: "#F3F3F3",
									}}
								/>
							</Box>
							<Box>
								<InputLabel
									sx={{
										fontFamily: "Lato",
										fontSize: "16px",
										fontWeight: 700,
										lineHeight: "27px",
										textAlign: "left",
									}}
								>
									Total Amount
								</InputLabel>
								<TextField
									name="TotalAmount"
									value={formData.TotalAmount}
									onChange={handleInputChange}
									variant="outlined"
									size="small"
									InputProps={{ readOnly: true }}
									sx={{
										width: "156px",
										opacity: 1,
										backgroundColor: "#F3F3F3",
									}}
								/>
							</Box>
						</Box>
						<Button
							type="submit"
							variant="contained"
							sx={{
								width: "120px",
								height: "42px",
								borderRadius: "4px",
								backgroundColor: "#004E69",
								color: "white",
								"&:hover": {
									bgcolor: "#004E69",
									color: "white",
								},
							}}
						>
							Add
						</Button>
					</form>
				</Box>

				<Box
					sx={{
						marginTop: "20px",
					}}
				>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									{[
										"Date",
										"Time",
										"Type",
										"Category",
										"NoOfKg",
										"PricePerKg",
										"TotalAmount",
									].map((header) => (
										<TableCell
											key={header}
											onClick={() => handleSort(header)}
											sx={{ cursor: "pointer" }}
										>
											{header}
											{sortConfig.key === header && (
												<span>
													{sortConfig.direction === "asc" ? (
														<ArrowDropUp />
													) : (
														<ArrowDropDown />
													)}
												</span>
											)}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{sortedData.map((row, index) => (
									<TableRow key={index}>
										<TableCell>{row.Date}</TableCell>
										<TableCell>{row.Time}</TableCell>
										<TableCell>{row.Type}</TableCell>
										<TableCell>{row.Category}</TableCell>
										<TableCell>{row.NoOfKg}</TableCell>
										<TableCell>{row.PricePerKg}</TableCell>
										<TableCell>{row.TotalAmount}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Box>
	);
};

export default StockManager;
