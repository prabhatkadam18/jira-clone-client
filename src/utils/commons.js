export const parseDate = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
};

const domain = "http://localhost:5001";

export const getPhases = async () => {
  return new Promise((resolve, reject) => {
    fetch(`${domain}/phases`).then((data) => {
      if (data) {
        resolve(data.json());
      } else {
        reject("Something went wrong while fetching phases");
      }
    });
  });
};

export const getTasks = async (phaseId) => {
  return new Promise((resolve, reject) => {
    fetch(`${domain}/tasks${phaseId ? `?phaseId=${phaseId}` : ""}`).then(
      (data) => {
        if (data) {
          resolve(data.json());
        } else {
          reject("Something went wrong while fetching tasks");
        }
      }
    );
  });
};

export const reorderElements = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const moveElementsAPICall = ({
  sourcePhaseId,
  destinationPhaseId,
  taskId,
  sourceIndex,
  destinationIndex,
}) => {
  return new Promise((resolve, reject) => {
    fetch(`${domain}/tasks/move`, {
      method: "POST",
      body: JSON.stringify({
        sourcePhaseId,
        destinationPhaseId,
        taskId,
        sourceIndex,
        destinationIndex,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((_, err) => {
      if (err) {
        console.error(err);
        return reject("Something went wrong while moving elements");
      }
      resolve();
    });
  });
};

export const formatPhases = ({ phases }) => {
  // only use task ids in phases
  return phases.map((phase) => {
    return {
      ...phase,
      tasks: phase.tasks.map((task) => task.id),
    };
  });
};

export const searchTasksAPI = ({ title, phaseId }) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${domain}/phases/search?${title ? `taskTitle=${title}&` : ""}${
        phaseId?.length > 0 ? `phaseId=${phaseId}` : ""
      }`
    ).then((data) => {
      if (data) {
        resolve(data.json());
      } else {
        reject("Something went wrong while searching tasks");
      }
    });
  });
};
