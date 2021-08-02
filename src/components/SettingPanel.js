import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addTask, SUCCESS_STATUS } from "../common/API";

import "./SettingPanel.css";

export default function SettingPanel(props) {
  const [state, setState] = useState({
    newTaskLocation: "",
    addTaskSuccess: false,
    showAddTaskResult: false,
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
              addTask(props.endpoint, state.newTaskLocation)
                .then((res) => {
                  const data = JSON.parse(res);
                  // console.log(data);
                  addTaskSuccess = data.status === SUCCESS_STATUS;
                  props.refreshTasks();
                })
                .catch((error) => {
                  addTaskSuccess = false;
                  console.log("Add task error:");
                  console.log(error);
                })
                .finally(() => {
                  setState((s) => ({
                    newTaskLocation: s.newTaskLocation,
                    addTaskSuccess: addTaskSuccess,
                    showAddTaskResult: true,
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
          {state.showAddTaskResult
            ? state.addTaskSuccess
              ? "Added task successfully"
              : "Failed to add task"
            : ""}
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
