import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { IRestaurant } from "../../models/entities/restaurant.entity";
import "./CurrentTableStatus.css";

type Props = {
  restaurant: IRestaurant | null;
  handleAddNewTable: any;
  loading: boolean;
  message: string;
};

const CurrentTableStatus: React.FC<Props> = ({
  restaurant,
  handleAddNewTable,
  loading,
  message,
}) => {
  const [newTableView, setNewTableView] = useState<boolean>(false);

  const [fomValues, setFomValues] = useState<{
    chairNo: number;
  }>({
    chairNo: 0,
  });

  // useEffect(() => {
  //   if (restaurant && restaurant.id) {
  //     setFomValues({
  //       name: restaurant.name,
  //     });
  //   }
  // }, [restaurant]);

  const validationSchema = Yup.object().shape({
    chairNo: Yup.number()
      .required("This field is required!")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      ),
  });

  return (
    <div>
      <h3>
        {" "}
        Current tables status{" "}
        <span>
          <div className="form-container">
            {newTableView ? (
              <Formik
                initialValues={{ ...fomValues, submit: null }}
                validationSchema={validationSchema}
                onSubmit={handleAddNewTable}
                enableReinitialize={true}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="chairNo">Chair no</label>
                    <Field
                      name="chairNo"
                      type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="chairNo"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Add</span>
                    </button>
                  </div>

                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            ) : (
              <button
                onClick={() => {
                  setNewTableView(true);
                }}
                type="button"
                className="btn btn-info"
              >
                Add new table
              </button>
            )}
          </div>
        </span>
      </h3>
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
    </div>
  );
};

export default CurrentTableStatus;
