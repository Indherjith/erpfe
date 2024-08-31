import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const items = [
  { name: "Chicken", tamilName: "கோழி", img: "chicken.png" },
  { name: "Mutton", tamilName: "ஆடு", img: "mutton.png" },
  { name: "Meat", tamilName: "இறைச்சி", img: "meat.png" },
  { name: "SKM Frozen item", tamilName: "உறைந்த பொருட்கள்", img: "frozen.png" },
  { name: "Oil", tamilName: "எண்ணெய்", img: "oil.png" },
];

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 800,
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            கொங்கு கறி கடை
          </Typography>
          {/* <Button
            color="inherit"
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.primary.main,
              mr: 3,
            }}
          >
            Output Details
          </Button> */}
          <Link to='/billing'>
          <Button
            color="inherit"
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Print Bill
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
