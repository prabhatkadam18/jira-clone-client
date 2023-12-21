import styled from "styled-components";
import TaskList from "./TaskList";
import { Badge } from "@mantine/core";
import { useSelector } from "react-redux";

const Phase = ({ phase }) => {
  const { title, id, color } = phase;

  const tasks = useSelector(
    (state) => state.data.phases.find((p) => p.id === id).tasks
  );

  return (
    <PhaseWrapper className="phase">
      <Badge size="lg" color={color}>
        {title}
      </Badge>
      <TaskList phaseId={id} color={color} taskList={tasks} />
    </PhaseWrapper>
  );
};

const PhaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
`;

export default Phase;
