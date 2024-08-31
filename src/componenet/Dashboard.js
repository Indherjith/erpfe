import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Grid
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './dashboard.css';

function createData(name, totalStock, quantity, rate, price, status) {
  return { name, totalStock, quantity, rate, price, status };
}

const rows = [
  createData('Chicken', 100, 100, 280, '28,000', 'in stock'),
  createData('Mutton', 237, 9.0, 37, '38,000', 'Out of Stock'),
];

const calculateTotals = (rows) => {
  let totalStock = 0;
  let totalQuantity = 0;
  let totalRate = 0;
  let totalPrice = 0;

  rows.forEach(row => {
    totalStock += row.totalStock;
    totalQuantity += row.quantity;
    totalRate += row.rate;
    totalPrice += parseInt(row.price.replace(/,/g, '')); // Convert price to number
  });

  return {
    totalStock,
    totalQuantity,
    totalRate,
    totalPrice: totalPrice.toLocaleString('en-US') // Convert number to string with commas
  };
};

const getStatusColor = (status) => {
  if (status.toLowerCase() === 'in stock') {
    return 'green';
  } else if (status.toLowerCase() === 'out of stock') {
    return 'red';
  }
  return 'black'; 
};

const Dashboard = () => {
  const totals = calculateTotals(rows);

  return (
    <Box sx={{ maxWidth: '100vw', maxHeight: '100vh'}}>
      <AppBar sx={{ height: '85px', position: 'static' }}>
        <Toolbar sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'white' }}>
          <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '36px', color: '#004E69' }}>கொங்கு கறி கடை</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} mt={1} px={8}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={5} >
          <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 600, fontSize: '12px' }}>TOTAL ORDERS</Typography>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '12px', color: '#10B981' }}>in KGs</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Chiken</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Mutton</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={5}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 600, fontSize: '12px' }}>TOTAL ORDERS</Typography>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '12px', color: '#10B981' }}>in KGs</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Chiken</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Mutton</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={5}>
          <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 600, fontSize: '12px' }}>TOTAL ORDERS</Typography>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '12px', color: '#10B981' }}>in KGs</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Chiken</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Mutton</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={5}>
          <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 600, fontSize: '12px' }}>TOTAL ORDERS</Typography>
              <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '12px', color: '#10B981' }}>in KGs</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:'row'}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Chiken</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,flexDirection:'column' }}>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Mutton</Typography>
                <Typography sx={{ fontFamily: 'lato', fontWeight: 400, fontSize: '16px' }}>80 kg</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2} px={8}>
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Weekly Meat Selling</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
        <Box
    sx={{
      border: '2px solid #004E69',
      borderRadius: '21.14px',
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    }}
  >
            <Typography
              sx={{
                fontFamily: 'lato',
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              Calendar
            </Typography>
            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
              <Calendar
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none', // Remove border
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2} px={8}>
  <Grid item xs={12} md={8}>
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontFamily: 'lato', fontWeight: 700, fontSize: '20px' }}>Today Meat Selling</Typography>
      <TableContainer sx={{ mt: 2, width: '100%', maxWidth: '845.08px', height: 'auto', maxHeight: '383px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 700, lineHeight: '19.6px', textAlign: 'left' }}>MEAT NAME</TableCell>
              <TableCell sx={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 700, lineHeight: '19.6px', textAlign: 'left' }}>TOTAL STOCK</TableCell>
              <TableCell sx={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 700, lineHeight: '19.6px', textAlign: 'left' }}>QUANTITY (in KGs)</TableCell>
              <TableCell sx={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 700, lineHeight: '19.6px', textAlign: 'left' }}>RATE (per KG)</TableCell>
              <TableCell sx={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 700, lineHeight: '19.6px', textAlign: 'left' }}>PRICE</TableCell>
              <TableCell sx={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 700, lineHeight: '19.6px', textAlign: 'left' }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left', py: 4 }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left' }}>{row.totalStock}</TableCell>
                <TableCell sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left' }}>{row.quantity}</TableCell>
                <TableCell sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left' }}>{row.rate}</TableCell>
                <TableCell sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left' }}>{row.price}</TableCell>
                <TableCell sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left', color: getStatusColor(row.status) }}>
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '22.95px', textAlign: 'left' }}
            >
              <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell>{totals.totalStock}</TableCell>
              <TableCell>{totals.totalQuantity}</TableCell>
              <TableCell>{totals.totalRate}</TableCell>
              <TableCell>{totals.totalPrice}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Grid>
  <Grid item xs={12} md={4}>
    <Box
      sx={{
        border: '2px solid #004E69',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '286px',
        height: '329px',
        mt: 2, // Add margin-top to create space between the elements
      }}
    >
      <Typography sx={{ fontFamily: 'Lato', fontSize: '16.4px', fontWeight: 400, lineHeight: '19.95px', color: '#004E69' }}>Maximum Selling</Typography>
    </Box>
  </Grid>
</Grid>

    </Box>
  );
}

export default Dashboard;
