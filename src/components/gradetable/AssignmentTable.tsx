import React = require('react');
import {Assignment} from "../../model/assignment";
import {AssignmentFooter} from "./AssignmentFooter";
import {AssignmentRow} from "./AssignmentRow";

export interface props {
    assignments: Assignment[];
    onChange?: (assignments: Assignment[]) => void;
}

export interface state {
    assignments: Assignment[];
}

export class AssignmentTable extends React.Component<props, state> {
    constructor(props: props) {
        super();
        this.state = {assignments: props.assignments};
        this.handleAddAssignment = this.handleAddAssignment.bind(this);
        this.handleRemoveAssignment = this.handleRemoveAssignment.bind(this);
        this.handleUpdateAssignment = this.handleUpdateAssignment.bind(this);
    }

    handleAddAssignment(assignment: Assignment) {
        this.setState((previousState: state) => ({
            assignments: previousState.assignments.concat(assignment)
        }));
        if (this.props.onChange)
            this.props.onChange(this.state.assignments);
    }

    handleRemoveAssignment(removedAssignment: Assignment) {
        this.setState((previousState: state) => ({
            assignments: previousState.assignments.filter(assignment => assignment !== removedAssignment)
        }));
        this.props.onChange(this.state.assignments);
    }

    handleUpdateAssignment(oldAssignment: Assignment, newAssignment: Assignment) {
        this.setState(prevState => ({
            assignments: prevState.assignments.map(assignment => assignment === oldAssignment ? newAssignment : assignment)
        }));
        this.props.onChange(this.state.assignments);
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Earned %</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.assignments.map((assignment: Assignment) => (
                        <AssignmentRow key={assignment.id} assignment={assignment}
                                       onChange={this.handleUpdateAssignment}/>
                    ))
                }
                <AssignmentFooter onAdd={this.handleAddAssignment}/>
                </tbody>
            </table>
        )
    };
}