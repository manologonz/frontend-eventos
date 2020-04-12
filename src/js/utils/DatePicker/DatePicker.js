import React from 'react';
import classNames from 'classnames'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize';
import moment from 'moment';
import es from 'moment/locale/es';
import 'react-dates/lib/css/_datepicker.css';
import { renderMonthElement } from "../../../utility/variables"

export default class renderDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dpFocused: false
        };
        this.onFocusChange = this.onFocusChange.bind(this)
    }
    onFocusChange({ focused }) {
        this.setState({ dpFocused: focused })
    }
    render() {
        const { input, onValueChange, disabled, className, placeholder, id, meta: { touched, error } } = this.props;
        const invalid = touched && error;
        moment.locale('es');
        return (
            <div className={classNames(`${className ? className : ""}`, { 'is-invalid': invalid })}>
                <SingleDatePicker
                    disabled={disabled}
                    placeholder={placeholder}
                    date={input.value ? moment(input.value) : null}
                    focused={this.state.dpFocused}
                    isOutsideRange={() => false}
                    onDateChange={(value) => {
                        input.onChange( value );
                        if(!!onValueChange)
                            onValueChange(value)
                    }}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    id={id ? id : "unique"}
                    renderMonthElement={renderMonthElement}
                />
                {invalid && <div className="invalid-feedback">
                    {error}
                </div>}
            </div>
        )
    }
}
