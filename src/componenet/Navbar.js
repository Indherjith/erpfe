import React from 'react';
import { Box, TextField, MenuItem, Select, IconButton, Typography } from '@mui/material';


const Navbar = () => {
  return (
    <Box 
      sx={{ 
        width: '1520px',
        height: '75px',
        position: 'relative',
        // alignItems: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        // backgroundColor: '#FFFFFF',
        // zIndex: 1000, // Ensure the Navbar is above other elements
      }}
    >
        <Box 
  sx={{
    position: "relative",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1520px',
    height: '75px',
  }}
>
  <Typography 
    sx={{ 
      fontFamily: 'Lato',
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '15px',
      textAlign: 'center',
      color:"#004E69"

    }}
  >
    கொங்கு கறி கடை
  </Typography>
  <Box
                  sx={{
                    width: '120px',
                    height: '42px',
                    borderRadius: '4px',
                    border: '1px solid #D0D3D9',
                    backgroundColor: '#004E69',
                    color: '#FFFFFF',
                    position:"relative",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    left:"450px"
                    // cursor: 'pointer',
                    // '&:hover': {
                    //   backgroundColor: '#f0f0f0',
                    // },
                  }}
                //   onClick={() => navigate('/filter')}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Lato',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      textAlign: 'center',
                    }}
                  >
                    Print Bill
                  </Typography>
                </Box>
</Box>


      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        
      </Box>
     
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '75px'
        }}
      >
         
        {/* <Box 
          sx={{
            height: '39px',
            width: '0.75px',
            backgroundColor: '#ccc',
            borderRadius: '0.75px 0px 0px 0px',
            margin: '12.75px 20px 12.75px 0'
          }}
        /> */}

       
      </Box>
    </Box>
  );
};

export default Navbar;