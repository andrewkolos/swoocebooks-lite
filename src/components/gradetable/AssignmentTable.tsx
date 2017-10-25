import React = require('react');
import {Assignment} from "../../model/assignment";
import {AssignmentFooter} from "./AssignmentFooter";
import {AssignmentRow} from "./AssignmentRow";
import {StatelessComponent} from "react";

export interface props {
    assignments: Assignment[];
    onChange?: (assignments: Assignment[]) => void;
}


export const AssignmentTable: React.StatelessComponent<props> = (props: props) => {

    let handleAddAssignment = (assignment: Assignment) => {

        if (props.onChange)
            props.onChange(props.assignments.concat(assignment));
    };

    let handleRemoveAssignment = (removedAssignment: Assignment) => {

        props.onChange(props.assignments.filter(assignment => assignment !== removedAssignment));
    };

    let handleUpdateAssignment = (newAssignment: Assignment) => {
        props.onChange(props.assignments.map(assignment => assignment.id === newAssignment.id ? newAssignment : assignment));
    };

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
                    props.assignments.map((assignment: Assignment) => (
                        <AssignmentRow key={assignment.id} assignment={assignment}
                                       onChange={handleUpdateAssignment}/>
                    ))
                }
                <AssignmentFooter onAdd={handleAddAssignment}/>
                </tbody>
            </table>
        )
};