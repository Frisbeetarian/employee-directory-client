import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface SearchState {
  query: string | null
  employees: [] | null | undefined
  loading: boolean
}

const initialState: SearchState = {
  query: null,
  employees: null,
  loading: false,
}

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (search, action: PayloadAction<string | null>) => {
      search.query = action.payload
    },
    setSearchLoading: (search, action: PayloadAction<boolean>) => {
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

export const getSearchIsLoading = createSelector(
  (state) => state.entities.search,
  (search) => search.loading
)

export const { setSearchQuery, setSearchLoading, clearSearchState } =
  slice.actions
export default slice.reducer
