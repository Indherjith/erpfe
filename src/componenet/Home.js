import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import chickenImage from '../Assests/Images/Chicken.png'; // Adjust the path as necessary
import muttonImage from '../Assests/Images/Goat.png'; // Adjust the path as necessary
import meatImage from '../Assests/Images/Meat.png'; // Adjust the path as necessary
import skmImage from '../Assests/Images/Frozen.png'; // Adjust the path as necessary
import oilImage from '../Assests/Images/oil.png'; // Adjust the path as necessary

const cardData = [
  { id: 1, title: 'Chicken', subtitle: '(கோழி)', image: chickenImage, route: '/stock' },
  { id: 2, title: 'Mutton', subtitle: '(ஆடு)', image: muttonImage, route: '/mutton' },
  { id: 3, title: 'Meat', subtitle: '(இறைச்சி)', image: meatImage, route: '/meat' },
  { id: 4, title: 'Skm', subtitle: '(உறைந்த பொருட்கள்)', image: skmImage, route: '/skm' },
  { id: 5, title: 'Oil', subtitle: '(எண்ணெய்)', image: oilImage, route: '/oil' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the specific route for each card
  };

  return (
    <Box>
      <Box 
        sx={{ 
          width: '1510px',
          height: '75px',
          position: 'relative',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF',
          zIndex: 1000, // Ensure the Navbar is above other elements
        }}
      >
        <Box 
          sx={{
            position: "relative",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1510px',
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
            }}
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
            position: 'relative',
            left: '154px',
            width: '1302px',
            height: '720px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '120px',
            // opacity: 0,
          }}
        >
          {cardData.map((card, index) => (
            <Card
              key={card.id}
              sx={{
                width: '300px',
                height: '300px',
                borderRadius: '10px 0px 0px 0px',
                border: '2px solid',
                borderColor:"#004E69",
                opacity: 1, // set opacity to 1 to make it visible
                mt:4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: index >= 3 ? 'auto' : 'none', // to place 2nd row cards properly
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                cursor: 'pointer', // Change cursor to pointer to indicate clickable
              }}
              onClick={() => handleCardClick(card.route)} // Add onClick event to each card
            >
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: '300px',
                  height: '222px',
                  borderTopLeftRadius: '1p0x',
                  borderTopRightRadius: '10px',
                  display: card.image ? 'block' : 'none', // Hide image if not provided
                }}
              />
              <Box
                sx={{
                  width: '300px',
                  height: '78px',
                  top: '222px',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderTop: '2px solid',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:"#004E69"
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '22px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    textAlign: 'center',
                    color:"#FFFFFF"
                  }}
                >
                  {card.title}
                  <br />
                  {card.subtitle}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;