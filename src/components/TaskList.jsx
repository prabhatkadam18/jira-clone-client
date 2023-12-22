import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import styled from "styled-components";

const TaskList = ({ phaseId, color, taskList }) => {
  return (
    <Wrapper>
      <Droppable key={phaseId} droppableId={phaseId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={{
            //   backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            // }}
            {...provided.droppableProps}
          >
            {taskList.map((task, index) => (
              <Task key={task.id} task={task} index={index} color={color} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  height: 78vh;
  overflow: auto;
`;

export default TaskList;
