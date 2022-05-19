import { connect, useSelector, useDispatch } from "react-redux";
import { inc, dec, rnd } from '../actions';

const Counter = () => {

    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <div className="qty mt-5 mx-2 ">
            <h1>{counter}</h1>
            <button onClick={() => dispatch(dec())} className="minus bg-gray">-</button>
            <button onClick={() => dispatch(inc())} className="plus bg-gray">+</button>
            <button onClick={() => dispatch(rnd())} className="random bg-gray">RND</button>
        </div>
    )
}

export default Counter;