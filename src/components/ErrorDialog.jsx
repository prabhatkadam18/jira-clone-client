import { Center, Dialog } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import classes from "../styles/Styles.module.css";

const ErrorDialog = ({ message }) => {
  return (
    <Dialog
      opened={message}
      size="lg"
      radius="md"
      className={classes.errorWrapper}
    >
      <Center>
        <IconExclamationCircle className={classes.errorIcon} color="red" />
        {message}
      </Center>
    </Dialog>
  );
};

export default ErrorDialog;
