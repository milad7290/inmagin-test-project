import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { IRestaurant } from "../../models/entities/restaurant.entity";
import "./SubmitHeadCount.css";

type Props = {
  restaurant: IRestaurant | null;
  handleCheckTableAvailability: any;
  loading: boolean;
  message: string;
  response: string;
};

const SubmitHeadCount: React.FC<Props> = ({
  restaurant,
  handleCheckTableAvailability,
  loading,
  message,
  response,
}) => {
  const [newTableView, setNewTableView] = useState<boolean>(false);

  const [fomValues, setFomValues] = useState<{
    headCount: number;
  }>({
    headCount: 0,
  });

  // useEffect(() => {
  //   if (restaurant && restaurant.id) {
  //     setFomValues({
  //       name: restaurant.name,
  //     });
  //   }
  // }, [restaurant]);

  const validationSchema = Yup.object().shape({
    headCount: Yup.number()
      .required("This field is required!")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      ),
  });

  return (
    <div>
      <Formik
        initialValues={{ ...fomValues, submit: null }}
        validationSchema={validationSchema}
        onSubmit={handleCheckTableAvailability}
        enableReinitialize={true}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="headCount">Head count</label>
            <Field name="headCount" type="number" className="form-control" />
            <ErrorMessage
              name="headCount"
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
              <span>Check for availability</span>
            </button>
          </div>

          {response ? (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                {response}
              </div>
            </div>
          ) : (
            <>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default SubmitHeadCount;
