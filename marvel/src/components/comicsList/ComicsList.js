import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />
        case 'confirmed':
            return <Component />
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const { getAllComics, process, setProcess } = useMarvelService();

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(8);
    const [newItemLoading, setNewItemLoading] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, []);


    const onRequest = (offset, initialLoading) => {
        // Initial Loading - первичная загрузка;

        initialLoading ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(setOffset(offset + 8))
            .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (comicsArr) => {
        setComics([...comics, ...comicsArr]);
        setNewItemLoading(false);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let { title, price, thumbnail } = item;
            if (price == 0) price = 'NOT AVAILABLE'
            else price = price + '$'
            return (
                <li className="comics__item" key={i}>
                    <Link
                        to={`/comics/${item.id}`}
                        onFocus={e => e.target.parentElement.classList.add('active')}
                        onBlur={e => e.target.parentElement.classList.remove('active')}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li >
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const button =
        <button disabled={newItemLoading} onClick={(offset) => onRequest(offset)} className="button button__main button__long">
            <div className="inner">{newItemLoading ? <Spinner width='100%' height="18px" /> : 'load more'}</div>
        </button>;

    return (
        <div className="comics__list" >
            {setContent(process, () => renderItems(comics), newItemLoading)}

            {comics.length > 0 ? button : null}
        </div >
    )
}

export default ComicsList;

