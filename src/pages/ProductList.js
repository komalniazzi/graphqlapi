import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Chip
} from '@mui/material';
import { styled } from '@mui/system';

// Define styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const Heading = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const CountryListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const CountryChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(15, 20, 25, 0.9), rgba(25, 29, 34, 0.9))',
  color: 'white',
  padding: theme.spacing(1),
}));

// Update your GraphQL query if necessary
const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      code
      name
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);

  if (loading)
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <StyledContainer>
      <Heading variant="h4">Country List</Heading>
      <CountryListContainer>
        {data.countries.map((country) => (
          <CountryChip
            key={country.code}
            label={country.name}
            clickable
            component="a"
            href={`/country/${country.code}`}
          />
        ))}
      </CountryListContainer>
    </StyledContainer>
  );
}

export default ProductList;
