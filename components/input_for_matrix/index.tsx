import * as React from 'react';
import classNames from 'classnames';
import '../../index.sass';
import '../../theme';

interface IMatrixProps {
  row?: number;
  column?: number;
  defaultValue?: [][];
  disabled?: boolean;
  id?: string;
  onChange?: ({}) => void;
}

interface IMatrixState {
  array: number[][];
}

export default class Matrix extends React.Component<IMatrixProps, IMatrixState > {

  emptyState() {
    const { row, column } = this.props;
    const rowArray = new Array(column).fill(0);

    return new Array(row).fill(null).map(() => [...rowArray]);
  }

  state = {
    array: this.props.defaultValue ? this.props.defaultValue : this.emptyState(), //add to value defaultValue from props or create array extends data "row" and "column" from props.
  }

  changeArray = (i: number, j: number, e: any) => {
    const { value } = e.target;
    const { array } = this.state;
    const { onChange, id } = this.props
    let newArray = array;
  
    newArray[i][j] = Number(value);
    onChange({ array: newArray, id: id });

    this.setState({
      array: newArray,
    })
  }

  renderInputs() {
    const { array } =  this.state;
    const { disabled } = this.props;
  
    return array.map((item, i) => (
      <div className={classNames('row', 'border_dark_grey')} key={i}>
        {item.map((value, j) => (
          <input
            className={classNames('input', 'border_dark_grey')}
            key={`${i}.${j}`}
            data-row={i}
            data-column={j}
            defaultValue={value}
            disabled={disabled}
            onChange={this.changeArray.bind(null, i, j)}
          />
        ))}
      </div>
    ));
  }

  render() {
    return(
      <div className={classNames('matrix', 'border_dark_grey')}>
        <div className={classNames('custom_border', 'fill_dark_grey')} />
        <div className={classNames('custom_border', 'fill_dark_grey')} />
        <div className={classNames('custom_border', 'fill_dark_grey')} />
        <div className={classNames('custom_border', 'fill_dark_grey')} />
        <div className="inner_value">
          {this.renderInputs()}
        </div>
      </div>
    );
  }
}