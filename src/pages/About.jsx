import React from 'react';
import { Typography, Paper } from '@mui/material';

import MainCard from 'components/MainCard';

const About = () => {
    return (
        <MainCard sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                About Us
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Learn more about our company and mission.
            </Typography>
            <Typography variant="body1" paragraph>
                Here at our company, we are dedicated to providing the best possible
                service to our customers. Our mission is to make life easier for people
                by providing innovative solutions to everyday problems. We are always
                looking for ways to improve our products and services, and we welcome
                feedback from our customers.
            </Typography>
            <Typography variant="body1" paragraph>
                Our team is made up of talented and experienced individuals who are
                passionate about what they do. We believe that by working together, we
                can achieve great things and make a positive impact on the world.
            </Typography>
            <Typography variant="body1">
                Thank you for choosing our company. We look forward to serving you and
                exceeding your expectations.
            </Typography>
        </MainCard>
    );
};

export default About;
