import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

import getTrendingTerms from 'services/getTrendingTermsService';
import './styles.css';

export default function TrendingSearches() {
  const [trends, setTrends] = useState([]);

  useEffect(function () {
    getTrendingTerms().then(setTrends);
  }, []);

  return (
    <ul>
      {trends.map((popularGif) => (
        <li key={popularGif}>
          <Link className='link' to={`/search/${popularGif}`}>
            {popularGif}
          </Link>
        </li>
      ))}
    </ul>
  );
}
