

import { Component } from 'react';
import './employees-list-item.css'

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.salary = this.props.salary
    }

    render() {
        const { name, onDelete, onToggleProp, increase, rise, onUpdateSalary } = this.props;
        const { salary } = this.props;
        let classes = "list-group-item d-flex justify-content-between";

        if (increase) {
            classes += ' increase';
        }
        if (rise) {
            classes += ' like'
        }
        return (
            <li className={classes} >
                <span className="list-group-item-label"
                    onClick={onToggleProp}
                    data-toggle='rise'
                >
                    {name}
                </span>
                <input type="text" className="list-group-item-input"
                    defaultValue={salary + '$'}
                    onBlur={(e) => e.currentTarget.value = `${salary}$`}
                    onFocus={(e) => e.currentTarget.value = salary}
                    onChange={onUpdateSalary} />
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn-cookie btn-sm"
                        onClick={onToggleProp} data-toggle='increase'>
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;