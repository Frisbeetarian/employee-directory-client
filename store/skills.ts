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
    setSelectedSkill: (skills, action) => {
      skills.selectedSkills = action.payload
    },
  },
})

export const getSkills = createSelector(
  (state) => state.entities.skills,
  (skills) => skills.list
)

export const getSelectedSkill = createSelector(
  (state) => state.entities.skills,
  (skills) => skills.selectedSkills
)

export const { setSkills, setSelectedSkill } = slice.actions
export default slice.reducer
