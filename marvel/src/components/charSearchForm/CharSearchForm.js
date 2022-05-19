import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss'

const CharSearchForm = ({ props }) => {
    const { getCharacterByName, clearError, process, setProcess } = useMarvelService();
    const [inputVal, setInputVal] = useState('');
    const [char, setChar] = useState(null);
    const [innerProcess, setInnerProcess] = useState('initial');

    const results = (process) => {
        switch (process) {
            case 'initial':
                return null;
            case 'completed':
                if (char == 'notfound')
                    return <div className='error'>The character was not found. Check the name and try again</div>
                else
                    return <>
                        <div className='success'>There is! Visit {char.name} page?</div>
                        <Link
                            to={char.name}
                            onFocus={e => e.target.parentElement.classList.add('active')}
                            onBlur={e => e.target.parentElement.classList.remove('active')}
                            className={`char-form__btn char-form__btn-gray`} >
                            Go To
                        </Link>
                    </>;
            case 'error':
                return <div className='error'>Something went wrong</div>;
            default:
                return 'Unexpected process state'
        }
    }

    const onSearchDone = (char, val) => {
        setChar(char);
        setInputVal(val)
    }

    return (
        <div className='formik'>
            <Formik
                initialValues={{ search: '' }}
                validationSchema={Yup.object({
                    search: Yup.string()
                        .required('This field is required'),
                })}
                onSubmit={
                    values => {
                        if (values.search !== inputVal) {
                            getCharacterByName(values.search)
                                .then(char => {
                                    clearError();
                                    onSearchDone(char, values.search);
                                    setInnerProcess('completed');
                                    setProcess('confirmed')
                                })
                                .catch((e) => {
                                    setProcess('error')
                                    setInnerProcess('error');
                                })
                        }
                        else setInnerProcess('completed');

                    }
                }>

                <Form className="char-form">
                    <label className="char-form__title">Or find a character by name:</label>
                    <Field
                        placeholder="Enter name"
                        className="char-form__input"
                        name="search"
                        type="input"
                        onKeyUp={() => setInnerProcess('initial')}
                    />
                    <button
                        className="char-form__btn"
                        type="submit"
                        style={{ backgroundColor: process == 'loading' ? '#61121b' : '' }}
                        disabled={process == 'loading' ? true : false}>

                        {process == 'loading' ? <Spinner height='70%' /> : 'Find'}
                    </button>
                    <FormikErrorMessage name="search"
                        component="div"
                        className='error'
                        styles={{ gridArea: 'error' }} />
                </Form >
            </Formik >
            <div className="message">
                {results(innerProcess)}
            </div>
        </div >

    )
}

export default CharSearchForm;

