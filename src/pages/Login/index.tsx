import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const INIT_PARAMS = {
  email: '',
  password: '',
};

const INIT_STATE = {
  load: false,
  error: false,
  message: '',
};

export const LoginPage: FC = () => {
  const [params, setParams] = useState(INIT_PARAMS);
  const [state, setState] = useState(INIT_STATE);

  const { authenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setState(INIT_STATE);
  }, [params]);

  async function handleSubmit() {
    setState({ load: true, error: false, message: '' });
    if (params.email === '' || params.password === '') {
      return setState({ load: false, error: true, message: 'Fill all fields' });
    }

    try {
      await authenticate(params.email, params.password);
      navigate('/', { replace: true });
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
      <div className="bg-white p-8 rounded-3xl border-4 border-blue-500 w-1/3">
        <div className="mb-5">
          <h1 className="text-4xl font-bold text-blue-600">Welcome!</h1>
          <p className="text-sm text-gray-600">
            Type your information to login
          </p>
        </div>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            label="Email"
            placeholder="Type your email..."
            name="email"
            value={params.email}
            setState={setParams}
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
            label="LOGIN"
            load={state.load}
            type="submit"
            className="mt-3"
          />

          <div className="w-full flex justify-center mt-4">
            <label>
              Don't have an account{' '}
              <Link
                className="text-blue-500 hover:text-blue-400"
                to="/register"
              >
                SignUp
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
