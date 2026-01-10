from django import template
from datetime import time

register = template.Library()

@register.filter
def time_12hour(time_value):
    """
    Convert 24-hour time format to 12-hour format with AM/PM
    """
    if not time_value:
        return ''
    
    if isinstance(time_value, time):
        hours = time_value.hour
        minutes = time_value.minute
    else:
        # Handle string format like "14:30:00" or "14:30"
        try:
            time_parts = str(time_value).split(':')
            hours = int(time_parts[0])
            minutes = int(time_parts[1]) if len(time_parts) > 1 else 0
        except (ValueError, IndexError):
            return str(time_value)
    
    # Convert to 12-hour format
    if hours == 0:
        return f"12:{minutes:02d} AM"
    elif hours == 12:
        return f"12:{minutes:02d} PM"
    elif hours > 12:
        return f"{hours - 12}:{minutes:02d} PM"
    else:
        return f"{hours}:{minutes:02d} AM"
