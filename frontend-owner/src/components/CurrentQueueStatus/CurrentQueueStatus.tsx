import React from "react";
import { IQueue } from "../../models/entities/queue.entity";
import "./CurrentQueueStatus.css";

type Props = {
  queues: IQueue[];
  removeFromQueue: (tableId: string) => void;
};

const CurrentQueueStatus: React.FC<Props> = ({ queues, removeFromQueue }) => {
  return (
    <div>
      <h3>Restaurant queue status</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Queue No</th>
            <th scope="col">Head count</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queues.length > 0 &&
            queues
              .sort((a, b) => a.queueNo - b.queueNo)
              .map((queue) => {
                return (
                  <tr key={queue.queueNo}>
                    <th scope="row">{queue.queueNo}</th>

                    <td>{queue.headcount}</td>
                    <td>
                      <button
                        onClick={() => {
                          removeFromQueue(queue.id);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        remove queue
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentQueueStatus;
