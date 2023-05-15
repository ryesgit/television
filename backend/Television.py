'''
filename: Television.py

Contains the Television class.
Accepts three arguments:
- Channel > The television instance's initial channel (Available slots from 1-10),
- Volume Level > The instance's initial volume level (Available slots, multiples of 10 up to 100)
- On > The instance's initial on state. Is a boolean

'''

class Television:
    
    CHANNEL_DELTA = 1
    VOLUME_DELTA = 10

    # Volume and channel minimum and maximum
    CHANNEL_MAX = 10
    CHANNEL_MIN = 1

    VOLUME_MAX = 100
    VOLUME_MIN = 0

    def __init__(self, channel:int, volume_level:int, on:bool) -> None:
        try:
            channel = int(channel)
            volume_level = int(volume_level)
            on = bool(on)

        except ValueError:
            raise ValueError("Invalid input. Channel must be an integer, volume level must be an integer, and on must be a boolean value.")
        
        self.channel = channel
        self.volume_level = volume_level
        self.on = on
    
    def switch(self) -> None:
        self.on = not self.on

    def tv(self) -> str:
        return f"This TV's channel is on {self.channel}; volume level is at {self.volume_level}; and TV state is {'on' if self.on else 'off'}"

    def get_channel(self) -> int:
        return self.channel
    
    def set_channel(self, channel:int) -> None:
        try:
            if channel < self.CHANNEL_MIN or channel > self.CHANNEL_MAX:
                raise ValueError("Channel must be within minimum and maximum only.")
            self.channel = int(channel)
        except:
            raise ValueError(f"Channel must be an integer and must be within {self.CHANNEL_MIN} to {self.CHANNEL_MAX} only.")
        
    def get_volume_level(self) -> int:
        return self.volume_level

    def set_volume_level(self, volume_level: int) -> None:
        try:
            if volume_level < self.VOLUME_MIN or volume_level > self.VOLUME_MAX:
                raise ValueError("Channel must be within minimum and maximum only.")

            if volume_level % 10 != 0:
                raise ValueError("Volume level input must be a multiple of 10")

            self.volume_level = int(volume_level)
        except:
            raise ValueError(f"Volume level must be an integer that is a multiple of 10 and must be within {self.VOLUME_MIN} and {self.VOLUME_MAX} only.")

    def channel_up(self) -> None:
        self.channel += self.CHANNEL_DELTA

    def channel_down(self) -> None:
        self.channel -= self.CHANNEL_DELTA

    def volume_up(self) -> None:
        self.volume_level += self.VOLUME_DELTA

    def volume_down(self) -> None:
        self.volume_level -= self.VOLUME_DELTA