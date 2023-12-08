import { errorMessage } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectError } from '../../store/error/error-selectors';

export const ErrorMessage = () => {
  const error = useAppSelector(selectError);

  return (error)
    ? <div style={errorMessage}>{error}</div>
    : null;

};
