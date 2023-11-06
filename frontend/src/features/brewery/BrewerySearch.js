import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";

const BrewerySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("city");

  const handleSearch = async () => {
    try {
      let queryParam = "";
      if (searchType === "city") {
        queryParam = "by_city";
      } else if (searchType === "name") {
        queryParam = "by_name";
      } else if (searchType === "type") {
        queryParam = "by_type";
      }

      const res = await axios.get(
        `https://api.openbrewerydb.org/breweries?${queryParam}=${searchQuery}`
      );
      setResults(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error searching breweries:", error);
    }
  };

  return (
    <div className="p-8 md:ml-24">
      <h1 className="text-2xl font-semibold mb-4">Brewery Search</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search query"
          className="p-2 border rounded w-2/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleSearch}
        >
          Search
        </button>
       <Link to="/logout">
       <button
          className="p-2 bg-gray-500 text-white rounded"
        >
          Logout
        </button>
       </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((brewery) => (
          <li key={brewery.id} className="border p-4 rounded shadow-md">
            <Link to={`/brewery/${brewery.id}`}>
              {" "}
              {/* Add a Link to the Brewery details page */}
              <h2 className="text-xl font-semibold mb-2">{brewery.name}</h2>
              <p>
                <strong>Name:</strong> {brewery.name}
              </p>
              <p>
                <strong>Address:</strong> {brewery.street}
              </p>
              <p>
                <strong>Phone:</strong> {brewery.phone}
              </p>
              <p>
                <strong>City:</strong> {brewery.city}
              </p>
              <p>
                <strong>State:</strong> {brewery.state}
              </p>
              {brewery.website_url && (
                <p>
                  <strong>Website URL:</strong>{" "}
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brewery.website_url}
                  </a>
                </p>
              )}
              <p>
                <strong>Type:</strong> {brewery.brewery_type}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrewerySearch;
