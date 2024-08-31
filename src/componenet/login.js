import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Grid, Card, CardActions, CardMedia, Button, Dialog } from '@mui/material';
import AdminImg from '../Assests/Images/image 3.png';
import employeeImg from '../Assests/Images/image 5.png';
import HomeIcon from '@mui/icons-material/Home';
import Admin from './admin'; // Ensure you have this component
import Employee from './employee'; // Ensure you have this component
import { Link } from 'react-router-dom';

function Login() {
  
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const clickOpen = (page) => {
    setDialogContent(page);
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
    setDialogContent(null);
  };

  const handleBackHome = () => {
    clickClose(); 
  };

  return (
    <Box sx={{ Width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppBar sx={{ height: '112px' }}>
        <Toolbar sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'white' }}>
          <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '36px', color: '#004E69' }}>கொங்கு கறி கடை</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
        <Grid container spacing={15} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: '300px', maxHeight: '300px', margin: 1 }}>
              <CardMedia sx={{ width: '200px', height: '200px', position: 'relative', left: '21px' }} image={AdminImg} title='Admin login' />
              <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#004E69' }}>
                <Button sx={{ color: 'white' }} onClick={() => {
                  const adminauth = localStorage.getItem('adminauth') == "true" ? true : false;
                  if(adminauth){
                    window.location.href = '/homeadmin';
                  }else{
                    clickOpen(<Admin />)
                  }                  
                  }}>
                  Admin
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: '300px', maxHeight: '300px', margin: 1 }}>
              <CardMedia sx={{ width: '200px', height: '200px', position: 'relative', left: '21px' }} image={employeeImg} title='Employee login' />
              <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#004E69' }}>
                <Button sx={{ color: 'white' }} onClick={() =>{
                  const empauth = localStorage.getItem('employeeauth') == "true" ? true : false;
                  if(empauth){
                    window.location.href = '/homeemployee';
                  }
                   clickOpen(<Employee />)}}>
                  Employee
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={clickClose} sx={{ height: "600px" }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2 }}>
          <Button
            sx={{
              fontFamily: 'lato',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'underline',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: 'transparent',
              },
              height: 'auto',
              width: 'auto',
            }}  
            onClick={clickClose}
          >
                    {<HomeIcon fontSize='small' />}

            Back to Home
          </Button>
        </Box>
        {dialogContent}
      </Dialog>
    </Box>
  );
}

export default Login;
