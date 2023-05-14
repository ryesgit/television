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
        self.channel = channel
        self.volume_level = volume_level
        self.on = on