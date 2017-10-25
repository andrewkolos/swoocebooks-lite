import React = require('react');
import {Assignment} from "./model/assignment";
import './styles/styles.scss';
import {AssignmentTable} from "./components/gradetable/AssignmentTable";
import {RemainingTable} from "./components/RemainingTable";


export interface SwoocebooksState {
    assignments: Assignment[];
}

export class SwoocebooksApp extends React.Component<{}, SwoocebooksState> {
    constructor() {
        super();
        this.state = {
            assignments: []
        };
    }

    componentWillMount() {
        try {
            const json = localStorage.getItem('assignments');
            const assignments = JSON.parse(json);
            if (assignments) {
                this.setState(() => ({assignments}));
            }
        } catch (e) {
            // nothing needs to be done
        }
    }

    componentDidUpdate(prevState: SwoocebooksState) {
        const json = JSON.stringify(this.state.assignments);
        localStorage.setItem('assignments', json);
    }

    calculateGrade = () => {
        return this.state.assignments.reduce((acc, current) =>
            acc + (current.earned / 100 * current.weight), 0.0);
    };

    handleChange = (updated: Assignment[]) => {
        this.setState({assignments: updated});
    };

    render() {
        console.log(this.state.assignments);
        return (
            <div className="container main-content">
                <nav className="navbar navbar-dark bg-primary">
                    <span className="navbar-brand mr-auto ml-auto">Swoocebooks Lite</span>
                </nav>
                <p className="instructions"><strong>Instructions:</strong> type in your grades below, use the tab key to
                    quickly
                    move between columns.</p>

                <div className="heads-up-wrapper">
                    <div className="heads-up">
                        <p>
                            &nbsp; {/*blank spaces are a cheap way to "reserve" space in the page if weights do add up to 100*/}
                            {this.state.assignments.reduce((a, c) => a + c.weight, 0) !== 100 && 'Weights do not add up to 100%'}
                            &nbsp; {/*another one here to preserve centering*/}
                        </p>
                        <p>Current grade: {this.calculateGrade().toFixed(2)}</p>
                    </div>
                </div>

                <div className="float-right clearButton">
                    <button className="btn btn-primary"
                            onClick={this.handleClearTable}
                    >
                        Clear Table
                    </button>
                </div>

                <AssignmentTable assignments={this.state.assignments} onChange={this.handleChange}/>

                <hr className="hr-dark"/>

                <RemainingTable assignments={this.state.assignments}/>

            </div>
        );
    }

    handleAddAssignment = (assignment: Assignment) => {
        this.setState((previousState: SwoocebooksState) => ({
            assignments: this.state.assignments.concat(assignment)
        }));
    };

    handleClearTable = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState(() => ({
            assignments: []
        }));
    };

}