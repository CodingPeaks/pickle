import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
const date = new Date();

function Calendar() {

    const [selectedYear, setSelectedYear] = useState(date.getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1)
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
        if (!showClock) {
            if (direction) {
                console.log("Month forward")
                if (selectedMonth === 12) {
                    setSelectedYear(selectedYear + 1);
                    setSelectedMonth(1);
                } else {
                    setSelectedMonth(selectedMonth + 1);
                }
            } else {
                console.log("Month backward")
                if (selectedMonth === 1) {
                    setSelectedYear(selectedYear - 1);
                    setSelectedMonth(12);
                } else {
                    setSelectedMonth(selectedMonth - 1);
                }
            }
        }
    }


    function handleHourChange(direction) {
        if (direction) {
            console.log("Hour forward")
            if (selectedHour === 23) {
                setSelectedHour(0);
            } else {
                setSelectedHour(selectedHour + 1);
            }
        } else {
            console.log("Hour backward")
            if (selectedHour === 0) {
                setSelectedHour(23);
            } else {
                setSelectedHour(selectedHour - 1);
            }
        }
    }

    function handleMinuteChange(direction) {
        if (direction) {
            console.log("Minute forward")
            if (selectedMinute === 59) {
                setSelectedMinute(0);
            } else {
                setSelectedMinute(selectedMinute + 1);
            }
        } else {
            console.log("Minute backward")
            if (selectedMinute === 0) {
                setSelectedMinute(59);
            } else {
                setSelectedMinute(selectedMinute - 1);
            }
        }
    }

    function handleWheel(event) {
        if (event.nativeEvent.wheelDelta > 0) {
            console.log(event.target.id);
            if (event.target.id == "Clock-hour") {
                handleHourChange(1);
            } else if (event.target.id == "Clock-minute") {
                handleMinuteChange(1);
            }
        } else {
            if (event.target.id == "Clock-hour") {
                handleHourChange(0);
            } else if (event.target.id == "Clock-minute") {
                handleMinuteChange(0);
            }
        }
    }

    function toggleClock() {
        setShowClock(!showClock);
    }

    const zeroPad = (num) => String(num).padStart(2, '0')

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];



    return (
        <div className="Calendar-container">
            <div className='Calendar-header'>

                <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faArrowLeft} onClick={() => handleMonthChange(0)} />
                <div className='Calendar-month-year' >
                    {monthNames[selectedMonth - 1] + " " + selectedYear}
                </div>
                <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faArrowRight} onClick={() => handleMonthChange(1)} />

                <div className="Calendar-clock-ctrl">
                    <FontAwesomeIcon className={"Calendar-arrow-ctrl"} icon={faClock} onClick={toggleClock} />
                </div>

            </div>
            <div className='Calendar-body'>
                {showClock == false ? Array(daysInMonth).fill(1).map((el, i) =>
                    <div className='Calendar-day'>{i + 1}</div>
                ) : (
                    <div className='Clock-selector'>

                        <div className='Clock-hour-selector'>
                            <div className='Clock-inc-button' onClick={() => handleHourChange(1)}>+</div>
                            <div id='Clock-hour' onWheel={handleWheel}>{zeroPad(selectedHour)}</div>
                            <div className='Clock-dec-button' onClick={() => handleHourChange(0)}>-</div>
                        </div>

                        <div className='Clock-two-dots'>:</div>

                        <div className='Clock-minute-selector'>
                            <div className='Clock-inc-button' onClick={() => handleMinuteChange(1)}>+</div>
                            <div id='Clock-minute' onWheel={handleWheel}>{zeroPad(selectedMinute)}</div>
                            <div className='Clock-dec-button' onClick={() => handleMinuteChange(0)}>-</div>
                        </div>

                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Calendar;
