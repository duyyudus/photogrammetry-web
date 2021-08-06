import React, { useEffect, useState, useCallback } from "react";
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
    endpointError: "",
  });

  const updateEndpoint = (endpoint) => {
    setState((s) => ({
      tasks: s.tasks,
      endpoint: endpoint,
      endpointError: s.endpointError,
    }));
  };

  const refreshTasks = useCallback(() => {
    lsTasks(state.endpoint)
      .then((res) => {
        const data = JSON.parse(res);
        data.data.sort((a, b) => b.task_id - a.task_id);

        setState((s) => ({
          tasks: data.data,
          endpoint: s.endpoint,
          endpointError: "",
        }));
      })
      .catch((error) => {
        setState((s) => ({
          tasks: s.tasks,
          endpoint: s.endpoint,
          endpointError: `Server connection error: ${error.toString()}`,
        }));
        console.log(`Failed to refresh tasks: ${error}`);
      });
  }, [state.endpoint]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  useEffect(() => {
    const timer = setInterval(() => {
      refreshTasks();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [refreshTasks, state]);

  return (
    <div className="container phub">
      <HeadSection />
      <BodySection
        tasks={state.tasks}
        endpoint={state.endpoint}
        updateEndpoint={updateEndpoint}
        refreshTasks={refreshTasks}
        endpointError={state.endpointError}
      />
    </div>
  );
}

export default PHub;
