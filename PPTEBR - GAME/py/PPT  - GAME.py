# Importando librerias... o eso creo xd
import random
import time

# Cosas importantes
healthPlayer, healthEnemy = 3, 3
attackPlayer, attackEnemy = None, None
wins, loses = 0, 0

# Tablas
randomAttack = [
     'Piedra',
     'Papel',
     'Tijera'
]

textResultWinner = [
     'Ganaste la partida campeón! :D',
     'Uff, esa partida fue intensa, verdad?. Al final ganaste! >:D',
     'No crei que ganarias, felicidades! :)'
]

textResultLoser = [
     'Perdiste la partida! D:',
     'Que pena, suerte para la proxima! :D',
     'Nada mal pero perdiste :['
]

# Función que verifica si termino el juego - devuelve un boleano
def isGameFinished():
     return healthPlayer > 0 and healthEnemy == 0 or healthPlayer == 0 and healthEnemy > 0 or healthPlayer == 0 or healthEnemy == 0

# Combate
while True:
     # Presentación
     print('PPT - GAME')
     print('Piedra, Papel y Tijera')

     # Guardando valores
     attackPlayer = str(input('Elige un ataque: '))
     attackEnemy = random.choice(randomAttack)

     if not attackPlayer:
          print('Elige un ataque por favor')
          break

     # Combate
     if attackPlayer == attackEnemy:
          print('Empate')
     elif attackPlayer == 'Piedra' and attackEnemy == 'Tijera' or attackPlayer == 'Papel' and attackEnemy == 'Piedra' or attackPlayer == 'Tijera' and attackEnemy == 'Papel':
          print('Ganaste')
          healthEnemy -= 1
     else:
          print('Perdiste')
          healthPlayer -= 1

     # Confirmar vidas
     if healthPlayer > 0 and healthEnemy == 0:
          print(random.choice(textResultWinner))
     elif healthPlayer == 0 and healthEnemy > 0:
          print(random.choice(textResultLoser))

     # Dar resultados finales
     if isGameFinished():
          print(f'Ganaste; {wins} veces y perdiste {loses} veces')
          time.sleep(1)
          break
