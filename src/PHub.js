import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { lsTasks } from "./common/API";

import HeadSection from "./components/Head";
import BodySection from "./components/Body";

import "./PHub.css";

const DEF_ENDPOINT = "http://localhost:5000";

function PHub() {
  const [state, setState] = useState({
    tasks: [],
    endpoint: DEF_ENDPOINT,
  });

  const updateEndpoint = (endpoint) => {
    setState((s) => ({ tasks: s.tasks, endpoint: endpoint }));
  };

  const refreshTasks = () => {
    lsTasks(state.endpoint)
      .then((res) => {
        const data = JSON.parse(res);
        data.data.sort((a, b) => b.task_id - a.task_id);

        setState((s) => ({
          tasks: data.data,
          endpoint: s.endpoint,
        }));
        // console.log("Refreshed tasks");
      })
      .catch((error) => {
        console.log("Failed to refresh tasks");
        console.log(error);
      });
  };

  useEffect(() => {
    refreshTasks();

    const timer = setInterval(() => {
      refreshTasks();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container phub">
      <HeadSection />
      <BodySection
        tasks={state.tasks}
        endpoint={state.endpoint}
        updateEndpoint={updateEndpoint}
        refreshTasks={refreshTasks}
      />
    </div>
  );
}

export default PHub;
