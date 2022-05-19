import classNames from 'classnames';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import store from '../../store/index'
import { activeFilterChanged, fetchFilters, selectAllFilters } from "./heroesFiltersSlice";

const HeroesFilters = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    const { activeFilter } = useSelector(state => state.filters);
    const filters = selectAllFilters(store.getState());

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    const buttons = filters.map(({ name, className, label }, i) => {
        return <button
            key={i}
            onClick={e => dispatch(activeFilterChanged(name))}
            className={`btn ${className} ${classNames({ active: activeFilter == name })}`}>
            {label}</button>
    })


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;