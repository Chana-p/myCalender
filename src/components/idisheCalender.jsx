import moment from 'moment';
import 'moment/locale/he'; // Import Hebrew locale
import { HDate, Locale } from '@hebcal/core';

export const HebrewCalender = () => {
    const today = new HDate(new Date());
    const formattedDate = today.renderGematriya(); // Get the Hebrew date in Hebrew format
    console.log(`Today's Hebrew date is: ${formattedDate}`);

    return (
        <div>
            <h1>Today's Hebrew date: {formattedDate}</h1>
        </div>
    );
}