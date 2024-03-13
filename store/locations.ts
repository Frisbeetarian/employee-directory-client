import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface LocationState {
  list: string[]
  selectedLocation: string | null
}

const initialState: LocationState = {
  list: [],
  selectedLocation: null,
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
    setSelectedLocation: (locations, action) => {
      locations.selectedLocation = action.payload
    },
  },
})

export const getLocations = createSelector(
  (state) => state.entities.locations,
  (locations) => locations.list
)

export const getSelectedLocation = createSelector(
  (state) => state.entities.locations,
  (locations) => locations.selectedLocation
)

export const { setLocations, setSelectedLocation } = slice.actions
export default slice.reducer
