
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { AppState, AuditData, Page, Language, Answer } from '../config';

type Action =
  | { type: 'SET_PAGE'; payload: Page }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: Answer } }
  | { type: 'TOGGLE_MITIGATION'; payload: string }
  | { type: 'SET_CHECKUP_DATE'; payload: string }
  | { type: 'RESET_DATA' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  page: Page.Home,
  language: 'en',
  auditData: {
    answers: {},
    completedMitigations: [],
  },
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_ANSWER':
      return {
        ...state,
        auditData: {
          ...state.auditData,
          answers: {
            ...state.auditData.answers,
            [action.payload.questionId]: action.payload.answer,
          },
        },
      };
    case 'TOGGLE_MITIGATION': {
      const completed = new Set(state.auditData.completedMitigations);
      if (completed.has(action.payload)) {
        completed.delete(action.payload);
      } else {
        completed.add(action.payload);
      }
      return {
        ...state,
        auditData: {
          ...state.auditData,
          completedMitigations: Array.from(completed),
        },
      };
    }
    case 'SET_CHECKUP_DATE':
      return {
        ...state,
        auditData: {
          ...state.auditData,
          nextCheckupDate: action.payload,
        },
      };
    case 'RESET_DATA':
      localStorage.removeItem('privacyAuditData');
      return { ...initialState, language: state.language, page: state.page };
    case 'LOAD_STATE':
        return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('privacyAuditLanguage') as Language | null;
      const storedData = localStorage.getItem('privacyAuditData');
      const auditData: AuditData | null = storedData ? JSON.parse(storedData) : null;
      
      const payload: Partial<AppState> = {};
      if (storedLang) payload.language = storedLang;
      if (auditData) payload.auditData = auditData;
      
      dispatch({ type: 'LOAD_STATE', payload });

    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('privacyAuditLanguage', state.language);
      localStorage.setItem('privacyAuditData', JSON.stringify(state.auditData));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state.language, state.auditData]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
   