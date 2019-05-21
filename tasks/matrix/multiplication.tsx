import * as React from 'react';
import Matrix from '../../components/input_for_matrix';
import '../../index.sass';
import '../../theme';


interface IMultiplicationState {
  firstArray: number[][],
  secondArray: number[][],
  result: number[][],
  notifications: {
    row: number,
    column: number,
  }
}

export default class Multiplication extends React.Component<{}, IMultiplicationState > {

  state = {
    firstArray: [],
    secondArray: [],
    result: [],
    notifications: {
      row: 0,
      column: 0,
    },
  }
  
  firstIntermArray: number[][];
  secondIntermArray: number[][];

  emptyState() {
    const { row, column } = this.state.notifications;
    const rowArray = new Array(column).fill(0);
    const columnArray = new Array(row).fill(0);

    this.setState({
      firstArray: new Array(row).fill(null).map(() => [...rowArray]),
      secondArray: new Array(column).fill(null).map(() => [...columnArray]),
    })

  }

  onKeyUp = (e: KeyboardEvent): void => {
    const { row, column } = this.state.notifications;
    const { firstArray, result } = this.state;

    if (e.keyCode === 13 && !firstArray.length && row && column) {

      return this.emptyState();
    } else if (e.keyCode === 13 && !firstArray.length) {

      return alert('Entered data wrong. Check this.');
    } else if (e.keyCode === 13 && !!firstArray.length && this.firstIntermArray.length && this.secondIntermArray.length) {
      this.pasteValue();
    }    
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);

  }

  multiplication = (i: number, j: number) => {
    const { row } = this.state.notifications;
    let resoult = 0;

    for(let l = 0; l < row; l+=1) {
      resoult += this.firstIntermArray[l][j] * this.secondIntermArray[i][l];
    };

    return resoult;
  }

  pasteValue = () => {
    const { column } = this.state.notifications;
    const newArray = new Array();

    for( let i = 0; i < column; i+=1) {
      newArray[i] = new Array();
      for( let j = 0; j < column; j+=1) {
        newArray[i][j] = this.multiplication(i, j);
      }
    }
    this.setState({
      result: newArray,
    })
  }

  onChangeMatrix = (e: any) => {
    const { array, id } = e;

    if(id === 'first_matrix') {
      this.firstIntermArray = array;
    } else {
      this.secondIntermArray = array;
    }

  }

  renderMatrix() {
    const { firstArray, secondArray, result } = this.state;

    return(
      <div className="container_with_multiplication">
        <Matrix id="first_matrix" defaultValue={firstArray} onChange={this.onChangeMatrix} />
        <p className="equals" onClick={this.pasteValue}>+</p>
        <Matrix id="second_matrix" defaultValue={secondArray} onChange={this.onChangeMatrix}/>
        <p className="equals" onClick={this.pasteValue}>=</p>
        {result.length && <Matrix defaultValue={result} disabled={true} />}
      </div>
    );
  }

  onChangeInput = (e: any) => {
    const { value, id } = e.target;
    const { row, column } = this.state.notifications;
    const isRow = id === 'first_row' || id === 'second_column';

    this.setState({
      notifications: {
        row: isRow ? Number(value) : row,
        column: isRow ? column : Number(value),
      }
    });
  }

  renderInputs = () => {
    const { row, column } = this.state.notifications;

    return (
      <React.Fragment>
        <p className="font_black">Enter matrix notefications and press Enter</p>
        <div>
          <p className="font_black">First matrix</p>
          <input
            id="first_row" 
            onChange={this.onChangeInput}
            placeholder="Row"
            value={row ? row : ''}
          />
          <input 
            id="first_column" 
            placeholder="Column"
            onChange={this.onChangeInput}
            value={column ? column : ''}
          />
        </div>  
        <div>
          <p className="font_black">Second matrix</p>
          <input
            id="second_row" 
            placeholder="Row"
            onChange={this.onChangeInput}
            value={column ? column : ''}
          />
          <input
            id="second_column" 
            placeholder="Column"
            onChange={this.onChangeInput}
            value={row ? row : ''}
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { firstArray } = this.state;

    return(
      <div className="multiplication_main">
        {!firstArray.length && this.renderInputs()}
        {!!firstArray.length && this.renderMatrix()}
      </div>
    )
  };

}