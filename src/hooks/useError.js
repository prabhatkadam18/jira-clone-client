import { useDispatch, useSelector } from "react-redux";
import { clearError, setError } from "../features/common/uiSlice";

export const useError = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);

  const showError = (errorMessage, autoDismissTime = 5000) => {
    dispatch(setError(errorMessage));

    // Automatically clear the error after the specified duration
    setTimeout(() => {
      dispatch(clearError());
    }, autoDismissTime);
  };

  const removeError = () => {
    dispatch(clearError());
  };

  return { error, showError, removeError };
};
