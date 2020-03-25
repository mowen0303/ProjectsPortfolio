import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width':'60px',
    'height':'60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value:null
        }
    }

    render() {
        const {index,fillData} = this.props;
        return (
            <div
                className="square"
                style={squareStyle}
                onClick={this.handleClick}
            >
                {fillData[index]}
            </div>
        );
    }

    handleClick = () => {
        const {index,fillData} = this.props;
        fillData[index] === null && this.props.handelClick && this.props.handelClick(index);
    }
}

Square.propTypes = {
    index:PropTypes.number,
    fillData:PropTypes.array,
    handelClick:PropTypes.func
}

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state={
            fillData : [
                null,null,null,
                null,null,null,
                null,null,null
            ],
            nextPlayer : "X",
            winner: "None"
        }
        this.finised = false;
    }

    render() {
        return (
            <div style={containerStyle} className="gameBoard">
                <div className="status" style={instructionsStyle}>Next player: {this.state.nextPlayer}</div>
                <div className="winner" style={instructionsStyle}>Winner: {this.state.winner}</div>
                <button style={buttonStyle} onClick={this.handelReset}>Reset</button>
                <div style={boardStyle}>
                    <div className="board-row" style={rowStyle}>
                        <Square index={0} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                        <Square index={1} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                        <Square index={2} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square index={3} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                        <Square index={4} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                        <Square index={5} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                    </div>
                    <div className="board-row" style={rowStyle}>
                        <Square index={6} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                        <Square index={7} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                        <Square index={8} fillData={this.state.fillData} handelClick = {this.fillSquare} />
                    </div>
                </div>
            </div>
        );
    }

    fillSquare = async (index) => {
        if(this.finised) {
            alert(`Game is finished. Winner is ${this.state.winner}`);
            return false
        }
        let newFillData = [...this.state.fillData];
        newFillData.splice(index,1,this.state.nextPlayer);
        const newNextPlayer = this.state.nextPlayer === "O" ? "X" : "O";
        await this.setState({
            fillData : newFillData,
            nextPlayer : newNextPlayer,
        })
        this.calculateWinner();
    }

    handelReset = () => {
        this.setState({
            fillData : [
                null,null,null,
                null,null,null,
                null,null,null
            ],
            nextPlayer : "X",
            winner:'None'
        })
        this.finised = false;
    }

    calculateWinner = () =>{
        const {fillData} = this.state;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        lines.forEach(line=>{
            if(this.validateFilledSquare(line) && fillData[line[0]] === fillData[line[1]] && fillData[line[0]] == fillData[line[2]]){
                this.setState({winner:fillData[line[0]]});
                this.finised = true;
            }
        })
    }

    validateFilledSquare(squareIndexArr){
        const {fillData} = this.state;
        let allSquareIsFilled = true;
        squareIndexArr.forEach(i=>{
            if(fillData[i]===null) allSquareIsFilled=false;
        })
        return allSquareIsFilled;
    }
}



class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);