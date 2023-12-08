import { useAppDispatch } from '../../hooks';
import {loadOffersAction} from '../../store/api-actions';

export const ErrorScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="error__text">Не удалось загрузить предложения. Попробуйте еще раз.</p>
      <button
        onClick={() => {
          dispatch(loadOffersAction());
        }}
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
};
