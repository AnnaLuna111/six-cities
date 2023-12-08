import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addBookmarkAction } from '../../store/api-actions';
import { getFavoriteStatusCode } from '../../helper';
import { selectAuthorizationStatus } from '../../store/user/user-selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';

type ButtonSize = 'small' | 'big'

type FavButtonProps = {
	id: string | undefined;
	isFavorite: boolean;
	className: string;
	size: ButtonSize;
}

const sizeValue: Record<ButtonSize, {width: string; height: string}> = {
  small: {width: '18', height: '19'},
  big: {width: '31', height: '33'}
};


export const BookmarkButton = ({id, isFavorite, className, size}: FavButtonProps) => {
  const dispatch = useAppDispatch();
  const authorization = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();

  const handleClick = () => {
    if (authorization !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }

    dispatch(addBookmarkAction({
      id: id as string,
      status: getFavoriteStatusCode(!isFavorite)
    }));
  };

  return (
    <button
      className={classNames(`${className}__bookmark-button`, {[`${className}__bookmark-button--active`] : isFavorite}, 'button')}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${className}__bookmark-icon`} {...sizeValue[size]}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
};
