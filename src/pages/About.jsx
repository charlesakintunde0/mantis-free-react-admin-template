import React from 'react';
import { Typography, Paper } from '@mui/material';

import MainCard from 'components/MainCard';

const About = () => {
    return (
        <MainCard sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                About Our Integrated Pest Management System
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Learn more about how our system can help manage pests for your business.
            </Typography>
            <Typography variant="body1" paragraph>
                Our integrated pest management system is designed to provide a complete solution for businesses that need to manage pests. With our system, you can track and monitor pest activity in your facility, create customized treatment plans, and get real-time alerts when new pests are detected.
            </Typography>
            <Typography variant="body1" paragraph>
                Our team of experts has years of experience in pest management, and we have designed our system to be user-friendly and effective. Our system is customizable to meet the needs of your specific business, and we offer ongoing support to ensure that you are getting the most out of our system.
            </Typography>
            <Typography variant="body1">
                Thank you for considering our integrated pest management system. We are committed to providing the highest quality service and support to our customers, and we look forward to helping you manage pests more effectively.
            </Typography>
        </MainCard>
    );
};

export default About;
