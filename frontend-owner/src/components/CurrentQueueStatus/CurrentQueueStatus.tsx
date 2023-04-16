import React, { useState } from "react";
import { IQueue } from "../../models/entities/queue.entity";
import "./CurrentQueueStatus.css";

type Props = {
  queues: IQueue[];
  removeFromQueue: (tableId: string) => void;
  loadingRemoveQueue: boolean;
};

const CurrentQueueStatus: React.FC<Props> = ({
  queues,
  removeFromQueue,
  loadingRemoveQueue,
}) => {
  const [activeQueue, setActiveQueue] = useState<string | null>(null);

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
        {queues.length > 0 && (
          <tbody>
            {queues
              .sort((a, b) => a.queueNo - b.queueNo)
              .map((queue) => {
                return (
                  <tr key={queue.queueNo}>
                    <th scope="row">{queue.queueNo}</th>

                    <td>{queue.headcount}</td>
                    <td>
                      <button
                        onClick={() => {
                          setActiveQueue(queue.id);
                          removeFromQueue(queue.id);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        {activeQueue && queue.id === activeQueue && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span> remove queue</span>
                      </button>
                    </td>
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
