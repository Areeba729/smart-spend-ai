// utils/getUserGreeting.js
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

export const useUserGreeting = () => {
  const user = useSelector(selectUser); // Redux se current user
  const name = user?.fullName || 'User';

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return { name, greeting: getGreeting() };
};
