import { useState, useRef, MutableRefObject, useEffect } from "react";
import { EmailIcon, PasswordIcon } from "../icons";
import { TextInput } from "./TextInput";
import { IValues } from "../App";
import { Link } from "react-router-dom";

interface Submit {
  onSubmit: (values: IValues) => void;
}

export const Signin: React.FC<Submit> = ({ onSubmit }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;
  const inputEmailRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputEmailRef.current.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
    handleReset();
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handleReset = () => {
    formRef.current.reset();
    setValues({ email: "", password: "" });
  };

  return (
    <div className="form_container">
      <h2>Signin</h2>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        onReset={handleReset}
        ref={formRef}
      >
        <TextInput
          ref={inputEmailRef}
          icon={<EmailIcon />}
          name="email"
          label="email"
          placeholder="Введите email"
          type="email"
        />
        <TextInput
          icon={<PasswordIcon />}
          name="password"
          label="password"
          placeholder="Введите пароль"
          type="password"
        />
        <button type="submit">Войти</button>
        <button type="reset">Сбросить</button>
        <Link to="/register">Зарегистрироваться</Link>
      </form>
    </div>
  );
};
