import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CalendarViewAppointment } from 'src/sections/calendar/view';

// ----------------------------------------------------------------------

const metadata = { title: `Appointment Calender | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CalendarViewAppointment />
    </>
  );
}
