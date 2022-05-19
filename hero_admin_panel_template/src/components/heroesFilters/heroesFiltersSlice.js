import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useHttp } from '../../hooks/http.hook'



const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const { request } = useHttp();

        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload)
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
            .addDefaultCase(() => { });
    }
});



const { actions, reducer } = filtersSlice

export default reducer;

export const { selectAll: selectAllFilters } = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetched,
    filtersFetching,
    filtersFetchingError,
    activeFilterChanged
} = actions;