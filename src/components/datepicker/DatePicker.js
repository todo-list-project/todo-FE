import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import React from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';
import { AiFillCaretRight } from 'react-icons/ai';
import { ko } from 'date-fns/locale';
const CustomDatePicker = (props) => {
    const _ = require('lodash');
    const years = _.range(2022, getYear(new Date()) + 5, 1);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    // console.log(years);
    return (
        <div className="custom-react-datepicker-wrap">
            {/* 시작날짜 지정 datepicker */}
            <DatePicker
                renderCustomHeader={({
                    formatWeekDay,
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="custom-react-picker-headerwrap">
                        <AiFillCaretLeft
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                        />
                        <div className="custom-react-datepicker__year-wrap">
                            <div className="custom-react-datepicker__select-item">
                                <select
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) => changeYear(value)}
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <span>년</span>
                        </div>
                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <AiFillCaretRight
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                        />
                    </div>
                )}
                locale={ko}
                dateFormat="yyyy.MM.dd"
                selected={new Date(props.startDate)}
                onChange={(date) => props.setStartDate(date)}
                selectsStart
                startDate={new Date(props.startDate)}
                endDate={new Date(props.endDate)}
            />
            {/* 종료날짜 datepicker */}
            <span>~</span>
            <DatePicker
                renderCustomHeader={({
                    formatWeekDay,
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="custom-react-picker-headerwrap">
                        <AiFillCaretLeft
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                        />
                        <div className="custom-react-datepicker__select-item">
                            <select
                                value={getYear(date)}
                                onChange={({ target: { value } }) => changeYear(value)}
                            >
                                {years.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span>년</span>
                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <AiFillCaretRight
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                        />
                    </div>
                )}
                locale={ko}
                dateFormat="yyyy.MM.dd"
                selected={new Date(props.endDate)}
                onChange={(date) => props.setEndDate(date)}
                selectsStart
                startDate={new Date(props.startDate)}
                endDate={new Date(props.endDate)}
            />
        </div>
    );
};

export default CustomDatePicker;
