import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducer'
import { employeesAPISlice } from './api/employeesAPISlice'
import { searchAPISlice } from '@/store/api/searchAPISlice'
import { departmentsAPISlice } from '@/store/api/departmentsAPISlice'
import { locationsAPISlice } from '@/store/api/locationsAPISlice'
import { projectsAPISlice } from '@/store/api/projectsAPISlice'
import { skillsAPISlice } from '@/store/api/skillsAPISlice'

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        employeesAPISlice.middleware,
        searchAPISlice.middleware,
        departmentsAPISlice.middleware,
        locationsAPISlice.middleware,
        projectsAPISlice.middleware,
        skillsAPISlice.middleware
      ),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
