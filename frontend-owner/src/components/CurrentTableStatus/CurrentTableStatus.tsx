import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { ITable } from "../../models/entities/table.entity";
import "./CurrentTableStatus.css";

type Props = {
  tables: ITable[];
  handleAddNewTable: any;
  removeTable: (tableId: string) => void;
  setTableAsAvailable: (tableId: string) => void;
  loading: boolean;
  message: string;
};

const CurrentTableStatus: React.FC<Props> = ({
  tables,
  handleAddNewTable,
  removeTable,
  setTableAsAvailable,
  loading,
  message,
}) => {
  const [newTableView, setNewTableView] = useState<boolean>(false);

  const [fomValues, setFomValues] = useState<{
    chairNo: number;
  }>({
    chairNo: 0,
  });

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
        Current tables status
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
            <th scope="col">Name</th>
            <th scope="col">Availability</th>
            <th scope="col">Chair count</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.length > 0 &&
            tables
              .sort((a, b) => a.order - b.order)
              .map((table) => {
                return (
                  <tr key={table.order}>
                    <th scope="row">{table.name}</th>
                    <td style={{ color: table.isAvailable ? "green" : "gray" }}>
                      {table.isAvailable ? "Available" : "Occupied"}
                    </td>
                    <td>{table.chairsNo}</td>
                    <td>
                      {table.isAvailable ? (
                        <button
                          onClick={() => {
                            removeTable(table.id);
                          }}
                          type="button"
                          className="btn btn-danger"
                        >
                          remove table
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setTableAsAvailable(table.id);
                          }}
                          type="button"
                          className="btn btn-success"
                        >
                          Set as available
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentTableStatus;
