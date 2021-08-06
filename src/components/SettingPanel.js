import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addTask, SUCCESS_STATUS } from "../common/API";

import "./SettingPanel.css";

export default function SettingPanel(props) {
  const [state, setState] = useState({
    newTaskLocation: "",
    success: false,
    status: "",
  });

  useEffect(() => {
    setState((s) => ({
      newTaskLocation: s.newTaskLocation,
      success: props.endpointError ? false : true,
      status: props.endpointError,
    }));
  }, [props.endpointError]);

  return (
    <div className="container" id="setting-panel">
      <div className="row align-items-center">
        <div className="col-auto">
          <div
            type="button"
            className="btn btn-primary btn-sm"
            id="add-task-btn"
            onClick={(e) => {
              let success = false;
              let message = "";
              addTask(props.endpoint, state.newTaskLocation)
                .then((res) => {
                  const data = JSON.parse(res);
                  // console.log(data);
                  success = data.status === SUCCESS_STATUS;
                  message = success
                    ? "Added task successfully"
                    : `Failed to add task: ${data.message}`;
                  props.refreshTasks();
                })
                .catch((error) => {
                  success = false;
                  message = `Add task error: ${error}`;
                  console.log("Add task error:");
                  console.log(error);
                })
                .finally(() => {
                  setState((s) => ({
                    newTaskLocation: s.newTaskLocation,
                    success: success,
                    status: message,
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
                success: s.success,
                status: s.status,
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
          className={`col-auto ${
            state.success ? "success-alert" : "error-alert"
          }`}
        >
          {state.status}
        </div>
      </div>
    </div>
  );
}
SettingPanel.propTypes = {
  endpoint: PropTypes.string,
  updateEndpoint: PropTypes.func,
  refreshTasks: PropTypes.func,
  endpointError: PropTypes.string,
};
