import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { lsTasks } from "./common/API";

import HeadSection from "./components/Head";
import BodySection from "./components/Body";

import "./PHub.css";

const DEF_ENDPOINT = "http://localhost:5000";

/**
 * Fetch task data using REST-APIs
 * @param {Object} state
 * @param {Function} setState
 */
function fetchData(state, setState) {
  lsTasks(state.endpoint).then((res) => {
    const data = JSON.parse(res);

    setState((s) => ({ tasks: data.data.reverse(), endpoint: s.endpoint }));
  });
}

function PHub() {
  const [state, setState] = useState({
    tasks: [],
    endpoint: DEF_ENDPOINT,
  });

  useEffect(() => {
    fetchData(state, setState);
  }, []);

  return (
    <div className="container phub">
      <HeadSection />
      <BodySection tasks={state.tasks} />
    </div>
  );
}

export default PHub;
