import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  list: [],
  selectedSkills: null,
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
    setSelectedSkills: (skills, action) => {
      skills.selectedSkills = action.payload
    },
  },
})

export const getSkills = createSelector(
  (state) => state.entities.skills,
  (skills) => skills.list
)

export const getSelectedSkills = createSelector(
  (state) => state.entities.skills,
  (skills) => skills.selectedSkills
)

export const { setSkills, setSelectedSkills } = slice.actions
export default slice.reducer
