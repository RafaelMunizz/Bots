import pyautogui as ptg
from datetime import date
import time

time.sleep(5)

ptg.PAUSE = 0.5
while True:
    try:
        local = ptg.locateCenterOnScreen('Alvo.png')
        print("Achei")
        ptg.click(local)
    except:
        print("Não achei")
        False