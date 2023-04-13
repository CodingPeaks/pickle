import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons'

function Calendar() {

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    console.log(daysInCurrentMonth);

    const rows = [];
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        rows.push(i);
    }

    return (
        <div className="Calendar-container">
            <div className='Calendar-header'>

                <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faArrowLeft} />
                <div className='Calendar-month-year'>
                    {monthNames[currentMonth - 1] + " " + currentYear}
                </div>
                <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faArrowRight} />

                <div className="Calendar-clock-ctrl">
                    <FontAwesomeIcon className="Calendar-arrow-ctrl" icon={faClock} />
                </div>

            </div>
            <div className='Calendar-body'>
                {
                    rows.map(function (row, i) {
                        return <div className='Calendar-day'>{row}</div>
                    })}
            </div>
        </div>
    );
}

export default Calendar;
