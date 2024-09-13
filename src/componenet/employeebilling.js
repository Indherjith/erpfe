import {
	AppBar,
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	MenuItem,
	Modal,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { baseUrl } from '../backenddata';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const Billing = () => {
	const navigate = useNavigate();
	const EmployeeAuth = localStorage.getItem('employeeauth');
	const proditem = localStorage.getItem('prodemp');
	const [prodemp,setProdemp] = useState(proditem);

	const [tableData1,setTableData1]=useState([]);
	const [currItem,setCurrItem] = useState({});
    const [categoryItems, setCategoryItems] = useState([]);



	useEffect(()=>{
		fetchStocks();		
	},[])

	const fetchStocks = async()=>{
		try{
			const response = await axios.get(`${baseUrl}stocks`);
			if(response.data.Items){
				setTableData1(response.data.Items);
				let data = response.data.Items;
				if(prodemp == "Chicken"){
					setCategoryItems([
						{ value: "Broiler", label: "Broiler Chicken" },
						{ value: "Country Chicken", label: "Country Chicken" },
					])
				}
				else{
					const matches = data.filter(item=>(item.name == prodemp && item.type == prodemp))
					console.log(data);
					
					if(matches.length == 0){
						localStorage.removeItem('prodemp');
						setProdemp('');
						setDropdownCategoryValue('');
						setDropdowntypeValue('');
					}
					const itemAvail = data.find(item=>(item.name == prodemp));
						if(itemAvail){
							setDropdownCategoryValue(itemAvail.type);
							setCurrItem({...itemAvail});
							setPrice(itemAvail.rate)
						}
						else{
							alert(`${prodemp} Stock is Not Available`);
							setDropdownCategoryValue('');
						}
					}
				}
			else{
				alert(response.data.msg)
			}
		}
		catch(err){
			console.log(err);
			alert('Something went wrong');
		}
	  }

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentTime, setCurrentTime] = useState("");

	const [dropdowntypeValue, setDropdowntypeValue] = useState(prodemp || '');
	const [dropdownCategoryValue, setDropdownCategoryValue] = useState(prodemp != 'Chicken' ? prodemp : '');
	const [kg, setKg] = useState();
	const [price, setPrice] = useState("");
	const [amount, setAmount] = useState("");
	const [tableData, setTableData] = useState([]);
	//  const [discountAmount ,setDiscountAmount] = useState('')
	//  const [receivedAmount ,setReceivedAmount] = useState(0)
	const [open, setOpen] = useState(false);

	const [discountAmount, setDiscountAmount] = useState(0);
	const [discountPercentage, setDiscountPercentage] = useState(0);
	const [receivedAmount, setReceivedAmount] = useState(0);
	const [net, setNet] = useState(0);
	const [returnAmount, setReturnAmount] = useState(0);
	

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handlePrint = async() => {
		try{
			const response = await axios.post(`${baseUrl}sales`,{'data':tableData,'tax':'10'})
			if(response.data.msg == 'success'){
				window.print();
				window.location.reload();
			}
			else{
				alert('Something went wrong try again!');
			}
			
		}
		catch(err){
			alert('Someting went wrong');
			console.log(err);			
		}
	};

	const handleRefresh = () => {
		window.location.reload(); // Reloads the entire page
	};

	const handleDropdownChangeType = (event) => {
		setDropdownCategoryValue('');
		if(event.target.value == 'Chicken'){
			setDropdowntypeValue(event.target.value);
			setCategoryItems(getCategoryOptions(event.target.value));
		}
		else{
			setDropdowntypeValue(event.target.value);
			const itemAvail = tableData1.find(item=>(item.name == event.target.value));
			if(itemAvail){
				setDropdownCategoryValue(itemAvail.type);
				setCurrItem({...itemAvail});
				setPrice(itemAvail.rate)
			}
			else{
				alert(`${event.target.value} Stock is Not Available`);
				setDropdownCategoryValue('');
			}
		}		
	};

	const getCategoryOptions = (type) => {
		console.log(type);
		
		switch (type) {
			case "Chicken":
				return [
					{ value: "Broiler", label: "Broiler Chicken" },
					{ value: "Country Chicken", label: "Country Chicken" },
				];
			default:
				return [{ value: "", label: "No Category" }];
		}
	};

	const handleDropdownChangeCategory = (event) => {
		const itemAvail = tableData1.find(item=>(item.name == dropdowntypeValue && item.type == event.target.value));
		if(itemAvail){
			setDropdownCategoryValue(event.target.value);
			setCurrItem({...itemAvail});
			setPrice(itemAvail.rate)
		}
		else{
			alert(`${event.target.value} Stock is Not Available`);
			setDropdownCategoryValue('');
			setDropdowntypeValue('');
		}
	};
	const handleKgchange = (e) => {
		console.log(currItem);
		if(e<=Number(currItem.quantity)){
			setKg(e);
		}
		else{
			alert(`${currItem.type || "Entered Item"} ${currItem.name || ''} ${currItem.quantity || 0}kgs only Available `);
			setKg(currItem.quantity); 
		}
	};

	const handlePricechange = (e) => {
		setPrice(e);
	};

	useEffect(() => {
		setAmount(kg * price);
	}, [kg, price]);

	const handleItemCode = (dropdowntypeValue, dropdownCategoryValue) => {
		let itemCode = "";

		if (dropdownCategoryValue === "Country Chicken") {
			itemCode = "001"; // Test this value directly
		} else if (dropdownCategoryValue === "Broiler") {
			itemCode = "002"; // Test this value directly
		} else if (dropdowntypeValue === "Mutton") {
			itemCode = "003";
		} else if (dropdowntypeValue === "Oil") {
			itemCode = "004";
		} else if (dropdowntypeValue === "SKM Frozen item") {
			itemCode = "005";
		} else {
			itemCode = "";
		}
		return itemCode;
	};

	const tax = "10%"; // Tax as a percentage string

	const handleAddItemClick = () => {
		if(dropdownCategoryValue == '' || dropdowntypeValue == ''){
			alert('Not able to add unavailable items');
			setDropdownCategoryValue('');
			setDropdowntypeValue('');
			setAmount('');
			setKg('');
			setPrice('');
			return;
		}
		const itemCode = handleItemCode(dropdowntypeValue, dropdownCategoryValue);

		// Remove the percentage symbol and parse it as a float
		const taxRate = parseFloat(tax.replace("%", ""));

		// Calculate the tax amount
		const taxrs = (amount * taxRate) / 100;

		// Calculate the total amount including tax
		const total = Number(amount) + Number(taxrs);

		// Create the new item object
		const newItem = {
			id: tableData.length + 1, // Assign a new ID
			item: itemCode, // Use appropriate item code
			name: dropdowntypeValue,
			category:currItem.type,
			quantity: kg,
			rate: price,
			amount: amount,
			tax: tax, // Keep the original tax string
			taxAmount: `₹ ${taxrs.toFixed(2)}`,
			total: `₹ ${total.toFixed(2)}`,
		};

		// Update the table data with the new item
		setTableData([...tableData, newItem]);
		setKg("");
		setPrice("");
		setAmount(0);
		setDropdownCategoryValue("");
		setDropdowntypeValue("");
		
	};

	const handleDeleteItemClick = (id) => {
		const updatedTableData = tableData.filter((row) => row.id !== id);
		setTableData(updatedTableData);
	};

	const calculateTotals = (data) => {
		let subTotal = 0;
		let totalTax = 0;
		let totalAmount = 0;
		let net = 0;
		let returnAmount = 0;
		let quantity = 0;

		data.forEach((row) => {
			const amount = parseFloat(row.amount);
			const taxAmount = parseFloat(row.taxAmount.replace(/[^0-9.-]+/g, "")); // Removes any currency symbols or non-numeric characters

			subTotal += amount;
			totalTax += taxAmount;
			totalAmount += amount + taxAmount;
			net = totalAmount - discountAmount;
			returnAmount =
				receivedAmount === 0 || receivedAmount < net ? 0 : net - receivedAmount;
			quantity += Number(row.quantity);
		});

		return { subTotal, totalTax, totalAmount, net, returnAmount, quantity };
	};

	const { subTotal, totalTax, totalAmount, quantity } =
		calculateTotals(tableData);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const hours = now.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
			const minutes = String(now.getMinutes()).padStart(2, "0");
			const seconds = String(now.getSeconds()).padStart(2, "0");
			const ampm = now.getHours() >= 12 ? "PM" : "AM";
			const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
			setCurrentTime(formattedTime);
		};
		updateTime(); // Initial call to set the time and date immediately

		const intervalId = setInterval(updateTime, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	// Use effect to calculate net and return amounts
	useEffect(() => {
		const discount = (totalAmount * discountPercentage) / 100;
		setDiscountAmount(discount);

		const calculatedNet = totalAmount - discount;
		setNet(calculatedNet);

		const calculatedReturnAmount = receivedAmount - calculatedNet;
		setReturnAmount(calculatedReturnAmount);
	}, [totalAmount, discountPercentage, receivedAmount]);

	// Handler for discount amount change
	const handleDiscountAmount = (value) => {
		const discount = parseFloat(value) || 0;
		setDiscountAmount(discount);
	};

	// Handler for discount percentage change
	const handleDiscountPercentage = (value) => {
		const percentage = parseFloat(value) || 0;
		setDiscountPercentage(percentage);

		// Calculate discount based on percentage
		const discount = (totalAmount * percentage) / 100;
		setDiscountAmount(discount);

		// Recalculate net amount
		const calculatedNet = totalAmount - discount;
		setNet(calculatedNet);

		// Update return amount
		const calculatedReturnAmount =
			receivedAmount > calculatedNet ? receivedAmount - calculatedNet : 0;
		setReturnAmount(calculatedReturnAmount);
	};

	// Handler for received amount change
	const handleReceivedAmountChange = (value) => {
		const received = parseFloat(value) || 0;
		setReceivedAmount(received);

		// Recalculate return amount
		const calculatedReturnAmount = received > net ? received - net : 0;
		setReturnAmount(calculatedReturnAmount);
	};

	if(EmployeeAuth){
return (
		<Box sx={{ maxWidth: "100vw", maxHeight: "100vh", overflowX: "hidden" }}>
			<AppBar sx={{ height: "112px", position: "static", top: 0 }}>
				<Toolbar
					sx={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						bgcolor: "white",
					}}
				>
					{/* Button on the left */}
					<Link to="/homeemployee">
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

					{/* Typography centered */}
					<Typography
						sx={{
							fontFamily: "Lato",
							fontWeight: 700,
							fontSize: "36px",
							color: "#004E69",
							flexGrow: 1, // Allows the Typography to grow and stay centered
							textAlign: "center",
						}}
					>
						கொங்கு கறி கடை
					</Typography>
				</Toolbar>
			</AppBar>
			<Box sx={{ mt: "50px", px: 2 }}>
				<Grid
					container
					spacing={3}
					sx={{
						marginTop: "50px",
						px: 2,
						flexDirection: "wrap",
						marginLeft: "50px",
					}}
				>
					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "27px",
								color: "#000000",
							}}
						>
							Date
						</Typography>
						<DatePicker
							selected={selectedDate}
							onChange={(date) => setSelectedDate(date)}
							dateFormat="dd/MM/yyyy"
							customInput={
								<input
									style={{
										width: "100%",
										background: "#F3F3F3",
										padding: "8px",
										fontSize: "16px",
										border: "none",
									}}
								/>
							}
							calendarIcon={<CalendarMonthIcon />}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "27px",
								color: "#000000",
							}}
						>
							Time
						</Typography>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "300",
								fontSize: "16px",
								color: "#000000",
								bgcolor: "#F3F3F3",
								width: "100%",
								height: "35px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{currentTime}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "27px",
								color: "#000000",
							}}
						>
							Type
						</Typography>
						<FormControl sx={{ width: "100%", background: "#F3F3F3" }}>
							<Select
								value={dropdowntypeValue}
								onChange={handleDropdownChangeType}
								displayEmpty
								renderValue={(selected) => selected || ""}
								sx={{
									height: "40px",
									background: "#F3F3F3",
									fontSize: "16px",
									border: "none",
								}}
							>
								<MenuItem value="Chicken">Chicken</MenuItem>
								<MenuItem value="Mutton">Mutton</MenuItem>
								<MenuItem value="Oil">Oil</MenuItem>
								<MenuItem value="SKM Frozen item">SKM Frozen Items</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "27px",
								color: "#000000",
							}}
						>
							Category
						</Typography>
						<FormControl sx={{ width: "100%", background: "#F3F3F3" }}>
							<Select
								onChange={handleDropdownChangeCategory}
								value={dropdownCategoryValue}
								disabled = {dropdowntypeValue == "Chicken" ? false : true}
								displayEmpty
								renderValue={(selected) => selected || ""}
								sx={{
									height: "40px",
									background: "#F3F3F3",
									fontSize: "16px",
									border: "none",
								}}
							>

									{categoryItems.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))
									}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "24.5px",
								color: "#000000",
							}}
						>
							No Of Kgs
						</Typography>
						<TextField
							sx={{
								width: "100%",
								background: "#F3F3F3",
								"& .MuiInputBase-input": {
									height: "40px",
									padding: "0 8px",
									textAlign: "center",
								},
								"& .MuiOutlinedInput-root": {
									height: "40px",
									background: "#F3F3F3",
									"& fieldset": { border: "none" },
								},
							}}
							variant="outlined"
							value={kg}
							onChange={(e) => handleKgchange(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "24.5px",
								color: "#000000",
							}}
						>
							Price per KG
						</Typography>
						<TextField
							sx={{
								width: "100%",
								background: "#F3F3F3",
								"& .MuiInputBase-input": {
									height: "40px",
									padding: "0 8px",
									textAlign: "center",
								},
								"& .MuiOutlinedInput-root": {
									height: "40px",
									background: "#F3F3F3",
									"& fieldset": { border: "none" },
								},
							}}
							variant="outlined"
							value={price}
							onChange={(e) => handlePricechange(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={1.6}>
						<Typography
							sx={{
								fontFamily: "Lato",
								fontWeight: "700",
								fontSize: "16px",
								lineHeight: "24.5px",
								color: "#000000",
							}}
						>
							Total Amount
						</Typography>
						<TextField
							sx={{
								width: "100%",
								background: "#F3F3F3",
								"& .MuiInputBase-input": {
									height: "40px",
									padding: "0 8px",
									textAlign: "center",
								},
								"& .MuiOutlinedInput-root": {
									height: "40px",
									background: "#F3F3F3",
									"& fieldset": { border: "none" },
								},
							}}
							variant="outlined"
							value={amount}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					sx={{ marginTop: "20px", px: 2, marginLeft: "-50px" }}
				>
					<Grid item xs={12} container>
						<Grid
							item
							xs={12}
							sx={{
								display: "flex",
								justifyContent: { xs: "flex-end", lg: "flex-end" },
								mt: { xs: 2, lg: 0 },
							}}
						>
							<Button
								onClick={handleAddItemClick}
								variant="contained"
								sx={{ background: "#004E69", width: "120px", height: "40px" }}
							>
								<Typography
									sx={{
										fontFamily: "Lato",
										fontWeight: "700",
										fontSize: "16px",
										color: "white",
									}}
								>
									Add Item
								</Typography>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Box>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					margin: 0,
					display: "flex",
					flexDirection: "column",
					px: 2,
				}}
			>
				<Grid
					container
					spacing={2}
					sx={{
						marginTop: "20px",
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
					}}
				>
					{" "}
					{/* Table Container */}
					<Grid item xs={12} md={8}>
						<TableContainer
							sx={{
								width: "100%",
								height: "495px",
								marginLeft: "20px",
								overflowX: "hidden",
								background: "#EEEEEE",
							}}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell sx={{ width: "5%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												S.N0
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												ITEM CODE
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "15%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												ITEM NAME
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "15%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												QUANTITY (in KGs)
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												RATE (in Rs)
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												AMOUNT
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "5%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												TAX%
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												TAX
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "10px",
													lineHeight: "16px",
													color: "#000000",
												}}
											>
												TOTAL
											</Typography>
										</TableCell>
										<TableCell sx={{ width: "10%" }}></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tableData.length !== 0 ? (
										tableData.map((row, index) => (
											<TableRow key={row.id}>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{index + 1}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.item}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.name}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.quantity}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.rate}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.amount}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.tax}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.taxAmount}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "12px",
															lineHeight: "18px",
															color: "#000000",
														}}
													>
														{row.total}
													</Typography>
												</TableCell>
												<TableCell>
													<Box
														sx={{
															display: "flex",
															marginLeft: "-20px",
															marginRight: "15px",
															justifyContent: "center",
														}}
													>
														<IconButton
															onClick={() => handleDeleteItemClick(row.id)}
															sx={{
																color: "black",
																":hover": { background: "#EEEEEE" },
															}}
														>
															<DeleteIcon sx={{ height: "15px" }} />
														</IconButton>
													</Box>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={10} align="center">
												<Typography>No data available</Typography>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: "470px",
								width: "90%",
								padding: "10px",
								marginLeft: "10px",
								boxShadow: "0 0 10px rgba(0,0,0,0.1)",
							}}
						>
							<Typography
								sx={{
									fontWeight: "700",
									fontSize: "36px",
									textAlign: "center",
									marginBottom: "20px",
								}}
							>
								Your Shopping
							</Typography>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Sub Total :
									</Typography>
									<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
										₹ {subTotal}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Total Tax :
									</Typography>
									<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
										₹ {totalTax}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Total Amount :
									</Typography>
									<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
										₹ {totalAmount}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Discount Amount:
									</Typography>
									<TextField
										value={discountAmount}
										onChange={(e) => handleDiscountAmount(e.target.value)}
										sx={{
											width: "80px",
											height: "30px",
											marginLeft: "20px",
											background: "#F3F3F3",
											"& .MuiInputBase-input": {
												textAlign: "center",
												padding: 0,
												fontSize: "16px",
											},
										}}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Box>

								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Discount Percentage:
									</Typography>
									<TextField
										value={discountPercentage}
										onChange={(e) => handleDiscountPercentage(e.target.value)}
										sx={{
											width: "80px",
											height: "30px",
											marginLeft: "20px",
											background: "#F3F3F3",
											"& .MuiInputBase-input": {
												textAlign: "center",
												padding: 0,
												fontSize: "16px",
											},
										}}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Net Amount :
									</Typography>
									<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
										₹ {net.toFixed(2)}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
										mb: "10px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Received Amount :
									</Typography>
									<TextField
										value={receivedAmount}
										onChange={(e) => handleReceivedAmountChange(e.target.value)}
										sx={{
											width: "80px",
											height: "30px",
											marginLeft: "25px",
											background: "#F3F3F3",
											"& .MuiInputBase-input": {
												textAlign: "center",
												padding: 0,
												fontSize: "16px",
											},
										}}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										maxWidth: "300px",
									}}
								>
									<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
										Return Amount :
									</Typography>
									<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
										₹ {returnAmount.toFixed(2)}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} lg={10}>
						<Box display="flex" sx={{ marginTop: "20px", width: "100%" }}>
							<Typography
								sx={{
									fontWeight: "700",
									fontSize: "20px",
									marginLeft: "25px",
									marginRight: "90px",
								}}
							>
								Total Item: {tableData.length}
							</Typography>
							<Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
								Total Item Quantity: {quantity}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box
							display="flex"
							flexDirection="row"
							sx={{ marginTop: "10px", marginLeft: "25px" }}
						>
							<Button
								onClick={handleOpen}
								disabled = {(returnAmount < 0 || tableData.length <= 0) ? (true):(false)}
								variant="contained"
								sx={{
									width: "130px",
									height: "40px",
									background: "#004E69",
									marginRight: "40px",
								}}
							>
								<Typography
									sx={{
										fontFamily: "Lato",
										fontWeight: "700",
										fontSize: "16px",
										color: "white",
									}}
								>
									Print Bill
								</Typography>
							</Button>

							<Button
								onClick={handleRefresh}
								variant="contained"
								sx={{ width: "120px", height: "40px", background: "#004E69" }}
							>
								<Typography
									sx={{
										fontFamily: "Lato",
										fontWeight: "700",
										fontSize: "16px",
										color: "white",
									}}
								>
									Refresh
								</Typography>
							</Button>
						</Box>

						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-title"
							aria-describedby="modal-description"
						>
							<Box sx={{ style, display: "flex", justifyContent: "center" }}>
								<Box
									sx={{
										bgcolor: "white",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										height: "470px",
										width: "35%",
										padding: "10px",
										marginLeft: "10px",
										boxShadow: "0 0 10px rgba(0,0,0,0.1)",
									}}
								>
									<Typography
										sx={{
											fontWeight: "700",
											fontSize: "36px",
											textAlign: "center",
											marginBottom: "20px",
										}}
									>
										Your Shopping
									</Typography>

									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
												mb: "10px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Sub Total :
											</Typography>
											<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
												₹ {subTotal}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
												mb: "10px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Total Tax :
											</Typography>
											<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
												₹ {totalTax}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
												mb: "10px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Total Amount :
											</Typography>
											<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
												₹ {totalAmount}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
												mb: "10px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Discount Amount:
											</Typography>
											<TextField
												value={discountAmount}
												onChange={(e) => handleDiscountAmount(e.target.value)}
												sx={{
													width: "80px",
													height: "30px",
													marginLeft: "20px",
													background: "#F3F3F3",
													"& .MuiInputBase-input": {
														textAlign: "center",
														padding: 0,
														fontSize: "16px",
													},
												}}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Box>

										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
												mb: "10px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Net Amount :
											</Typography>
											<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
												₹ {net}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
												mb: "10px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Received Amount :
											</Typography>
											<TextField
												value={receivedAmount}
												onChange={(e) =>
													handleReceivedAmountChange(e.target.value)
												}
												sx={{
													width: "80px",
													height: "30px",
													marginLeft: "25px", // Moves the TextField to the right
													background: "#F3F3F3",
													"& .MuiInputBase-input": {
														textAlign: "center",
														padding: 0,
														fontSize: "16px",
													},
												}}
											/>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
												maxWidth: "300px",
											}}
										>
											<Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
												Return Amount :
											</Typography>
											<Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
												₹ {returnAmount.toFixed(2)}
											</Typography>
										</Box>

										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%",
											}}
										>
											<Button
												sx={{
													"@media print": {
														display: "none",
													},
													mt: 2,
													bgcolor: "#004E69",
													color: "white",
												}}
												onClick={handleClose}
											>
												Close
											</Button>
											<Button
												sx={{
													"@media print": {
														display: "none",
													},
													mt: 2,
													bgcolor: "#004E69",
													color: "white",
												}}
												onClick={handlePrint}
											>
												Print Bill
											</Button>
										</Box>
									</Box>
								</Box>
							</Box>
						</Modal>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TableContainer
							sx={{
								width: "95%",
								height: "auto",
								overflowX: "auto",
								marginTop: "20px",
								marginLeft: "55px",
							}}
						>
							<Table
								sx={{ borderCollapse: "separate", borderSpacing: "0px 10px" }}
							>
								<TableHead>
									<TableRow>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												MEAT NAME
											</Typography>
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												CATEGORY
											</Typography>
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												TOTAL STOCK
											</Typography>
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												AVAILABLE QUANTITY
											</Typography>
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												RATE
											</Typography>
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												PRICE
											</Typography>
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography
												sx={{
													fontFamily: "Lato",
													fontWeight: "700",
													fontSize: "14px",
													color: "#000000",
												}}
											>
												STATUS
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tableData1.map((row, index) => (
										<TableRow key={index}>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography
													sx={{
														fontFamily: "Lato",
														fontWeight: "400",
														fontSize: "16px",
														color: "#000000",
													}}
												>
													{row.name}
												</Typography>
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography
													sx={{
														fontFamily: "Lato",
														fontWeight: "400",
														fontSize: "16px",
														color: "#000000",
													}}
												>
													{row.type}
												</Typography>
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography
													sx={{
														fontFamily: "Lato",
														fontWeight: "400",
														fontSize: "16px",
														color: "#000000",
													}}
												>
													{row.stock}
												</Typography>
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography
													sx={{
														fontFamily: "Lato",
														fontWeight: "400",
														fontSize: "16px",
														color: "#000000",
													}}
												>
													{row.quantity}
												</Typography>
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography
													sx={{
														fontFamily: "Lato",
														fontWeight: "400",
														fontSize: "16px",
														color: "#000000",
													}}
												>
													{row.rate}
												</Typography>
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography
													sx={{
														fontFamily: "Lato",
														fontWeight: "400",
														fontSize: "16px",
														color: "#000000",
													}}
												>
													{row.price}
												</Typography>
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Box
													sx={{
														width: { sm: "90%", lg: "40%" },
														padding: "4px 12px",
														borderRadius: "24px",
														backgroundColor:
															row.status === "Out of Stock"
																? "#F5252526"
																: "#6BEBA41A",
													}}
												>
													<Typography
														sx={{
															fontFamily: "Lato",
															fontWeight: "400",
															fontSize: "16px",
															color:
																row.status === "Out of Stock" ? "red" : "green",
														}}
													>
														{row.status}
													</Typography>
												</Box>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
	}
	else{
		window.location.href = '/';
	}

	
};

export default Billing;
