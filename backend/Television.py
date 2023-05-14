'''
filename: Television.py

Contains the Television class.
Accepts three arguments:
- Channel > The television instance's initial channel (Available slots from 1-10),
- Volume Level > The instance's initial volume level (Available slots, multiples of 10 up to 100)
- On > The instance's initial on state. Is a boolean

'''

class Television:
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