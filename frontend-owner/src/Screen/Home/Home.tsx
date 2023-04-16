import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import CurrentQueueStatus from "../../components/CurrentQueueStatus/CurrentQueueStatus";
import CurrentTableStatus from "../../components/CurrentTableStatus/CurrentTableStatus";
import GeneralSetting from "../../components/GeneralSetting/GeneralSetting";
import { IRestaurant } from "../../models/entities/restaurant.entity";
import * as AuthService from "../../services/auth.service";
import { removeFromQueue } from "../../services/queue.service";
import {
  getCurrentRestaurant,
  updateCurrentRestaurant,
} from "../../services/restaurant.service";
import {
  createNewTable,
  removeTable,
  setTableAsAvailable,
} from "../../services/table.service";
import "./Home.css";

const Home: React.FC = () => {
  const { addToast } = useToasts();

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [restaurantLoaded, setRestaurantLoaded] = useState(false);
  const [restaurantUpdateLoading, setRestaurantUpdateLoading] = useState(false);
  const [addTableLoading, setAddTableLoading] = useState(false);
  const [removeTableLoading, setRemoveTableLoading] = useState(false);
  const [updateTableLoading, setUpdateTableLoading] = useState(false);
  const [removeQueueLoading, setRemoveQueueLoading] = useState(false);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user && user.restaurant) {
      (async () => {
        try {
          const response = await getCurrentRestaurant(user.restaurant.id);

          setRestaurant(response.data);
        } finally {
          setRestaurantLoaded(true);
        }
      })();
    }
  }, []);

  const handleGeneralSetting = async (formValue: {
    maxNumberOfTables: number;
    maxNumberOfChairsPerTable: number;
  }) => {
    const { maxNumberOfTables, maxNumberOfChairsPerTable } = formValue;

    setRestaurantUpdateLoading(true);

    if (restaurant && restaurant.id) {
      try {
        const response = await updateCurrentRestaurant({
          id: restaurant.id,
          maxNumberOfTables,
          maxNumberOfChairsPerTable,
        });

        setRestaurant(response.data);
        setRestaurantUpdateLoading(false);
        addToast("Restaurant general setting Successfully updated", {
          appearance: "success",
        });
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRestaurantUpdateLoading(false);
        addToast(resMessage, {
          appearance: "error",
        });
      }
    }
  };

  const handleAddNewTable = async (formValue: { chairNo: number }) => {
    const { chairNo } = formValue;

    setAddTableLoading(true);

    if (restaurant && restaurant.id) {
      try {
        const response = await createNewTable({
          restaurantId: restaurant.id,
          chairNo,
        });

        setRestaurant(response.data);
        setAddTableLoading(false);

        addToast("New table successfully added to restaurant", {
          appearance: "success",
        });
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setAddTableLoading(false);
        addToast(resMessage, {
          appearance: "error",
        });
      }
    }
  };

  const handleRemoveTable = async (tableId: string) => {
    setRemoveTableLoading(true);

    try {
      const response = await removeTable(tableId);

      setRestaurant(response.data);
      setRemoveTableLoading(false);
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setRemoveTableLoading(false);
      addToast(resMessage, {
        appearance: "error",
      });
    }
  };

  const handleSetTableAsAvailable = async (tableId: string) => {
    setUpdateTableLoading(true);

    try {
      const response = await setTableAsAvailable({
        tableId,
      });

      setRestaurant(response.data[0]);
      setUpdateTableLoading(false);
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setUpdateTableLoading(false);
      addToast(resMessage, {
        appearance: "error",
      });
    }
  };

  const handleRemoveFromQueue = async (queueId: string) => {
    setRestaurantUpdateLoading(true);

    try {
      const response = await removeFromQueue(queueId);

      setRestaurant(response.data);
      setRestaurantUpdateLoading(false);
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setRestaurantUpdateLoading(false);
      addToast(resMessage, {
        appearance: "error",
      });
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      {restaurantLoaded ? (
        <>
          <header className="general-setting-container">
            <GeneralSetting
              restaurant={restaurant}
              handleGeneralSetting={handleGeneralSetting}
              loading={restaurantUpdateLoading}
            />
          </header>

          {restaurant && (
            <section>
              <CurrentTableStatus
                tables={restaurant.tables}
                handleAddNewTable={handleAddNewTable}
                removeTable={handleRemoveTable}
                setTableAsAvailable={handleSetTableAsAvailable}
                loadingAddTable={addTableLoading}
                loadingRemoveTable={removeTableLoading}
                loadingUpdateTable={updateTableLoading}
              />
              <CurrentQueueStatus
                queues={restaurant.queues}
                removeFromQueue={handleRemoveFromQueue}
                loadingRemoveQueue={removeQueueLoading}
              />
            </section>
          )}
        </>
      ) : (
        <span className="spinner-border spinner-border-sm"></span>
      )}
    </div>
  );
};

export default Home;
