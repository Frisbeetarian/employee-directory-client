import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  list: [],
}

const slice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (skills, action) => {
      if (action.payload) {
        skills.list = action.payload
      }
    },
  },
})

export const getSkills = createSelector(
  (state) => state.entities.skills,
  (skills) => skills.list
)

export const { setSkills } = slice.actions
export default slice.reducer
