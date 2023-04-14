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

    useEffect(() => {
        console.log("Month or year changed!");
        setDaysInMonth(getDaysInMonth(selectedYear, selectedMonth));
    }, [selectedYear, selectedMonth]);

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function handleMonthChange(direction) {
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

    function toggleClock() {
        console.log("Showing clock =>", showClock)
        setShowClock(!showClock);
    }

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
                    <FontAwesomeIcon className={"Calendar-arrow-ctrl " + [showClock && "disabled"]} icon={faClock} onClick={toggleClock} />
                </div>

            </div>
            <div className='Calendar-body'>
                {showClock ? Array(daysInMonth).fill(1).map((el, i) =>
                    <div className='Calendar-day'>{i}</div>
                ) : (
                    <div className='Clock-selector'>

                        <div className='Clock-hour-selector'>
                            <div className='Clock-inc-button'>+</div>
                            <div id='Clock-hour'>15</div>
                            <div className='Clock-dec-button'>-</div>
                        </div>

                        <div className='Clock-two-dots'>:</div>

                        <div className='Clock-minute-selector'>
                            <div className='Clock-inc-button'>+</div>
                            <div id='Clock-minute'>30</div>
                            <div className='Clock-dec-button'>-</div>
                        </div>

                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Calendar;
