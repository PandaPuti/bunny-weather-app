export function getWeatherDateTime(dt, timezone) {
    // Convert to local time
    const utcTime = new Date(dt * 1000); // Convert to milliseconds
    const localTime = new Date(utcTime.getTime() + timezone * 1000);
    
    // Get 12-hour format time
    const hours = localTime.getUTCHours();
    const minutes = localTime.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const timeStr = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
    // Get date in "Wed 6 2026" format
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[localTime.getUTCDay()];
    const date = localTime.getUTCDate();
    const year = localTime.getUTCFullYear();
    const dateStr = `${dayName} ${date} ${year}`;
    
    return {
        time: timeStr,
        date: dateStr,
        full: `${dateStr} ${timeStr}`
    };
}