import React, { Component } from 'react'

export default class EditBtns extends Component {
    render()
    {
        return (
            <div className={this.props.onRight ? "editBtns editBtnsR" : "editBtns editBtnsL"}>
                <button
                    className={this.props.editActive ? "adminBtn editActive bgImgFit" : "adminBtn editInactive bgImgFit"}
                    onClick={this.props.editAttraction}
                ></button>
                <button
                    className="adminBtn delAtr bgImgFit"
                    onClick={this.props.delAttraction}
                ></button>
            </div>
        )
    }
}
