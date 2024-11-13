import { Grid2, Skeleton } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export const Skeletons = () => {
    return (
        <Container maxWidth="xl" >
        <Grid2 container spacing={2}> 
                {Array.from(Array(10)).map((_, index) => ( 
                    <Grid2 size key={index} xs={12} sm={6} md={4} lg={2}>
                        <Skeleton 
                            variant="rounded" 
                            width={250} 
                            height={250} 
                            sx={{ marginBottom: "1em" }} 
                            className='skeleton-card' 
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}
