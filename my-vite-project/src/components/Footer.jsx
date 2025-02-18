
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
                        © {new Date().getFullYear()} BookStore. All rights reserved.
                  </Typography>
                  <Typography variant="body2" align="center">
                        <Link href="/terms" color="inherit">
                              Terms of Service
                        </Link>{' '}
                        |{' '}
                        <Link href="/privacy" color="inherit">
                              Privacy Policy
                        </Link>
                  </Typography>
            </Box>
      );
}

export default Footer;
