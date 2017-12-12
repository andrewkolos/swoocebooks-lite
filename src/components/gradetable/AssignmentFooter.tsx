import React = require('react');
import {Assignment} from "../../model/assignment";
import {evalMathExpression} from "../../util";

export interface props {
    onAdd: (assignment: Assignment) => void;
}

export class AssignmentFooter extends React.Component<props> {
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

            if ((document.activeElement !== this.nameInput && document.activeElement !== this.earnedInput &&
                    document.activeElement !== this.weightInput) || this.forceSave) {

                if (this.nameInput.value || this.earnedInput.value) {
                    let earnedVal = evalMathExpression(this.earnedInput.value);
                    let weightVal = evalMathExpression(this.weightInput.value);

                    console.log('weight val', weightVal);
                    this.props.onAdd({
                        id: this.createId(),
                        name: (this.nameInput.value ? this.nameInput.value : 'Untitled'),
                        earned: (isFinite(earnedVal) ? earnedVal : 0),
                        weight: (isFinite(weightVal) ? weightVal : 0)
                    });
                }

                this.nameInput.value = '';
                this.earnedInput.value = '';
                this.weightInput.value = '';

                this.forceSave = false;
            }
        }, 0) // wait for next tick to allow focus to change
    };

    handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 9) { //tab
            e.preventDefault();
            this.forceSave = true;
            this.nameInput.focus();
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