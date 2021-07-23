import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Body.css";
import SettingPanel from "./SettingPanel";
import TaskPanel from "./TaskPanel";

export default function BodySection(props) {
  return (
    <div className="container body-section">
      <SettingPanel />
      <TaskPanel />
    </div>
  );
}
