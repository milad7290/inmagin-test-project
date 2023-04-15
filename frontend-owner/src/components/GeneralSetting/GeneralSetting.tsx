import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { IRestaurant } from "../../models/entities/restaurant.entity";
import "./GeneralSetting.css";

type Props = {
  restaurant: IRestaurant | null;
  handleGeneralSetting: any;
  loading: boolean;
  message: string;
};

const GeneralSetting: React.FC<Props> = ({
  restaurant,
  handleGeneralSetting,
  loading,
  message,
}) => {
  const [fomValues, setFomValues] = useState<{
    maxNumberOfTables: number;
    maxNumberOfChairsPerTable: number;
  }>({
    maxNumberOfTables: 0,
    maxNumberOfChairsPerTable: 0,
  });

  useEffect(() => {
    if (restaurant && restaurant.id) {
      setFomValues({
        maxNumberOfTables: restaurant.maxNumberOfTables,
        maxNumberOfChairsPerTable: restaurant.maxNumberOfChairsPerTable,
      });
    }
  }, [restaurant]);

  const validationSchema = Yup.object().shape({
    maxNumberOfTables: Yup.number()
      .required("This field is required!")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      ),
    maxNumberOfChairsPerTable: Yup.number()
      .required("This field is required!")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      ),
  });

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h5>Restaurant general setting</h5>

        <Formik
          initialValues={{ ...fomValues, submit: null }}
          validationSchema={validationSchema}
          onSubmit={handleGeneralSetting}
          enableReinitialize={true}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="maxNumberOfTables">Max no of tables</label>
              <Field
                name="maxNumberOfTables"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="maxNumberOfTables"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxNumberOfChairsPerTable">
                Max no of chairs at every table
              </label>
              <Field
                name="maxNumberOfChairsPerTable"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="maxNumberOfChairsPerTable"
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
                <span>Update</span>
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
      </div>
    </div>
  );
};

export default GeneralSetting;
