import React, { Component } from 'react'
import moment from 'moment';

export default class InputRegister extends Component
{
    state ={
        name:this.props.information,
        placeholder : this.props.placeholder,
        regex: this.props.regex,
        value:this.props.inputValue,
        errorMsg:this.props.errorMsg,
    }

    onChange = (e) => {
        this.setState({value : e.target.value}, ()=>this.props.inputText(this.state.name, this.state.value));
    }
    
    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .METHODE.   .   .   .   .   .   .   .   .   .   .   */
    /*-----------------------------------------------------------------------------------------------*/

    /**CHECK IF VALUE OF INPUT MATCH WITH HIS REGEX
    * @returns {String}*/
    checkInfo=()=>
    {
        if(this.state.name === "confPassword") return this.props.passwordComparison();
        else if(this.state.regex.test(this.state.value) || this.state.value === "" )
        {
            if (this.state.name === "birthday")
            {
                let eighteen = moment().diff(this.state.value, 'years');
                if (eighteen < 18) return "Vous devez avoir plus de 18ans pour vous inscrire ";
            }
            else return "";
        }
        else return this.state.errorMsg;
    }

    /*-----------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RENDER.   .   .   .   .   .   .   .   .   .   .    */
    /*-----------------------------------------------------------------------------------------------*/
    render() {
        return (
            <div className="FlexCol itemC">
                    <label htmlFor="mail">{this.props.label}</label>
                    <input
                        name={this.state.name}
                        onChange={this.onChange}
                        value={this.state.value}
                        type={this.props.inputType}
                        placeholder={`Saisissez votre ${this.state.placeholder}`}/>
                        <p className="inputErroMsg">
                            {this.checkInfo()}
                        </p>
                </div>
        )
    }
}