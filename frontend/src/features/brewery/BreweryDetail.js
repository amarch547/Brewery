import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BreweryDetails = () => {
  const [brewery, setBrewery] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/breweries/${id}`
        );
        setBrewery(response.data);
      } catch (error) {
        console.error("Error fetching brewery details:", error);
      }
    };

    fetchBreweryDetails();
  }, [id]);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitReview = () => {
    // You can send the rating and review to the backend here
    // For now, let's log them to the console
    console.log("Rating: ", rating);
    console.log("Review: ", review);
  };

  if (!brewery) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 md:ml-24">
      <h1 className="text-2xl font-semibold mb-4">{brewery.name}</h1>
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

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Rate and Review</h2>
        <div className="flex items-center space-x-4 mt-2">
          <label className="text-sm font-medium">Rating:</label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="0">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mt-2">
          <label className="text-sm font-medium">Review:</label>
          <textarea
            value={review}
            onChange={handleReviewChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleSubmitReview}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreweryDetails;


