import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const INIT_STATE = {
  load: false,
  error: false,
  message: '',
};

export const RegisterPage: FC = () => {
  const [params, setParams] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [state, setState] = useState({
    load: false,
    error: false,
    message: '',
  });

  useEffect(() => {
    if (state !== INIT_STATE) {
      setState(INIT_STATE);
    }
  }, [params]);

  const navigate = useNavigate();

  async function handleSubmit() {
    setState({ load: true, error: false, message: '' });
    if (
      params.name === '' ||
      params.phone === '' ||
      params.email === '' ||
      params.password === ''
    ) {
      return setState({ load: false, error: true, message: 'Fill all fields' });
    }

    try {
      await Api.post('/users', {
        name: params.name,
        phone: params.phone,
        email: params.email,
        password: params.password,
      });

      toast.success('User created successfully ', {
        position: 'top-right',
      });

      navigate('/login', { replace: true });
    } catch (error) {
      return setState({
        load: false,
        error: true,
        message: 'Invalid email or password',
      });
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-400 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl border-4 border-blue-600 w-1/3">
        <div className="mb-5">
          <h1 className="text-4xl font-bold text-blue-600">Welcome!</h1>
          <p className="text-sm text-gray-600">
            Type your information to register
          </p>
        </div>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            label="Name"
            placeholder="Type your name..."
            name="name"
            value={params.name}
            setState={setParams}
          />

          <Input
            label="Phone"
            placeholder="Type your phone..."
            name="phone"
            value={params.phone}
            setState={setParams}
            className="mt-3"
          />

          <Input
            label="Email"
            placeholder="Type your email..."
            name="email"
            value={params.email}
            setState={setParams}
            className="mt-3"
          />

          <Input
            label="Password"
            placeholder="Type your password..."
            name="password"
            value={params.password}
            setState={setParams}
            type="password"
            className="mt-3"
          />

          {state.error && (
            <div className="mt-2 w-full text-center">
              <label className="text-blue-500">*{state.message}</label>
            </div>
          )}

          <Button
            label="REGISTER"
            load={state.load}
            type="submit"
            className="mt-3"
          />

          <div className="w-full flex justify-center mt-3">
            <label>
              Already have an account?{' '}
              <Link className="text-blue-500 hover:text-blue-400" to="/login">
                SignIn
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
