import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { deleteTask, restartTask, startTask, pauseTask } from "../common/API";

import "./TaskPanel.css";

const STEP_NAME_MAP = {
  0: "Not Started",
  1: "DNG Conversion",
  2: "Color Correction",
  3: "Prepare RC",
  4: "Mesh Reconstruction",
  5: "Completed",
};

function TaskId(props) {
  return <div className="task-item-id">Task {props.taskId}</div>;
}
TaskId.propTypes = {
  taskId: PropTypes.number,
};

function ProgressBarBlock(props) {
  return (
    <div className="container">
      {props.enabled ? (
        <div
          className={`progress-bar-block progress-bar-block-${props.step}`}
        />
      ) : (
        ""
      )}
    </div>
  );
}
ProgressBarBlock.propTypes = {
  step: PropTypes.number,
  enabled: PropTypes.bool,
};

function ProgressBar(props) {
  return (
    <div className="container task-item-progress-bar">
      <div className="row g-0">
        {[1, 2, 3, 4, 5].map((step) => (
          <div className="col" key={"step" + step}>
            <ProgressBarBlock
              step={step}
              enabled={0 < step && step < props.step + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
ProgressBar.propTypes = {
  step: PropTypes.number,
};

function CurrentStep(props) {
  let message = "";
  if (props.imgTotal > 0) {
    message = `In progress, ${props.imgCompleted}/${props.imgTotal} images...`;
  } else {
    message = "In progress...";
  }
  return (
    <div className="container">
      <div className="row task-item-current-step" style={{ marginBottom: 10 }}>
        {STEP_NAME_MAP[props.step]}
      </div>
      <div className="row task-item-step-in-progress">
        {props.stepInProgress ? message : ""}
      </div>
    </div>
  );
}
CurrentStep.propTypes = {
  step: PropTypes.number,
  stepInProgress: PropTypes.bool,
  imgCompleted: PropTypes.number,
  imgTotal: PropTypes.number,
};

function TaskLocation(props) {
  return <div className="task-item-location">{props.taskLocation}</div>;
}
TaskLocation.propTypes = {
  taskLocation: PropTypes.string,
};

function Checkbox(props) {
  return (
    <div className="container task-item-checkbox">
      <div className="row">
        <div className="col-auto">
          <div
            className={
              props.ticked
                ? "task-item-checkbox-ticked"
                : "task-item-checkbox-unticked"
            }
          />
        </div>
        <div className="col-auto" style={{ paddingLeft: 0 }}>
          <div className="task-item-checkbox-label">{props.label}</div>
        </div>
      </div>
    </div>
  );
}
Checkbox.propTypes = {
  label: PropTypes.string,
  ticked: PropTypes.bool,
};

function TaskItem(props) {
  return (
    <div className="container task-item">
      <div className="row justify-content-between" style={{ marginBottom: 10 }}>
        {/* Task info column */}
        <div className="col">
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-auto">
              <TaskId taskId={props.taskData.task_id} />
            </div>
            <div className="col">
              <ProgressBar step={props.taskData.step} />
            </div>
            <div className="col">
              <CurrentStep
                step={props.taskData.step}
                stepInProgress={props.taskData.step_in_progress}
                imgCompleted={props.taskData.image_progress.completed}
                imgTotal={props.taskData.image_progress.total}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TaskLocation taskLocation={props.taskData.task_location} />
            </div>
          </div>
        </div>

        {/* Task buttons column */}
        <div className="col-auto">
          <div
            className="row justify-content-evenly"
            style={{ marginBottom: 20 }}
          >
            <div className="col">
              <div
                type="button"
                className="btn btn-primary btn-sm"
                id={props.taskData.paused ? "start-task-btn" : "pause-task-btn"}
                onClick={(e) => {
                  if (props.taskData.paused) {
                    startTask(props.endpoint, props.taskData.task_id).then(
                      (res) => {
                        props.refreshTasks();
                      }
                    );
                  } else {
                    pauseTask(props.endpoint, props.taskData.task_id).then(
                      (res) => {
                        props.refreshTasks();
                      }
                    );
                  }
                }}
              >
                {props.taskData.paused ? "Start" : "Pause"}
              </div>
            </div>
            <div className="col">
              <div
                type="button"
                className="btn btn-primary btn-sm"
                id="restart-task-btn"
                onClick={(e) => {
                  restartTask(props.endpoint, props.taskData.task_id).then(
                    (res) => {
                      props.refreshTasks();
                    }
                  );
                }}
              >
                Restart
              </div>
            </div>
            <div className="col">
              <div
                type="button"
                className="btn btn-primary btn-sm"
                id="delete-task-btn"
                onClick={(e) => {
                  deleteTask(props.endpoint, props.taskData.task_id).then(
                    (res) => {
                      props.refreshTasks();
                    }
                  );
                }}
              >
                Delete
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Checkbox
                ticked={!props.taskData.require.color_checker}
                label="Color checker"
              />
            </div>
            <div className="col">
              <Checkbox
                ticked={!props.taskData.require.raw_image}
                label="Raw images"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sep-light" />
      </div>
    </div>
  );
}
TaskItem.propTypes = {
  taskData: PropTypes.object,
  endpoint: PropTypes.string,
  refreshTasks: PropTypes.func,
};

export default function TaskPanel(props) {
  return (
    <div className="container" id="task-panel">
      <div className="row justify-content-start align-items-center">
        <div className="col-auto" id="task-list-label">
          Task list
        </div>
        <div className="col-auto" id="refresh-count-label">
          Auto refresh every 2 seconds
        </div>
      </div>
      <div className="sep-dark" />
      {props.tasks.map((task, i) => (
        <TaskItem
          taskData={task}
          endpoint={props.endpoint}
          refreshTasks={props.refreshTasks}
          key={"task" + task.task_id + i}
        />
      ))}
    </div>
  );
}
TaskPanel.propTypes = {
  tasks: PropTypes.array,
  refreshTasks: PropTypes.func,
  endpoint: PropTypes.string,
};
