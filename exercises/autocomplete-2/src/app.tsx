import * as React from 'react';
import { PlaceSearchResultList } from './place-search-result-list';
import { PlaceDetails, PlaceSummary, fetchPlaceSummaries, fetchPlaceDetails } from './utils/places';

export interface IAppState {
  results: PlaceDetails[];
  inProgress: boolean;
  term: string;
}

export class App extends React.Component<{}, IAppState> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      results: [],
      term: '',
      inProgress: false
    };
    this.trySearch = this.trySearch.bind(this);
  }
  async trySearch(search: string) {
    this.setState({ inProgress: true, term: search });
    let placeSummaries: PlaceSummary[] = await fetchPlaceSummaries(search);
    let results: PlaceDetails[] = await fetchPlaceDetails(placeSummaries.map(p => p.place_id));
    this.setState({ results, inProgress: false });
  }
  render() {
    console.log(this.state.results);
    return (
      <PlaceSearchResultList {...this.state} handleSearch={this.trySearch} />
    );
  }
};
