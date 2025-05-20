import { create } from 'zustand';

interface ToggleStates {
  agree: boolean;
  auto: boolean;
  enrollment: boolean;
  admission: boolean;
  course: boolean;
  grade: boolean;
  registration: boolean;
}

interface AcademicSettingsState {
  toggleStates: ToggleStates;
  setToggle: (key: keyof ToggleStates) => void;
  setAllToggles: (states: ToggleStates) => void;
  resetToggles: () => void;
}

export const useAcademicSettings = create<AcademicSettingsState>((set) => ({
  toggleStates: {
    agree: false,
    auto: false,
    enrollment: false,
    admission: false,
    course: false,
    grade: false,
    registration: false,
  },
  setToggle: (key) =>
    set((state) => ({
      toggleStates: {
        ...state.toggleStates,
        [key]: !state.toggleStates[key],
      },
    })),
  setAllToggles: (states) =>
    set({
      toggleStates: states,
    }),
  resetToggles: () =>
    set({
      toggleStates: {
        agree: false,
        auto: false,
        enrollment: false,
        admission: false,
        course: false,
        grade: false,
        registration: false,
      },
    }),
}));
