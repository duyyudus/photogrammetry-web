import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./TaskPanel.css";

export default function TaskPanel(props) {
  return (
    <div className="container" id="task-panel">
      <div className="row justify-content-start align-items-center">
        <div className="col-auto" id="task-list-label">
          Task list
        </div>
        <div className="col-auto" id="refresh-count-label">
          Refresh in 10 seconds
        </div>
      </div>
      <div className="sep-dark" />
    </div>
  );
}
