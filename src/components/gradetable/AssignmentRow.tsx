import React = require('react');
import {Assignment} from "../../model/assignment";


export interface props {
    assignment: Assignment;
    onChange: (newAssignment: Assignment) => void;
}

interface state {
    name: string;
    earnedString: string;
    earnedValue: number;
    weightString: string;
    weightValue: number;
}

export class AssignmentRow extends React.Component<props, state> {
    constructor(props: props) {
        super();
        this.state  = {
            name: props.assignment.name,
            earnedString: `${props.assignment.earned}`,
            earnedValue: props.assignment.earned,
            weightString: `${props.assignment.weight}`,
            weightValue: props.assignment.weight
        }

    }

    render() {
        return (
            <tr className="assignment-row">
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.name}
                           onChange={event => {
                               let val = event.target.value;
                               this.setState({name:val});
                               this.props.assignment.name = (val);
                               this.props.onChange({id: this.props.assignment.id, name: val, earned: this.state.earnedValue, weight: this.state.weightValue});
                           }}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.earnedString}
                           onChange={event => {
                               let val = event.target.value;
                               this.setState({earnedString: val});
                               let num = zeroIfNotFinite(val);
                               if (num == 0) { // invalid value
                                   this.setState({earnedString: '0'});
                               }
                               if (num !== this.state.earnedValue) {
                                   this.setState({earnedValue: num});
                                   this.props.onChange(this.props.assignment);
                                   this.props.onChange({id: this.props.assignment.id, name: this.state.name, earned: num, weight: this.state.weightValue});
                               }
                           }}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.weightString}
                           onChange={event => {
                               let val = event.target.value;
                               this.setState({weightString: val});
                               let num = zeroIfNotFinite(val);
                               if (num == 0) { // invalid value
                                   this.setState({weightString: '0'});
                               }
                               if (num  !== this.state.weightValue) {
                                   this.setState({weightValue: num});
                                   this.props.onChange(this.props.assignment);
                                   this.props.onChange({id: this.props.assignment.id, name: this.state.name, earned: this.state.earnedValue, weight: num});
                               }
                           }}
                    />
                </td>
                <td>{(this.state.earnedValue / 100 * this.state.weightValue).toFixed(2)}</td>
            </tr>
        );
    }
}

function zeroIfNotFinite(string: string) {
    let num = +string;
    return isFinite(num) ? num : 0;
}