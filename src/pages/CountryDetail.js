import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const COUNTRY_QUERY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      currency
      languages {
        code
        name
      }
    }
  }
`;

function CountryDetail() {
  const { code } = useParams();
  const { loading, error, data } = useQuery(COUNTRY_QUERY, { variables: { code } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="  text-xs text-white p-6">
      <h2 className="text-xl   mb-4">{data.country.name}</h2>
      <p><strong>Native Name:</strong> {data.country.native}</p>
      <p><strong>Capital:</strong> {data.country.capital}</p>
      <p><strong>Currency:</strong> {data.country.currency}</p>
      <p><strong>Languages:</strong> {data.country.languages.map(lang => lang.name).join(', ')}</p>
    </div>
  );
}

export default CountryDetail;