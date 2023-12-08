import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { isPasswordValid } from '../../helper';
import { loginUserAction } from '../../store/api-actions';
import { plaseholderStyle } from '../../const';

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null &&
      passwordRef.current !== null &&
      isPasswordValid(passwordRef.current.value)) {
      dispatch(loginUserAction({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };
  const [password, setPassword] = useState<string>('');

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          ref={passwordRef}
          onChange={() => setPassword(passwordRef.current?.value ?? '')}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {!isPasswordValid(password) &&
          <div style={plaseholderStyle}>
            Password must contain at least one digit and one letter sign.
          </div>}
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );

};
