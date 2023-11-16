import React, { useState } from 'react';
import { MD5 } from 'crypto-js';
import { ComicDataWrapper } from '../../marvel-api-types';
import ComicSearchFilters from './Filter/ComicSearchFilters';
import { FilterSettings } from './Filter/filter-types';

const CharacterForm = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    comic: '',
    // add more search parameters as needed
  });

  const [filterSettings, setFilterSettings] = useState({
    orderBy: null as string | null,
  });

  const [responseData, setResponseData] = useState<ComicDataWrapper | null>(
    null
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseUrl = 'https://gateway.marvel.com/v1/public/comics';
    const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

    // Generate a timestamp
    const ts = new Date().getTime().toString();

    // Generate an MD5 hash
    const hash = MD5(ts + privateKey + apiKey).toString();

    // Construct the URL with the required parameters
    let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&title=${searchParams.comic}`;

    // Add filter settings to the URL
    if (filterSettings.orderBy) {
      url += `&orderBy=${filterSettings.orderBy}`;
    }

    // Set headers
    const headers = {
      Accept: 'application/json',
    };

    // Make the API call
    console.log('fetching: ', url)
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    // Parse the response
    const data: ComicDataWrapper = await response.json();
    if (data.code === 200 && data.data?.results?.length === 0) {
      console.log('response was attempting, using starts with')
      url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&titleStartsWith=${searchParams.comic}`;
  
      const newResponse = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
  
      const newData: ComicDataWrapper = await newResponse.json();
      setResponseData(newData);
      console.log(newData);
    } else {
      // Results found with the current search parameters
      setResponseData(data);
      console.log(data);
    }
  };

  const saveFilterSettings = (newFilterSettings: FilterSettings) => {
    setFilterSettings(newFilterSettings);
  };

  return (
    <div>
      <ComicSearchFilters
        onFilterChange={saveFilterSettings}></ComicSearchFilters>
      <form onSubmit={handleSubmit}>
        <label>
          Comic Title:
          <input
            type="text"
            name="comic"
            value={searchParams.comic}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {responseData && responseData.code === 200 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Issue Number</th>
              <th>Description</th>
              <th>Cover</th>
            </tr>
          </thead>
          <tbody>
            {responseData.data?.results?.map((result) => (
              <tr key={result.id}>
                <td>
                  {result.urls
                    ?.filter((urlItem) => urlItem.type === 'detail')
                    ?.map((detailLink) => (
                      <a
                        key={detailLink.type}
                        href={detailLink.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        {result.title}
                      </a>
                    ))}
                </td>
                <td>{result.issueNumber}</td>
                <td>{result.description}</td>
                <td>
                  {result.thumbnail && (
                    <img
                      src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                      alt={result.title}
                      style={{ maxWidth: '100px' }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharacterForm;
