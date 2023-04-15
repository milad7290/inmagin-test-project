import React, { useEffect, useState } from "react";
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

  const [restaurantError, setRestaurantError] = useState("");
  const [restaurantLoaded, setRestaurantLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrentRestaurant("643a8a80fac36b6bb66a5bca");

        setRestaurant(response.data);
      } catch (error: any) {
        setRestaurantError(error);
      } finally {
        setRestaurantLoaded(true);
      }
    })();
  }, []);

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
      <section>
        <h3>May I ask how many people are you?</h3>
        <SubmitHeadCount
          restaurant={restaurant}
          handleCheckTableAvailability={handleCheckTableAvailability}
          loading={loading}
          message={error}
          response={response}
        />
      </section>
    </div>
  );
};

export default Home;
