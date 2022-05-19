
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { heroCreated } from '../heroesList/heroesSlice';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import store from '../../store';
import { selectAllFilters } from '../heroesFilters/heroesFiltersSlice';

const HeroesAddForm = () => {
    const { request } = useHttp();

    const dispatch = useDispatch();

    const filters = selectAllFilters(store.getState());

    const { filtersLoadingStatus } = useSelector(state => state.filters);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');


    const addHero = (name, description, element) => {
        const id = nanoid();
        const data = {
            "id": id,
            "name": name,
            "description": description,
            "element": element
        }
        // heroes[heroes.length - 1].id + 1
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(data))
            .then(() => dispatch(heroCreated({ id, ...data })))
            .catch(e => dispatch(console.log(e)))

        setName('');
        setDescription('');
        setElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов...</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0)
            return filters.map(({ name, label }) => {
                if (name === 'all') return
                return <option key={name} value={name}>{label}</option>
            })
    }
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={e => {
            e.preventDefault();
            addHero(name, description, element)
        }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={name}
                    onInput={e => setName(e.target.value)}
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    value={description}
                    onInput={e => setDescription(e.target.value)}
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={element}
                    onChange={e => {
                        setElement(e.target.value)
                    }}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;