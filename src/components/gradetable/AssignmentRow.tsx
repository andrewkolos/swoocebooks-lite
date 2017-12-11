import React = require('react');
import {Assignment} from "../../model/assignment";
import {evalMathExpression} from "../util";


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
    private gradeInput: HTMLInputElement;
    private weightInput: HTMLInputElement;

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
                           ref={input => this.gradeInput = input}
                           onChange={event => {
                               let val = event.target.value;
                               this.setState({earnedString: val});
                           }}
                           onBlur={event => {
                               let val = (event as any).target.value;

                               let num = evalMathExpression(val);
                               console.log(num);

                               if (isFinite(num) && num !== this.state.earnedValue && document.activeElement !== this.gradeInput) {
                                   this.setState({earnedValue: num, earnedString: String(num)});
                                   this.props.onChange(this.props.assignment);
                                   this.props.onChange({
                                       id: this.props.assignment.id,
                                       name: this.state.name,
                                       earned: num,
                                       weight: this.state.weightValue
                                   });
                               }
                           }}
                    />
                </td>
                <td>
                    <input type="text"
                           className="form-control"
                           value={this.state.weightString}
                           ref={input => this.weightInput = input}
                           onChange={event => {
                               let val = event.target.value;
                               this.setState({weightString: val});
                           }}
                           onBlur={event => {
                               let val = (event as any).target.value;
                               let num = evalMathExpression(val);
                               this.setState({weightString: val});

                               if (isFinite(num) && num !== this.state.weightValue && document.activeElement !== this.weightInput) {
                                   this.setState({weightValue: num, weightString: String(num)});
                                   this.props.onChange(this.props.assignment);
                                   this.props.onChange({
                                       id: this.props.assignment.id,
                                       name: this.state.name,
                                       earned: this.state.earnedValue,
                                       weight: num
                                   });
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