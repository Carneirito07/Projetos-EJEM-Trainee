import random as r

def partida(escolha, maquina): 
    if escolha == maquina:
        print(f'Escolha da máquina: {maquina}')
        print('Empate')
    elif escolha == 'PEDRA' and maquina == 'TESOURA':
        print(f'Escolha da máquina: {maquina}')
        print('Vitória!')
    elif escolha == 'PAPEL' and maquina == 'PEDRA':
        print(f'Escolha da máquina: {maquina}')
        print('Vitória')
    elif escolha == 'TESOURA' and maquina == 'PAPEL':
        print(f'Escolha da máquina: {maquina}')
        print('Vitória')
    else:
        print(f'Escolha da máquina: {maquina}')
        print('Derrota')


opcoes = "PEDRA", "PAPEL", "TESOURA"
escolha = ''
vontade = ''


while vontade != 'N':
    escolha = ''
    vontade = ''
    print(opcoes)
    while escolha != opcoes[0] and escolha != opcoes[1] and escolha != opcoes[2]:
        escolha = input(f'Opções escolha uma das opções: ').upper()
        if escolha != opcoes[0] and escolha != opcoes[1] and escolha != opcoes[2]:
            print('Opção escolhida inválida')

    maquina = r.choice(opcoes)

    partida(escolha, maquina)
    while vontade != 'S' and vontade != 'N':
        vontade = input('Deseja jogar outra partida? (S/N): ')
        if vontade != 'S' and vontade != 'N':
                print('Entrada inválida!')