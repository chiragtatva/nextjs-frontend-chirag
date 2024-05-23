'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GET_APPLICATIONS } from '../../libs/graphql.query';

interface ISmeApplications {
  id: string;
  companyUEN: string;
  companyName: string;
  fullName: string;
  position: string;
  email: string;
}

const DataGridPage: React.FC = () => {
  const { loading, error, data } = useQuery<{ smeApplications: ISmeApplications[] }>(GET_APPLICATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const rows = data?.smeApplications?.map((application) => ({
    id: application.id,
    companyUEN: application.companyUEN,
    companyName: application.companyName,
    fullName: application.fullName,
    position: application.position,
    email: application.email,
  })) || [];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'companyUEN', headerName: 'Company UEN', width: 150 },
    { field: 'companyName', headerName: 'Company Name', width: 150 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'position', headerName: 'Position In Company', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  return (
    <Container>
      <Box sx={{ height: 400, width: '100%', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Applications Data
        </Typography>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Container>
  );
};

export default DataGridPage;
