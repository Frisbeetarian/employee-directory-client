import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface LocationState {
  list: string[]
}

const initialState: LocationState = {
  list: [],
}

const slice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocations: (locations, action) => {
      if (action.payload) {
        locations.list = action.payload
      }
    },
  },
})

export const getLocations = createSelector(
  (state) => state.entities.locations,
  (locations) => locations.list
)

export const { setLocations } = slice.actions
export default slice.reducer
