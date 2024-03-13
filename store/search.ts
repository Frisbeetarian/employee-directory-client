import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface SearchState {
  query: string | null
  loading: boolean
}

const initialState: SearchState = {
  query: null,
  loading: false,
}

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (search, action: PayloadAction<string | null>) => {
      search.query = action.payload
    },
    setIsSearchLoading: (search, action: PayloadAction<boolean>) => {
      search.loading = action.payload
    },
    clearSearchState: (_) => {
      return initialState
    },
  },
})

export const getSearchQuery = createSelector(
  (state) => state.entities.search,
  (search) => search.query
)

export const getIsSearchLoading = createSelector(
  (state) => state.entities.search,
  (search) => search.loading
)

export const { setSearchQuery, setIsSearchLoading, clearSearchState } =
  slice.actions
export default slice.reducer
