import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './components/pages/Home';
import { Booking } from './components/pages/Booking';
import { SeatSelection } from './components/pages/SeatSelection';
import { Payment } from './components/pages/Payment';
import { MovieDetail } from './components/pages/MovieDetail';
import { Schedule } from './components/pages/Schedule';
import { MyTickets } from './components/pages/MyTickets';
import { Login } from './components/pages/Login';
import { Inquiry } from './components/pages/Inquiry';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'booking', Component: Booking },
      { path: 'seat-selection', Component: SeatSelection },
      { path: 'payment', Component: Payment },
      { path: 'movie/:id', Component: MovieDetail },
      { path: 'schedule', Component: Schedule },
      { path: 'my-tickets', Component: MyTickets },
      { path: 'login', Component: Login },
      { path: 'inquiry', Component: Inquiry },
    ],
  },
]);