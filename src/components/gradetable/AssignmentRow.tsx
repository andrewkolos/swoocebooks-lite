import React = require('react');
import {Assignment} from "../../model/assignment";


export interface props {
    assignment: Assignment;
    onChange: (newAssignment: Assignment) => void;
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
                           onChange={event => {
                               this.setState({name: event.target.value});
                               this.props.assignment.name = event.target.value;
                               this.props.onChange(this.props.assignment);
                           }}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.earned}
                           onChange={event => {
                               this.setState({earned: zeroIfNotFinite(event.target.value)});
                               this.props.assignment.earned = zeroIfNotFinite(event.target.value);
                               this.props.onChange(this.props.assignment);
                           }}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.weight}
                           onChange={event => {
                               this.setState({weight: zeroIfNotFinite(event.target.value)});
                               this.props.assignment.weight = zeroIfNotFinite(event.target.value);
                               this.props.onChange(this.props.assignment);
                           }}
                    />
                </td>
                <td>{(this.state.earned / 100 * this.state.weight).toFixed(2)}</td>
            </tr>
        );
    }
}

function zeroIfNotFinite(string: string) {
    let num = +string;
    return isFinite(num) ? num : 0;
}