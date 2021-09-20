import React, { Component } from 'react';

export default class InputsProfil extends Component {

    inputOnChange = (e) => {
        this.props.changeInputValue(this.props.name , e.target.value);
    }

    render() {
        return (
            <div>
                <label>
                    {this.props.labelName}
                </label>
                <input
                    className="inputProfil"
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.inputOnChange} />
            </div>
        )
    }
}
