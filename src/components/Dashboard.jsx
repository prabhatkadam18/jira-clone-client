import { useEffect } from "react";
import Phase from "./Phase";
import {
  getPhases,
  getTasks,
  move,
  moveElementsAPICall,
  reorderElements,
} from "../utils/commons";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { setPhases, setTasks } from "../features/common/dataSlice";
import { cloneDeep } from "lodash";
import Searchbar from "./Searchbar";
import { useError } from "../hooks/useError";
import ErrorDialog from "./ErrorDialog";

const Dashboard = () => {
  //   const [phases, setPhases] = useState([]);

  const dispatch = useDispatch();
  const { showError } = useError();

  useEffect(() => {
    getPhases().then((data) => {
      dispatch(setPhases(data));
      //   dispatch(setFilteredPhases(data));
    });
    getTasks().then((data) => {
      dispatch(setTasks(data));
    });
  }, []);

  const phases = useSelector((state) => state.data.phases);
  const isFiltered = useSelector((state) => state.ui.isFiltered);
  const errorMessage = useSelector((state) => state.ui.error);

  // drag and drop
  const onDragEnd = (result) => {
    if (isFiltered) {
      showError("Cannot move tasks in filtered view");
      return;
    }
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
      <Searchbar />
      <PhaseWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {phases?.map((phase) => (
            <Phase key={phase.id} phase={phase} />
          ))}
        </DragDropContext>
      </PhaseWrapper>
      <ErrorDialog message={errorMessage} />
    </Wrapper>
  );
};

const PhaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 82rem;
  margin: 10px auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px auto;
  max-width: 82rem;
`;

export default Dashboard;
