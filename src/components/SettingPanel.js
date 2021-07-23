import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./SettingPanel.css";

export default function SettingPanel(props) {
  return (
    <div className="container" id="setting-panel">
      <div className="row align-items-center">
        <div className="col-auto">
          <div
            type="button"
            className="btn btn-primary btn-sm"
            id="add-task-btn"
            onClick={(e) => {}}
          >
            Add task
          </div>
        </div>
        <div className="col" style={{ paddingLeft: 0 }}>
          <input
            type="text"
            className="form-control text-input"
            value={props.taskLocation}
            onChange={(e) => {}}
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
            onChange={(e) => {}}
            placeholder="Endpoint"
          />
        </div>
      </div>
    </div>
  );
}
