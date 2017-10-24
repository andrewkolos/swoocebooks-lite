import React = require('react');
import {Assignment} from "../../model/assignment";


export interface props {
    assignment: Assignment;
    onChange: (oldAssignment: Assignment, newAssignment: Assignment) => void;
}


export class AssignmentRow extends React.Component<props, Assignment> {
    constructor(props: props) {
        super();
        this.state = JSON.parse(JSON.stringify(props.assignment));
    }

    render() {
        return (
            <tr className="assignment-row">
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.name}
                           onChange={event => this.setState({name: event.target.value})}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.earned}
                           onChange={event => this.setState({earned: +event.target.value})}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.weight}
                           onChange={event => this.setState({weight: +event.target.value})}
                    />
                </td>
                <td>{(this.state.earned / 100 * this.state.weight).toFixed(2)}</td>
            </tr>
        );
    }
}