import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addTask, SUCCESS_STATUS } from "../common/API";

import "./SettingPanel.css";

export default function SettingPanel(props) {
  const [state, setState] = useState({
    newTaskLocation: "",
    addTaskSuccess: false,
    showAddTaskResult: false,
    addTaskResultMessage: "",
  });

  return (
    <div className="container" id="setting-panel">
      <div className="row align-items-center">
        <div className="col-auto">
          <div
            type="button"
            className="btn btn-primary btn-sm"
            id="add-task-btn"
            onClick={(e) => {
              let addTaskSuccess = false;
              let message = "";
              addTask(props.endpoint, state.newTaskLocation)
                .then((res) => {
                  const data = JSON.parse(res);
                  // console.log(data);
                  addTaskSuccess = data.status === SUCCESS_STATUS;
                  message = addTaskSuccess
                    ? "Added task successfully"
                    : `Failed to add task: ${data.message}`;
                  props.refreshTasks();
                })
                .catch((error) => {
                  addTaskSuccess = false;
                  message = `Add task error: ${error}`;
                  console.log("Add task error:");
                  console.log(error);
                })
                .finally(() => {
                  setState((s) => ({
                    newTaskLocation: s.newTaskLocation,
                    addTaskSuccess: addTaskSuccess,
                    showAddTaskResult: true,
                    addTaskResultMessage: message,
                  }));
                });
            }}
          >
            Add task
          </div>
        </div>
        <div className="col" style={{ paddingLeft: 0 }}>
          <input
            type="text"
            className="form-control text-input"
            value={props.taskLocation}
            onChange={(e) => {
              setState((s) => ({
                newTaskLocation: e.target.value,
                addTaskSuccess: s.addTaskSuccess,
                showAddTaskResult: s.showAddTaskResult,
                addTaskResultMessage: s.addTaskResultMessage,
              }));
            }}
            placeholder="Task location"
          />
        </div>
        <div className="col-1"></div>
        <div className="col-auto">Server</div>
        <div className="col" style={{ paddingLeft: 0 }}>
          <input
            type="text"
            className="form-control text-input"
            value={props.endpoint}
            onChange={(e) => {
              props.updateEndpoint(e.target.value);
            }}
            placeholder="Endpoint"
          />
        </div>
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        <div
          className="col-auto"
          id={
            state.addTaskSuccess
              ? "add-task-success-alert"
              : "add-task-error-alert"
          }
        >
          {state.showAddTaskResult ? state.addTaskResultMessage : ""}
        </div>
      </div>
    </div>
  );
}
SettingPanel.propTypes = {
  endpoint: PropTypes.string,
  updateEndpoint: PropTypes.func,
  refreshTasks: PropTypes.func,
};
