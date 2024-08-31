import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../backenddata";
import {
	Box,
	Typography,
	Button,
	TextField,
	InputAdornment,
	IconButton,
	Checkbox,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const label = {
	InputProps: {
		"aria-label": "checkbox",
	},
};

const Employee = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		// Retrieve username from localStorage if it exists
		const savedUsername = localStorage.getItem("username");
		if (savedUsername) {
			setUsername(savedUsername);
			setRememberMe(true);
		}
	}, []);

	const handleLogin = async() => {
		try {
			const result = await axios.post(`${baseUrl}employee`, {
			  userId: username,
			  password: password,
			});
			if(result.data == 'success'){
				if (rememberMe) {
				  // Save credentials to local storage
				  localStorage.setItem("username", username);
				  localStorage.setItem("password", password);
				} else {
				  // Clear credentials from local storage
				  localStorage.removeItem("username");
				  localStorage.removeItem("password");
				}
				localStorage.setItem('employeeauth',"true");
						localStorage.removeItem('adminauth');
				window.location.href = "/homeemployee";
			  }
			  else {
				setError("Incorrect Username or Password");
			  }
		}
		catch(err){
			setError("Something went wrong. Try Again!");
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleRememberMeChange = (event) => {
		setRememberMe(event.target.checked);
	};

	return (
		<Box
			sx={{
				maxWidth: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box sx={{ width: "539px", height: "470px" }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						position: "relative",
					}}
				></Box>
				<Box
					sx={{
						width: "459px",
						height: "412px",
						position: "relative",
						left: "40px",
						top: "48px",
					}}
				>
					<Box
						sx={{
							width: "271px",
							height: "38px",
							position: "relative",
							top: "-19px",
							left: "-25px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{ fontFamily: "lato", fontWeight: 500, fontSize: "32px" }}
						>
							Login as Employee
						</Typography>
					</Box>
					<Box sx={{ position: "relative", top: "9px", left: "3px" }}>
						<Typography
							sx={{ fontFamily: "lato", fontWeight: 400, fontSize: "16px" }}
						>
							Enter your User ID and password to access your account
						</Typography>
					</Box>
					<Box
						sx={{
							position: "relative",
							top: "45px",
							left: "3px",
							display: "flex",
							flexDirection: "column",
							gap: 4,
							width: "439px",
							height: "269px",
						}}
					>
						<TextField
							variant="outlined"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "12px",
								},
							}}
						/>
						<TextField
							variant="outlined"
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleClickShowPassword}>
											{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									border: "1px",
									borderRadius: "12px",
								},
							}}
						/>
						{error && <Typography color="error">{error}</Typography>}
						<Button
							onClick={handleLogin}
							sx={{
								width: "439px",
								height: "50px",
								borderRadius: "18px",
								bgcolor: "#004E69",
								color: "white",
								textTransform: "none",
								"&:hover": { bgcolor: "#004E69", color: "white" },
							}}
						>
							<Typography
								sx={{ fontFamily: "lato", fontWeight: 500, fontSize: "16px" }}
							>
								Login as Employee
							</Typography>
						</Button>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								mr: 2.5,
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Checkbox
									checked={rememberMe}
									onChange={handleRememberMeChange}
									{...label}
								/>
								<Typography>Remember me</Typography>
							</Box>
							<Typography>Need Help?</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Employee;
