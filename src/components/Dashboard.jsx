import { useEffect, useState } from "react";
import Phase from "./Phase";
import {
  getPhases,
  getTasks,
  moveElementsAPICall,
  reorderElements,
} from "../utils/commons";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPhases, setTasks } from "../features/data/dataSlice";
import { cloneDeep } from "lodash";

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const Dashboard = () => {
  //   const [phases, setPhases] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getPhases().then((data) => {
      dispatch(setPhases(data));
    });
    getTasks().then((data) => {
      dispatch(setTasks(data));
    });
  }, []);

  const phases = useSelector((state) => state.data.phases);
  //   const tasks = useSelector((state) => state.data.tasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd && source.index === destination.index) {
      return;
    }

    if (sInd === dInd) {
      // reordering across same phase
      const phaseIndex = phases.findIndex((phase) => phase.id === sInd);
      if (phaseIndex > -1) {
        const items = reorderElements(
          phases[phaseIndex].tasks,
          source.index,
          destination.index
        );
        const newState = cloneDeep(phases);
        newState[phaseIndex].tasks = items;
        dispatch(setPhases(newState));
      }
    } else {
      // moving across phases
      const sourcePhaseIndex = phases.findIndex((phase) => phase.id === sInd);
      const destinationPhaseIndex = phases.findIndex(
        (phase) => phase.id === dInd
      );
      const result = move(
        phases[sourcePhaseIndex].tasks,
        phases[destinationPhaseIndex].tasks,
        source,
        destination
      );
      const newState = cloneDeep(phases);
      newState[sourcePhaseIndex].tasks = result[sInd];
      newState[destinationPhaseIndex].tasks = result[dInd];
      dispatch(setPhases(newState));
    }

    const sourcePhaseIndex = phases.findIndex((phase) => phase.id === sInd);

    moveElementsAPICall({
      sourcePhaseId: sInd,
      destinationPhaseId: dInd,
      taskId: phases[sourcePhaseIndex]?.tasks?.[source.index]?.id,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    });
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {phases?.map((phase) => (
          <Phase key={phase.id} phase={phase} />
        ))}
      </DragDropContext>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 82rem;
  margin: 30px auto;
`;

export default Dashboard;
