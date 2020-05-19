import React from 'react';
import { Dispatch, Reducer, ReducerAction } from 'react';
import { createGroup } from '../api';
import { User } from '../api/types';
import createDataContext from './createDataProvider';

interface State {
  groups: any[];
  isLoading: boolean;
  error: any;
}

enum AuthTypes {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  LOADING = 'LOADING',
}

type Action = {
  type: AuthTypes;
  payload?: any;
};

type ApiReducer = Reducer<State, Action>;

const INITIAL_STATE: State = {
  groups: [],
  isLoading: false,
  error: null,
};

const apiReducer: ApiReducer = (prevState, action) => {
  switch (action.type) {
    case AuthTypes.SUCCESS:
      return {
        ...prevState,
        ...(action.payload || {}),
        groups: [...prevState.groups, ...(action.payload.group || [])],
        isLoading: false,
        error: undefined,
      };
    case AuthTypes.LOADING:
      return {
        ...prevState,
        isLoading: true,
        error: undefined,
      };
    case AuthTypes.FAILURE:
      return {
        ...prevState,
        isLoading: false,
        error: action.payload,
      };
    default:
      return prevState;
  }
};

const apiActions = (dispatch: Dispatch<ReducerAction<ApiReducer>>) => ({
  createGroup: async (name: string) => {
    dispatch({ type: AuthTypes.LOADING });
    try {
      const group = await createGroup(name);
      if (group) {
        return dispatch({
          type: AuthTypes.SUCCESS,
          payload: group,
        });
      }
    } catch {
      dispatch({
        type: AuthTypes.FAILURE,
      });
    }
  },
});

const { Provider, Context } = createDataContext<
  ApiReducer,
  typeof apiActions,
  State
>(apiReducer, apiActions, INITIAL_STATE);

export { Provider as ApiProvider, Context as ApiContext };
