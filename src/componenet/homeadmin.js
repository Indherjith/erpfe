import React from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, AppBar, Toolbar, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "./theme";

import chickenImage from '../Assests/Images/Chicken.png'; // Adjust the path as necessary
import muttonImage from '../Assests/Images/Goat.png'; // Adjust the path as necessary
import meatImage from '../Assests/Images/Meat.png'; // Adjust the path as necessary
import skmImage from '../Assests/Images/Frozen.png'; // Adjust the path as necessary
import oilImage from '../Assests/Images/oil.png'; // Adjust the path as necessary

const items = [
  { name: "Chicken", tamilName: "கோழி", img: chickenImage, path: '/admininput' },
  { name: "Mutton", tamilName: "ஆடு", img: muttonImage, path: '/admininput' },
  { name: "Meat", tamilName: "இறைச்சி", img: meatImage, path: '/admininput' },
  { name: "SKM Frozen item", tamilName: "உறைந்த பொருட்கள்", img: skmImage, path: '/admininput' },
  { name: "Oil", tamilName: "எண்ணெய்", img: oilImage, path: '/admininput' },
];

const HomeAdmin = () => {
  const auth = localStorage.getItem('adminauth') == "true" ? true : false;
    if(!auth){
      window.location.href = '/';
    }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar 
          position="static"
          sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
        >
          <Toolbar sx={{ height: '112px' }}>
            <Link to='/'>
              <Button
                onClick={()=>{
                  localStorage.removeItem('adminauth');
                }}
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: '#004E69',
                    color: 'white',
                  },
                }}
              >
                LogOut
              </Button>
            </Link>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                 fontFamily: 'lato', fontWeight: 700, fontSize: '36px', color: '#004E69',
                color: (theme) => theme.palette.secondary.main,
              }}
            >
              கொங்கு கறி கடை
            </Typography>
            <Link to='/adminoutput'>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.primary.main,
                  mr: 3,
                  '&:hover': {
                    bgcolor: '#004E69',
                    color: 'white',
                  },
                }}
              >
                Output Details
              </Button>
            </Link>
            <Link to='/adminbilling'>
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: '#004E69',
                    color: 'white',
                  },
                }}
              >
                Print Bill
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container
          sx={{
            height: 'calc(100vh - 112px)', // Subtract the height of the AppBar
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center', // Center content vertically
            justifyContent: 'center', // Center content horizontally
          }}
        >
          <Grid container spacing={4} sx={{ height: '100%' }}>
            {items.map((item, index) => (
              <Grid item xs={6} md={4} key={index}>
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <Card
                    onClick={()=>{
                      if(item.name == "Chicken"){
                        localStorage.setItem('prodadmin',item.name)
                      }
                      else if(item.name == "Mutton"){
                        localStorage.setItem('prodadmin',item.name)
                      }
                      else if(item.name == "Meat"){
                        localStorage.setItem('prodadmin',item.name)
                      }
                      else if(item.name == "SKM Frozen item"){
                        localStorage.setItem('prodadmin',item.name)
                      }
                      else{
                        localStorage.setItem('prodadmin',item.name)
                      }
                    }}
                    sx={{
                      border: "2px solid #004E69",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      maxWidth: "300px", // Set maximum width for the card
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="150px" // Reduced height
                      image={item.img}
                      alt={item.name}
                      sx={{ width: "120px" }} // Reduced width
                    />
                    <CardContent
                      sx={{
                        backgroundColor: (theme) => theme.palette.secondary.main,
                        width: "100%", 
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: 700,
                          fontSize: "0.9rem", // Reduced font size
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        ( {item.tamilName})
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default HomeAdmin;
