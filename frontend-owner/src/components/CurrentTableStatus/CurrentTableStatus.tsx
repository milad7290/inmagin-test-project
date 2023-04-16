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
  loadingAddTable: boolean;
  loadingRemoveTable: boolean;
  loadingUpdateTable: boolean;
};

const CurrentTableStatus: React.FC<Props> = ({
  tables,
  handleAddNewTable,
  removeTable,
  setTableAsAvailable,
  loadingAddTable,
  loadingRemoveTable,
  loadingUpdateTable,
}) => {
  const [newTableView, setNewTableView] = useState<boolean>(false);

  const [fomValues, setFomValues] = useState<{
    chairNo: number;
  }>({
    chairNo: 0,
  });

  const [activeTable, setActiveTable] = useState<string | null>(null);

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
    <div className="container">
      <h3>Current tables status</h3>

      <div className="form-container">
        {newTableView ? (
          <Formik
            initialValues={{ ...fomValues, submit: null }}
            validationSchema={validationSchema}
            onSubmit={(e) => {
              setNewTableView(false);
              handleAddNewTable(e);
            }}
            enableReinitialize={true}
          >
            <Form className="card">
              <div className="form-group">
                <label htmlFor="chairNo">Chair no</label>
                <Field name="chairNo" type="number" className="form-control" />
                <ErrorMessage
                  name="chairNo"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group action-container">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loadingAddTable}
                >
                  {loadingAddTable && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Add</span>
                </button>
                <button
                  onClick={() => {
                    setNewTableView(false);
                  }}
                  type="button"
                  className="btn btn-secondary btn-block"
                >
                  <span>cancel</span>
                </button>
              </div>
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

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Availability</th>
            <th scope="col">Chair count</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {tables.length > 0 && (
          <tbody>
            {tables
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
                            setActiveTable(table.id);
                            removeTable(table.id);
                          }}
                          type="button"
                          className="btn btn-danger"
                        >
                          {loadingRemoveTable && table.id === activeTable && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          Remove table
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveTable(table.id);
                            setTableAsAvailable(table.id);
                          }}
                          type="button"
                          className="btn btn-success"
                        >
                          {loadingUpdateTable && table.id === activeTable && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span> Set as available and update the queue</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
      {tables.length === 0 && (
        <p className="no-item-found">No table has been created yet</p>
      )}
    </div>
  );
};

export default CurrentTableStatus;
