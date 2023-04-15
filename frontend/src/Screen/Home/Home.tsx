import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import GeneralSetting from "../../components/GeneralSetting/GeneralSetting";
import { IRestaurant } from "../../models/entities/restaurant.entity";
import * as AuthService from "../../services/auth.service";
import {
  getCurrentRestaurant,
  updateCurrentRestaurant,
} from "../../services/restaurant.service";
import "./Home.css";

const Home: React.FC = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [restaurantError, setRestaurantError] = useState("");
  const [restaurantUpdateError, setRestaurantUpdateError] = useState("");
  const [restaurantLoaded, setRestaurantLoaded] = useState(false);
  const [restaurantUpdateLoaded, setRestaurantUpdateLoaded] = useState(false);
  const user = AuthService.getCurrentUser();

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

  const handleGeneralSetting = async (formValue: {
    maxNumberOfTables: number;
    maxNumberOfChairsPerTable: number;
  }) => {
    const { maxNumberOfTables, maxNumberOfChairsPerTable } = formValue;

    setRestaurantUpdateError("");
    setRestaurantUpdateLoaded(true);

    if (restaurant && restaurant.id) {
      try {
        const response = await updateCurrentRestaurant({
          id: restaurant.id,
          maxNumberOfTables,
          maxNumberOfChairsPerTable,
        });
        setRestaurant(response.data);
        setRestaurantUpdateLoaded(false);
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRestaurantUpdateLoaded(false);
        setRestaurantUpdateError(resMessage);
      }
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="general-setting-container">
        <GeneralSetting
          restaurant={restaurant}
          handleGeneralSetting={handleGeneralSetting}
          loading={restaurantUpdateLoaded}
          message={restaurantUpdateError}
        />
      </header>

      <section>
        <h3> Current tables status</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>

        <h3> Restaurant queue status</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;
