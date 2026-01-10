/**
 * Converts 24-hour time format (HH:MM or HH:MM:SS) to 12-hour format with AM/PM
 * @param {string} time24 - Time in 24-hour format (e.g., "14:30" or "14:30:00")
 * @returns {string} - Time in 12-hour format (e.g., "2:30 PM")
 */
export const formatTime12Hour = (time24) => {
    if (!time24) return '';
    
    try {
        // Handle time formats like "14:30:00" or "14:30"
        const timeParts = time24.split(':');
        const hours24 = parseInt(timeParts[0], 10);
        const minutes = timeParts[1] || '00';
        
        // Validate input
        if (isNaN(hours24) || hours24 < 0 || hours24 > 23) {
            return time24; // Return original if invalid
        }
        
        // Convert to 12-hour format
        let hours12;
        let period;
        
        if (hours24 === 0) {
            hours12 = 12;
            period = 'AM';
        } else if (hours24 === 12) {
            hours12 = 12;
            period = 'PM';
        } else if (hours24 > 12) {
            hours12 = hours24 - 12;
            period = 'PM';
        } else {
            hours12 = hours24;
            period = 'AM';
        }
        
        return `${hours12}:${minutes} ${period}`;
    } catch (error) {
        console.error('Error formatting time:', error);
        return time24; // Return original on error
    }
};
