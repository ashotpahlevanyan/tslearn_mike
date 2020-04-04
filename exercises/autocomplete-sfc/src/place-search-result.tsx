import * as React from 'react';
import { PlaceDetails } from './utils/places';

export const PlaceSearchResult: React.FunctionComponent<PlaceDetails> = (pd) => {
return (
    <li className="search-result">
      <img className="icon" src={pd.icon} />
      <h3>
        {pd.name}
      </h3>
      <p>
        <a href={pd.vicinity} target="_blank">{pd.vicinity}</a>
        {" "}-{" "}
        <a href={pd.website} target="_blank">{pd.website}</a>
      </p>
    </li>
  );
};
