import pyautogui as ptg
from datetime import date
import time

def arrastarAteEmbaixo(x):
    if (mesesDoMes == 31):
        arrastar(x, y=920) 

    elif (mesesDoMes == 28):
        arrastar(x, y=863) 

    elif (mesesDoMes == 29):
        arrastar(x, y=884) 
        
    else: # mesesDoMes == 30
        arrastar(x, y=906) 

def arrastar(x, y, duration = 1.5):
    ptg.mouseDown(button='left')
    ptg.moveTo(x, y, duration)
    ptg.mouseUp(button='left')

# Valores pré-definidos:
mesesDoMes = 28
mes = "JANEIRO/23"

ptg.PAUSE = 0.5

time.sleep(5)

# Arrastar a nova tabela para ser o primeiro mês
ptg.moveTo(x=486, y=1010)
arrastar(x=177, y=1009, duration=1)