import React = require('react');
import {Assignment} from "./model/assignment";


export interface SwoocebooksState {
    assignments: Assignment[];
}

export default class SwoocebooksApp extends React.Component<{}, SwoocebooksState> {
    constructor() {
        super();
        this.state = {
            assignments: []
        };
    }

    componentDidMount() {
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

    render() {
        return (
            <div className="container main-content">
                <nav className="navbar navbar-dark bg-primary">
                    <span className="navbar-brand mr-auto ml-auto">Swoocebooks Lite</span>
                </nav>
                <p><strong>Instructions:</strong> type in your grades below, use the tab key to quickly
                    move between columns.</p>

                <div>
                    <p>Weights do not add up to 100%</p>
                    <p>Current grade: 0.00%</p>
                </div>

                <div className="float-right">
                    <button className="btn btn-primary">Clear Table</button>
                </div>

                <AssignmentTable assignments={this.state.assignments}/>

                <hr className="black"/>
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
                        <td>Assignment 1</td>
                        <td>40.32</td>
                        <td>25%</td>
                        <td>joj now want%</td>
                        <td>27.32%</td>
                        <td>27.32%</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }

    handleAddAssignment(assignment: Assignment) {
        this.setState((previousState: SwoocebooksState) => {
            this.state.assignments.push(assignment);
        })
    }

    handleClearTable() {
        this.setState(() => ({assignments: []}))
    }

}

interface AssignmentTableProps {
    assignments: Assignment[];
    onChange?: (assignments: Assignment[]) => void;
}

interface AssignmentTableState {
    assignments: Assignment[];
}

export class AssignmentTable extends React.Component<AssignmentTableProps, AssignmentTableState> {
    constructor(props: AssignmentTableProps) {
        super();
        this.state = {assignments: props.assignments};
        this.handleAddAssignment = this.handleAddAssignment.bind(this);
        this.handleRemoveAssignment = this.handleRemoveAssignment.bind(this);
        this.handleUpdateAssignment = this.handleUpdateAssignment.bind(this);
    }

    handleAddAssignment(assignment: Assignment) {
        this.setState((previousState: AssignmentTableState) => ({
            assignments: previousState.assignments.concat(assignment)
        }));
        if (this.props.onChange)
            this.props.onChange(this.state.assignments);
    }

    handleRemoveAssignment(removedAssignment: Assignment) {
        this.setState((previousState: AssignmentTableState) => ({
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
                    this.state.assignments.map((assignment: Assignment) => (
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


interface AssignmentRowProps {
    assignment: Assignment;
    onChange: (oldAssignment: Assignment, newAssignment: Assignment) => void;
}


class AssignmentRow extends React.Component<AssignmentRowProps, Assignment> {
    constructor(props: AssignmentRowProps) {
        super();
        this.state = JSON.parse(JSON.stringify(props.assignment));
    }

    render() {
        return (
            <tr>
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
                <td>{this.state.earned / 100 * this.state.weight}</td>
            </tr>
        );
    }
}

interface AssignmentFooterProps {
    onAdd: (assignment: Assignment) => void;
}

export class AssignmentFooter extends React.Component<AssignmentFooterProps> {
    private nameInput: HTMLInputElement;
    private earnedInput: HTMLInputElement;
    private weightInput: HTMLInputElement;
    private forceSave: boolean = false;

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        e.currentTarget.select();
    }

    handleChange() {
        setTimeout(() => {
            console.log('handling change');
            if ((document.activeElement !== this.nameInput && document.activeElement !== this.earnedInput &&
                    document.activeElement !== this.weightInput) || this.forceSave) {

                if (this.nameInput.value || this.earnedInput.value)
                    this.props.onAdd({
                        id: this.createId(),
                        name: (this.nameInput.value ? this.nameInput.value : 'Untitled'),
                        earned: +this.earnedInput.value,
                        weight: +this.weightInput.value
                    });

                this.nameInput.value = '';
                this.earnedInput.value = '';
                this.weightInput.value = '';
            }
        }, 0) // wait for next tick to allow focus to change
    };

    handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 9) { //tab
            setTimeout(() => {
                this.forceSave = true;
                this.nameInput.focus();
            }, 0)
        }
    };

    render() {
        return (
            <tr>
                <td>
                    <input type="text"
                           name="name"
                           className="form-control"
                           ref={input => this.nameInput = input}
                           onFocus={this.handleFocus}
                           onBlur={this.handleChange}
                    />
                </td>
                <td>
                    <input type="text"
                           name="earned"
                           className="form-control"
                           ref={input => this.earnedInput = input}
                           onFocus={this.handleFocus}
                           onBlur={this.handleChange}
                    />
                </td>
                <td>
                    <input type="text"
                           name="weight"
                           className="form-control"
                           onFocus={this.handleFocus}
                           onBlur={this.handleChange}
                           onKeyDown={this.handleKeyPress}
                           ref={input => this.weightInput = input}/>
                </td>
                <td>---</td>
            </tr>
        )
    }

    createId(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}