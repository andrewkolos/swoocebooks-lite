import React = require('react');
import {Assignment} from "../model/assignment";

export interface props {
    assignments: Assignment[];
}

export const RemainingTable: React.StatelessComponent<props> = (props: props) => {
    return (
        <div>
            <p>This shows how you would need to score on the remaining assignments to achieve each letter grade.</p>
            <table className="table">
                <thead>
                <tr className="">
                    <th scope="col">Grade</th>
                    <th scope="col">A</th>
                    <th scope="col">B</th>
                    <th scope="col">C</th>
                    <th scope="col">D</th>
                    <th scope="col">F</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Remaining</th>
                    <td>{neededGradeString(props.assignments, 90)}</td>
                    <td>{neededGradeString(props.assignments, 80)}</td>
                    <td>{neededGradeString(props.assignments, 70)}</td>
                    <td>{neededGradeString(props.assignments, 60)}</td>
                    <td>{neededGradeString(props.assignments, 50)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

function neededGradeString(assignments: Assignment[], desired: number) {
    let grade = assignments.reduce((acc: number, current: Assignment) =>
        acc + (current.earned / 100  * current.weight), 0.0);
    let worthRemaining = 100 - assignments.reduce((acc: number, current: Assignment) =>
        acc + current.weight, 0.0);
    let worthNeeded = desired - grade;
    let res = (worthNeeded / worthRemaining * 100);
    if (Math.abs(res) === Infinity)
        return '--';
    return res.toFixed(2);

}