import styled from "styled-components";
import { Badge } from "@mantine/core";
import { parseDate } from "../utils/commons";
import classes from "../styles/Styles.module.css";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, color }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            marginBottom: "1rem",
          }}
        >
          <TaskWrapper>
            <Title>{task.title}</Title>
            <Badge
              size="lg"
              classNames={{
                root: classes.task,
              }}
            >
              {parseDate(task.createdOn)}
            </Badge>
            <Footer color={color} />
          </TaskWrapper>
        </div>
      )}
    </Draggable>
  );
};

const TaskWrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(230, 230, 230, 0.1);
  position: relative;
  cursor: grab;
`;

const Title = styled.div`
  font-weight: 800;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  font-size: 1.1rem;
`;

// const CreatedOn = styled(Badge)``;

const Footer = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  width: 100%;
  height: 4px;
  border-radius: 0 0 5px 5px;
  position: absolute;
  bottom: 0;
`;

export default Task;
