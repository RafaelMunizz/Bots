import pyautogui as ptg
from datetime import date
import time

mes_atual = date.today().month
ano_atual =  str(date.today().year)[2:]
primeraDataMes = "01/" + str(mes_atual) + "/" + ano_atual

if (mes_atual == 1):
    mesesDoMes = 31
    mes = "JANEIRO/" + ano_atual

elif (mes_atual == 2):
    mesesDoMes = 28
    mes = "FEVEREIRO/" + ano_atual
    
elif (mes_atual == 3):
    mesesDoMes = 31
    mes = "MARÇO/" + ano_atual

elif (mes_atual == 4):
    mesesDoMes = 30
    mes = "ABRIL/" + ano_atual
    
elif (mes_atual == 5):
    mesesDoMes = 31
    mes = "MAIO/" + ano_atual
    
elif (mes_atual == 6):
    mesesDoMes = 30
    mes = "JUNHO/" + ano_atual
    
elif (mes_atual == 7):
    mesesDoMes = 31
    mes = "JULHO/" + ano_atual
    
elif (mes_atual == 8):
    mesesDoMes = 31
    mes = "AGOSTO/" + ano_atual
    
elif (mes_atual == 9):
    mesesDoMes = 30
    mes = "SETEMBRO/" + ano_atual
    
elif (mes_atual == 10):
    mesesDoMes = 31
    mes = "OUTUBRO/" + ano_atual
    
elif (mes_atual == 11):
    mesesDoMes = 30
    mes = "NOVEMBRO/" + ano_atual
    
elif (mes_atual == 12):
    mesesDoMes = 31
    mes = "DEZEMBRO/" + ano_atual
    




def arrastarAteEmbaixo(x):
    if (mesesDoMes == 31):
        arrastar(x, y=920) 

    elif (mesesDoMes == 28):
        arrastar(x, y=863) 

    elif (mesesDoMes == 29):
        arrastar(x, y=884) 
        
    else: # mesesDoMes == 30
        arrastar(x, y=906)

def arrastar(x, y, duration = 2):
    ptg.mouseDown(button='left')
    ptg.moveTo(x, y, duration)
    ptg.mouseUp(button='left')


ptg.PAUSE = 1

# Abrindo navegador
ptg.press('win')
ptg.write('Edge')
ptg.press('enter')

# Acessando o planilhas
ptg.write('https://docs.google.com/spreadsheets/d/1zEOFYao5_FK9kHIzSTRC6biTBFJrQ-7s/edit#gid=795016981')
ptg.press('enter')
time.sleep(3)


# Criando nova planilha
ptg.moveTo(x=333, y=1002)
ptg.click(button='right')
ptg.moveTo(x=333, y=689)
ptg.click() # Clicando em duplicar
time.sleep(3)

# Clicando na nova planilha criada para renomear
ptg.moveTo(x=484, y=1003)
ptg.click(button='right')
ptg.moveTo(x=494, y=752) # Clicando em renomear
ptg.click()
ptg.write(mes)
ptg.press('enter')

#ptg.PAUSE = 0.5

# Clicando na primeira célula (KM INÍCIO DO DIA)
ptg.moveTo(x=150, y=284)
ptg.click()

# Modificando nova planilha para ser zerada
for i in range(3):
    ptg.press('0')
    ptg.press('enter')
    ptg.press('right')
    ptg.press('up')

ptg.press('0')
ptg.press('enter')

# Selecionando três colunas para zerar (C, D, E)
ptg.moveTo(x=231, y=285)
arrastar(425, 285, duration=0.5) 

# Zerando as 3 colunas (C, D, E)
ptg.moveTo(x=479, y=296)
arrastarAteEmbaixo(x = 478)

# Colocar fórmula na segunda coluna (que copia o valor da terceira)
ptg.click(x=152, y=309)
ptg.write("=C2")
ptg.press('enter')

# Passando a fórmula pras células abaixo
ptg.press('up')
ptg.moveTo(x=193, y=317)
arrastarAteEmbaixo(193)

# Pegando valor da última quilometragem
ptg.click(x=186, y=1014) # Click no primeiro mês
ptg.click(x=235, y=913) # Click na última célula com km
ptg.hotkey('ctrl', 'c')
ptg.click(x=484, y=1003) # Click célula nova
ptg.click(x=150, y=284) # Click na primeira célula
ptg.hotkey('ctrl', 'v')

# Pegando valor do último abastecimento
ptg.click(x=186, y=1014) # Click no primeiro mês
ptg.click(x=533, y=913) # Click na última célula com valor do abastecimento
ptg.hotkey('ctrl', 'c')
ptg.click(x=484, y=1003) # Click célula nova
ptg.click(x=536, y=287) # Click na primeira célula de abastecimento
ptg.hotkey('ctrl', 'v')
# Passando para células abaixo
ptg.moveTo(x=580, y=297)
arrastarAteEmbaixo(x=580)

# Pegando valor da última autonomia
ptg.click(x=186, y=1014) # Click no primeiro mês
ptg.click(x=630, y=912) # Click na última célula com valor da autonomia
ptg.hotkey('ctrl', 'c')
ptg.click(x=484, y=1003) # Click célula nova
ptg.click(x=635, y=283) # Click na primeira célula da autonomia
ptg.hotkey('ctrl', 'v')
# Passando para células abaixo
ptg.moveTo(x=694, y=297)
arrastarAteEmbaixo(x=694)


# Colocando data correta
ptg.click(x=78, y=288)
ptg.write(primeraDataMes)
ptg.press('enter')

# Passando a fórmula pras células abaixo (data)
ptg.press('up')
ptg.moveTo(x=110, y=298)
arrastarAteEmbaixo(110)

0
# Se o mês for de 31 dias, completar as colunas
if (mesesDoMes == 31):
    ptg.moveTo(x=742, y=895)
    arrastar(x=1061, y=898, duration=0.5) 
    ptg.moveTo(x=1063, y=906)
    arrastarAteEmbaixo(x=1063)

# Se o mês for de 30 dias, excluir a última coluna (dia 31)
elif (mesesDoMes == 30):
    ptg.click(x=21, y=917, button='right') # Click direito na linha
    ptg.click(x=127, y=661) # Excluir linha

elif (mesesDoMes == 28):
    ptg.moveTo(x=22, y=876)
    arrastar(x=27, y=918, duration=1)
    ptg.click(x=21, y=917, button='right') # Click direito na linha
    ptg.click(x=127, y=661) # Excluir linha

# Arrastar a nova tabela para ser o primeiro mês
ptg.moveTo(x=486, y=1010)
arrastar(x=177, y=1009, duration=1)





    