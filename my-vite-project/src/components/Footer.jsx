
import { Box, Typography, Link } from '@mui/material';

function Footer() {
      return (
            <Box
                  sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        padding: '20px 0',
                        position: 'relative',
                        bottom: 0,
                        width: '100%',
                  }}
            >
                  <Typography variant="body1" align="center">
                        © 2025 Booky. All rights reserved.
                  </Typography>

            </Box>
      );
}

export default Footer;
