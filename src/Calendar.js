import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faClock, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
const date = new Date();

function Calendar() {

    const [selectedYear, setSelectedYear] = useState(date.getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1)
    const [selectedDay, setSelectedDay] = useState(date.getDay() + 1)
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedYear, selectedMonth))
    const [showClock, setShowClock] = useState(false)
    const [selectedHour, setSelectedHour] = useState(date.getHours())
    const [selectedMinute, setSelectedMinute] = useState(date.getMinutes())

    useEffect(() => {
        console.log("Month or year changed!");
        setDaysInMonth(getDaysInMonth(selectedYear, selectedMonth));
    }, [selectedYear, selectedMonth]);

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function handleMonthChange(direction) {
        if (showClock) {
            return;
        }

        if (selectedMonth === 12 && direction) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(1);
            return;
        }

        if (selectedMonth === 1 && !direction) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(12);
            return;
        }

        setSelectedMonth(selectedMonth + direction);

    }

    function handleHourChange(direction) {

        if (selectedHour === 23 && direction > 0) {
            setSelectedHour(0);
            return;
        }

        if (selectedHour === 0 && direction < 0) {
            setSelectedHour(23);
            return;
        }

        setSelectedHour(selectedHour + direction);

    }


    function handleMinuteChange(direction) {

        if (selectedMinute === 59 && direction > 0) {
            setSelectedMinute(0);
            return;
        }

        if (selectedMinute === 0 && direction < 0) {
            setSelectedMinute(59);
            return;
        }

        setSelectedMinute(selectedMinute + direction);

    }

    function handleWheel(event) {
        if (event.nativeEvent.wheelDelta > 0) {
            if (event.target.id == "Clock-hour") {
                handleHourChange(1);
            } else if (event.target.id == "Clock-minute") {
                handleMinuteChange(1);
            }
        } else {
            if (event.target.id == "Clock-hour") {
                handleHourChange(-1);
            } else if (event.target.id == "Clock-minute") {
                handleMinuteChange(-1);
            }
        }
    }

    function toggleClock() {
        setShowClock(!showClock);
    }

    function confirmSelection() {
        let date_string = selectedMonth + "-" + selectedDay + "-" + selectedYear + " " + selectedHour + ":" + selectedMinute;
        let date_obj = Date.parse(date_string);
        console.log(date_obj);
    }

    function daySelection(day, el) {
        setSelectedDay(day);
        let target = el.target;

        var elems = document.querySelectorAll(".Calendar-day");
        
        [].forEach.call(elems, function (el) {
            el.classList.remove("selected-day");
        });

        target.classList.add("selected-day");

        setTimeout(toggleClock, 300);

    }

    const zeroPad = (num) => String(num).padStart(2, '0')

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="Calendar-container">
            <div className='Calendar-header'>

                <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faArrowLeft} onClick={() => handleMonthChange(-1)} />
                <div className='Calendar-month-year' >
                    {selectedDay + " " + monthNames[selectedMonth - 1] + " " + selectedYear + " " + zeroPad(selectedHour) + ":" + zeroPad(selectedMinute)}
                </div>
                <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faArrowRight} onClick={() => handleMonthChange(1)} />

                <div className="Calendar-clock-ctrl">
                    <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faClock} onClick={toggleClock} />
                </div>

                <div className="Calendar-confirm-ctrl">
                    <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faCheck} onClick={confirmSelection} />
                </div>

            </div>
            <div className='Calendar-body'>
                {showClock == false ? Array(daysInMonth).fill(1).map((el, i) =>
                    <div className='Calendar-day' key={i} onClick={(el) => daySelection(i + 1, el)}>{i + 1}</div>
                ) : (
                    <div className='Clock-selector'>

                        <div className='Clock-hour-selector'>
                            <div className='Clock-inc-button' onClick={() => handleHourChange(1)}>+</div>
                            <div id='Clock-hour' onWheel={handleWheel}>{zeroPad(selectedHour)}</div>
                            <div className='Clock-dec-button' onClick={() => handleHourChange(-1)}>-</div>
                        </div>

                        <div className='Clock-two-dots'>:</div>

                        <div className='Clock-minute-selector'>
                            <div className='Clock-inc-button' onClick={() => handleMinuteChange(1)}>+</div>
                            <div id='Clock-minute' onWheel={handleWheel}>{zeroPad(selectedMinute)}</div>
                            <div className='Clock-dec-button' onClick={() => handleMinuteChange(-1)}>-</div>
                        </div>

                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Calendar;
