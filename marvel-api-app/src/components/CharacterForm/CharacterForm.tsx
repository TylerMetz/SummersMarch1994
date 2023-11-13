import { useState } from "react";
import { MD5 } from "crypto-js";

const CharacterForm = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    comic: "",
    // add more search parameters as needed
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseUrl = "https://gateway.marvel.com/v1/public/comics";
    const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

    // Generate a timestamp
    const ts = new Date().getTime().toString();

    // Generate an MD5 hash
    const hash = MD5(ts + privateKey + apiKey).toString();

    // Construct the URL with the required parameters
    const url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

    // Set headers
    const headers = {
      Accept: "application/json",
    };

    // Make the API call
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    // Parse the response
    const data = await response.json();
    console.log(data); // display the response data in the console for now
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Character Name:
        <input
          type="text"
          name="name"
          value={searchParams.name}
          onChange={handleInputChange}
        />
      </label>
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
  );
};

export default CharacterForm;
