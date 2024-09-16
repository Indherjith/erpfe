import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box,AppBar,Toolbar,Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import { BarChart } from '@mui/x-charts/BarChart';
import Calendar from "./Calender";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PieChart } from '@mui/x-charts/PieChart';
import {Link} from 'react-router-dom'
import Chip from '@mui/material/Chip';
import { baseUrl } from '../backenddata';
import axios from 'axios';


const Dashboard = () => {
      const [data2,setData2] = useState([{ label: 'Chicken', value: 0 ,color:"#2596BE"},
        { label: 'Mutton', value: 0,color:'#004E69'},
        { label: 'Meat', value: 0,color:'#E74C3C '},
        { label: 'Frozen', value: 0,color:'#28B463'},
        { label: 'Oil', value: 0,color:'#D35400'}]); 
      
      const [row1,setRow1] = useState([]);
      const [dailyTotal,setDailyTotal] = useState(0);
      const [graphData,setGraphdata] = useState({chicken:[0, 0, 0, 0, 0, 0, 0],mutton:[0, 0, 0, 0, 0, 0, 0],meat:[0, 0, 0, 0, 0, 0, 0],frozen:[0, 0, 0, 0, 0, 0, 0],oil:[0, 0, 0, 0, 0, 0, 0]});
      const [salesdata,setSalesdata] = useState({});
      const [stockdata,setStockdata] = useState({});


      useEffect(() => {
        fetchData();
        fetchgraph();
        fetchpie();
        fetchstocks();
      }, []);

      const fetchstocks = async ()=>{
        try {
          const response = await axios.get(`${baseUrl}card`);
          setStockdata(response.data.Items);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const fetchpie = async ()=>{
        try {
          const response = await axios.get(`${baseUrl}chart`);
          let target = response.data.Items;
          setSalesdata(response.data.Items);
          let data =  [{ label: 'Chicken', value: target.chicken ,color:"#2596BE"},
                { label: 'Mutton', value: target.mutton,color:'#004E69'},
                { label: 'Meat', value: target.meat,color:'#E74C3C '},
                { label: 'Frozen', value: target.frozen,color:'#28B463'},
                { label: 'Oil', value: target.oil,color:'#D35400'}];
          
          setData2(data);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const fetchgraph = async ()=>{
        try {
          const response = await axios.get(`${baseUrl}graph`);
          setGraphdata(response.data.Items);
          console.log(response.data.Items);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      const fetchData = async () => {
        setRow1([]);
        try {
          const response = await axios.get(`${baseUrl}today`);
          setRow1(response.data.Items);
          setDailyTotal(response.data.total);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const CalenderChange = async (datefrom) => {
        try {
          const response = await axios.post(`${baseUrl}dayat`, { date: datefrom });
          setRow1(response.data.Items); 
          setDailyTotal(response.data.total); 
          setGraphdata(response.data.graphItems);
      
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      

  return (
  <>
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
					<Link to="/homeadmin">
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
          <Link to="/adminbilling">
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
							Print Bill
						</Button>
					</Link>
				</Toolbar>
		</AppBar>
    <Box sx={{marginTop:"20px",minHeight:"100vh"}}>
   
			
    <Grid gap={4} xs={12}  sx={{display:"flex",justifyContent:"space-around"}}>
    <Card sx={{ width: "25%",padding:"10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px", padding: "0 10px" }}>
        <Typography>TOTAL IMPORTS </Typography>
        <Typography sx={{ color: "#10B981" }}>in KGs</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", marginTop: "10px", gap: "10px", padding: "0 10px" }}>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Chicken</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.chicken || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Mutton</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.mutton || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>SKM Frozen</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.frozen || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Meat</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.meat || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Oil</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.oil || 0}</Typography>
        </Box>
      </Box>
    </Card>

    <Card sx={{ width: "25%",padding:"10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px", padding: "0 10px" }}>
        <Typography>AVAILABLE STOCKS </Typography>
        <Typography sx={{ color: "#10B981" }}>in KGs</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", marginTop: "10px", gap: "10px", padding: "0 10px" }}>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Chicken</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.achicken || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Mutton</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.amutton || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>SKM Frozen</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.afrozen || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Meat</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.ameat || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Oil</Typography>
          <Typography sx={{textAlign:'right'}}>{stockdata.aoil || 0}</Typography>
        </Box>
      </Box>
    </Card>

    <Card sx={{ width: "25%",padding:"10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px", padding: "0 10px" }}>
        <Typography>TOTAL SALES </Typography>
        <Typography sx={{ color: "#10B981" }}>in KGs</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", marginTop: "10px", gap: "10px", padding: "0 10px" }}>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Chicken</Typography>
          <Typography sx={{textAlign:'right'}}>{salesdata.chicken || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Mutton</Typography>
          <Typography sx={{textAlign:'right'}}>{salesdata.mutton || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>SKM Frozen</Typography>
          <Typography sx={{textAlign:'right'}}>{salesdata.frozen || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Meat</Typography>
          <Typography sx={{textAlign:'right'}}>{salesdata.meat || 0}</Typography>
        </Box>
        <Box sx={{display:'grid', gridTemplateColumns: "1fr 1fr"}}>
          <Typography variant='h6'>Oil</Typography>
          <Typography sx={{textAlign:'right'}}>{salesdata.oil || 0}</Typography>
        </Box>
      </Box>
    </Card>

    </Grid>



    <Grid container   sx={{ display: "flex", justifyContent: "center",marginTop:"10px"}}>
  <Grid 
    item 
    sm={5} 
    md={7} 
    lg={7} 
 
    sx={{display:"flex",justifyContent:"center"}}
  >

 <Box > <Typography variant='h6' >weekly Meat Selling</Typography>
 
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Sun', 'Mon', 'Tue', 'Wed','Thur','Fri','Sat'] }]}
      yAxis={[{ min: 0, max: Number(graphData.max) }]}
      series={[
        { data: graphData.chicken , color: "#2596BE",label:"Chicken"},
        { data: graphData.mutton , color: "#004E69",label:"Mutton"},
        { data: graphData.frozen , color: "#28B463",label:"Frozen Meat"},
        { data: graphData.oil , color: "#D35400 ",label:"Oil"},
        { data: graphData.meat , color: "#E74C3C ",label:"Meat"}
      ]}
      width={"850"}
      height={"350"}
    />
    </Box>
  </Grid>
  <Grid 
    item 
    sm={5} 
    md={5} 
    lg={4} 
   
    sx={{ padding: "20px" , display:"flex",justifyContent:"end"}}
  >
    <Calendar onButtonClick={CalenderChange} />
  </Grid>
</Grid>

<Grid container  sx={{display:"flex",justifyContent:"center"}}>
    <Grid  xs={8} >
    <TableContainer >
    <Typography variant='h6'>Today meet selling</Typography>
    <Table sx={{ mixWidth: 700,minHeight:300 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center' >MEAT NAME</TableCell>
            <TableCell align="center">CATEGORY</TableCell>
            <TableCell align="center">QUANTITY (in KGs)</TableCell>
            <TableCell align="center">RATE(in KGs)</TableCell>
            <TableCell align="center">PRICE</TableCell>
            {/* <TableCell align="center">STATUS(in KGs)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {row1.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>
                {row.Type }
              </TableCell>
            
              <TableCell align="center" >{row.Category}</TableCell>
              <TableCell align="center">{row.NoOfKg}</TableCell>
              <TableCell align="center">{row.PricePerKg}</TableCell>
              <TableCell align="center">{row.TotalAmount}</TableCell>
              {/* <TableCell align="center">  <Chip label={row.status}  sx={{ color: row.status === "out of stock" ? "red" : "green",bgcolor: row.status === "out of stock" ? "#F5252526" : "#6BEBA41A" }} /></TableCell> */}
              </TableRow>  
              ))}

         
             <TableRow align="center">
            <TableCell align='center'><b>TOTAL</b></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"><b>₹{dailyTotal}.00</b></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Grid xs={3} md={3}  sx={{  display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    
 
 <Box sx={{border:"1px solid #004E69",borderRadius:"19px",maxHeight:"300px"}}>

 <Typography sx={{textAlign:"center",marginBottom: '-30px',color:'#004E69' }} variant='h6'>Maximum Selling</Typography>   
 <PieChart
      series={[
       
        {
          data: data2,
          width: 500,
          height: 200,
          innerRadius: 40,
          outerRadius: 80,
        },
      ]}
      height={300}
      width={280}
     
      slotProps={{
        legend: { hidden: false },
      }}
    />
        </Box>

 

    
        
    </Grid>
</Grid>



    
        
    </Box>

 

  </>   
  )
}

export default Dashboard