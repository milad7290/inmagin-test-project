import React, { useEffect, useState } from "react";
import CurrentQueueStatus from "../../components/CurrentQueueStatus/CurrentQueueStatus";
import SubmitHeadCount from "../../components/SubmitHeadCount/SubmitHeadCount";
import { IRestaurant } from "../../models/entities/restaurant.entity";
import {
  checkTableAvailability,
  getCurrentRestaurant,
} from "../../services/restaurant.service";
import "./Home.css";

const Home: React.FC = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [restaurantLoaded, setRestaurantLoaded] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCurrentRestaurant("Test restaurant");

      setRestaurant(response.data);
    } finally {
      setRestaurantLoaded(true);
    }
  };

  const handleCheckTableAvailability = async (formValue: {
    headCount: number;
  }) => {
    const { headCount } = formValue;

    setError("");
    setLoading(true);

    if (restaurant && restaurant.id) {
      try {
        const response = await checkTableAvailability(restaurant.id, headCount);
        setResponse(response.data);
        setError("");
        setLoading(false);
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setResponse("");
        setLoading(false);
        setError(resMessage);
      }
    }
  };

  return (
    <div className="container">
      {restaurantLoaded ? (
        <section>
          <h3>May I ask how many people are you?</h3>
          <SubmitHeadCount
            restaurant={restaurant}
            handleCheckTableAvailability={handleCheckTableAvailability}
            loading={loading}
            message={error}
            response={response}
          />

          {restaurant && (
            <CurrentQueueStatus
              queues={restaurant.queues.filter((item) => item.isSettled)}
            />
          )}

          <button
            type="button"
            onClick={() => {
              fetchData();
            }}
            className="btn btn-dark refresh-btn"
          >
            Refresh
          </button>
        </section>
      ) : (
        <span className="spinner-border spinner-border-sm"></span>
      )}
    </div>
  );
};

export default Home;
