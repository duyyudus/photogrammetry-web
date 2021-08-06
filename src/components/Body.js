import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Body.css";
import SettingPanel from "./SettingPanel";
import TaskPanel from "./TaskPanel";

export default function BodySection(props) {
  return (
    <div className="container body-section">
      <SettingPanel
        endpoint={props.endpoint}
        updateEndpoint={props.updateEndpoint}
        refreshTasks={props.refreshTasks}
        endpointError={props.endpointError}
      />
      <TaskPanel
        tasks={props.tasks}
        refreshTasks={props.refreshTasks}
        endpoint={props.endpoint}
      />
    </div>
  );
}
BodySection.propTypes = {
  endpoint: PropTypes.string,
  updateEndpoint: PropTypes.func,
  tasks: PropTypes.array,
  refreshTasks: PropTypes.func,
  endpointError: PropTypes.string,
};
