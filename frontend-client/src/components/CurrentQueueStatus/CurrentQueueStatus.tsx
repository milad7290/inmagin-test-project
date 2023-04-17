import React from "react";
import { IQueue } from "../../models/entities/queue.entity";
import "./CurrentQueueStatus.css";

type Props = {
  queues: IQueue[];
};

const CurrentQueueStatus: React.FC<Props> = ({ queues }) => {
  return (
    <div className="table-container">
      <h3>Restaurant queue status</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Queue No</th>
            <th scope="col">Settle report</th>
          </tr>
        </thead>
        {queues.length > 0 && (
          <tbody>
            {queues
              .sort((a, b) => a.queueNo - b.queueNo)
              .map((queue) => {
                return (
                  <tr key={queue.queueNo}>
                    <th scope="row">{queue.queueNo}</th>

                    <td>{queue.settledReport}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
      {queues.length === 0 && (
        <p className="no-item-found">there is no customer in queue yet!</p>
      )}
    </div>
  );
};

export default CurrentQueueStatus;
