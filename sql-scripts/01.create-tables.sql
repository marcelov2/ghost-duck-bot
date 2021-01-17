    -- CREATE TABLES
    CREATE SCHEMA phasmo;

    -- Create Ghost Type table
    CREATE TABLE phasmo.ghost_type (
        id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 20 CACHE 1 ),
        name character varying(50) COLLATE pg_catalog."default" NOT NULL,
        weakness text COLLATE pg_catalog."default",
        strength text COLLATE pg_catalog."default",
        details text COLLATE pg_catalog."default",
        CONSTRAINT "PK_GHOTST_TYPE" PRIMARY KEY (id),
        CONSTRAINT "UNIQUE_GHOST_NAME" UNIQUE (name)
    );
    -- Create Evidence table
    CREATE TABLE phasmo.evidence (
        id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10 CACHE 1 ),
        name character varying(50) COLLATE pg_catalog."default" NOT NULL,
        short_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT "PK_EVIDENCE" PRIMARY KEY (id),
        CONSTRAINT "UNIQUE_EVIDENCE_NAME" UNIQUE (name),
        CONSTRAINT "UNIQUE_EVIDENCE_SHORT_NAME" UNIQUE (short_name)
    );

    -- Create Ghost gives Evidence table
    CREATE TABLE phasmo.ghost_gives_evidence (
        ghost_id smallint NOT NULL,
        evidence_id smallint NOT NULL,
        CONSTRAINT "PK_ghost_evidence" PRIMARY KEY (ghost_id, evidence_id),
        CONSTRAINT "FK_GIVES_EVIDENCE_ID" FOREIGN KEY (evidence_id)
            REFERENCES phasmo.evidence (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT "FK_GIVES_GHOST_ID" FOREIGN KEY (ghost_id)
            REFERENCES phasmo.ghost_type (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    );

    -- FILL GHOST TYPE TABLES
    INSERT INTO phasmo.ghost_type(name, strength, weakness, details) VALUES
        ('Espirito',
            'Usar incenso em um Epirito irá impedi-lo de atacar por 120 segundos em vez de 90.',
            'O espírito não tem forças perceptíveis, no entanto, é conhecido por aumentar sua caça conforme sua sanidade diminui.',
            'Na ausência de evidências, é muito difícil distinguir um Espírito de qualquer outro tipo de fantasma; Embora eles não tenham comportamentos específicos, é exatamente a falta de qualquer característica definidora que pode confundir os investigadores, já que os Espíritos podem ser confundidos com outros tipos de fantasmas até que as evidências sejam coletadas, com o uso de incensos sendo o único sinal do contrário. Variando de tímido a ativo, passivo a hostil, de movimento lento a rápido durante a caça, um Espírito pode ter qualquer número de características percebidas.'),
        ('Wraith',
            'Wraith quase nunca tocam o solo, o que significa que os sons das pegadas são raros ou inexistentes. Ele pode atravessar paredes e portas sem abri-las. As aparições, entretanto, deixarão pegadas no sal se forem pisadas.',
            'Wraith têm uma reação tóxica ao sal. Se um Wraith entrar em contato com uma pilha de sal, ele irá parar de atacar imediatamente.',
            'O poder do Wraith é que ele vai se teletransportar para um jogador aleatório emitindo um EMF de interação.'),
        ('Espectro',
            'Olhar para um Espectro diminuirá consideravelmente sua Sanidade. Isso se refere a quaisquer manifestações visíveis do Espectro, incluindo durante uma Caçada.',
            'Tirar uma foto do Espectro fará com que ele desapareça temporariamente. A câmera fotográfica fará com que ela desapareça, mas não interromperá uma caça.',
            'Quando o Espectro se manifesta, pode assumir a aparência de um de seus companheiros de equipe, sem excluir a aparência do visualizador'),
        ('Poltergeist',
            'Um Poltergeist é capaz de mexer mais objetos ao mesmo tempo do que qualquer outro Fantasma, ele é capaz de fechar várias portas ao mesmo tempo.',
            'Um Poltergeist é quase ineficaz em uma sala vazia.',
            'A capacidade de um Poltergeist de manipular objetos, especificamente portas, pode facilitar a identificação. No entanto, se o fantasma afeta especificamente várias luminárias e outros componentes eletrônicos ao mesmo tempo, é mais provável que seja um Jinn.'),
        ('Banshee',
            'Um Banshee se concentrará em um jogador por vez até matá-los.',
            'Banshees temem o Crucifixo, que aumenta o alcance de parar o ataque de um de 3 a 5 metros contra ele',
            'Assim que o Banshee usar seu poder, ele começará a navegar até o alvo escolhido. Bloqueadores de linha de visão e ocultação não afetam a capacidade do Banshee de navegar até o jogador e ele será capaz de alcançá-los. Depois de alcançar o jogador, ele aguardará cerca de 20 segundos e, em seguida, começará a atacar se o jogador estiver dentro da linha de visão direta do Banshee enquanto ele está navegando para o jogador. '),
        ('Jinn',
            'Um Jinn atacara em uma velocidade mais rápida se sua vítima estiver longe.',
            'Desligar a fonte de alimentação do local impedirá o Jinn de usar sua habilidade.',
            'Jinns tendem a interagir com  eletrônicos mais do que qualquer outro fantasma. Eles podem fazer com que telefones toquem, rádios sejam ativados, TVs ou alarmes de carros disparem com mais frequência. Isso também se estende a interruptores de luz, o que pode fazer com que investigadores inseguros confundam um Jinn com um Mare ou Poltergeist'),
        ('Mare',
            'Maior chance de atacar no escuro. Como tal, fará o que puder para conseguir isso, como desligar as luzes e disparar a caixa de fusíveis.',
            'Ligar as luzes diminuirá sua chance de ataque.',
            'Ele tende a desligar as luzes e a caixa de fusíveis mais do que qualquer outro tipo de fantasma quando ativo, embora se um fantasma acender as luzes novamente, é muito mais provável que seja um Poltergeist ou Jinn'),
        ('Revenant',
            'Um Revenant irá atacar a uma velocidade significativamente mais rápida ao caçar uma vítima. Além disso, o Revenant pode trocar livremente quem quer que seja seu alvo durante uma caça.',
            'Se esconder do Revenant fará com que ele se mova muito lentamente.',
            'Ao contrário de outros fantasmas, que muitas vezes terão um alvo específico selecionado ao iniciar um ataque em que irão se concentrar, os Revenants podem alternar livremente os alvos se houver outro jogador que esteja mais perto - e especialmente um que esteja à vista e disponível, tornando seu objetivo de matar jogadores mais conveniente.'),
        ('Assombração',
            'Como um fantasma tímido, uma Assombracão raramente realizará ações na presença de duas ou mais pessoas, dificultando sua detecção.',
            'Por outro lado, um Assombracão raramente iniciará um ataque quando os jogadores estiverem agrupados.',
            'Se uma Assombracão já estiver caçando, ele preferirá ter como alvo jogadores que estejam sozinhos. A Assombracão segue a definição geral de "sozinho", no sentido de um jogador estar sozinho em uma sala, mesmo que outros jogadores estejam fisicamente próximos.'),
        ('Demonio',
            'Demonio é o mais agressivo e entra mais no modo de caça.',
            'Fazer perguntas bem-sucedidas a um Demonio no tabuleiro Ouija não diminui a sanidade do usuário',
            'Eles são notórios por iniciar caçadas com frequência, uma característica que é exacerbada por níveis mais baixos de sanidade e agravada por maiores dificuldades como Profissional, onde as caçadas duram muito mais. Levando todos esses fatores em consideração, os Demônios em sua forma mais agressiva vão caçar em intervalos curtos de meio minuto, forçando os jogadores a passarem mais tempo se escondendo do que investigando.'),
        ('Yurei',
            'Sabe-se que os yurei têm um efeito mais forte na Sanidade das pessoas.',
            'Usar incenso no local escolhido pelo fantasma fará com que ele não vagueie pelo local por aproximadamente 90 segundos.',
            'Acredita-se que o dreno de sanidade aumenta com dificuldade. Certifique-se de manter o controle de Sanidade e use Pílulas de Sanidade quando necessário, já que os jogadores irão atingir níveis mais baixos de sanidade mais rápido, permitindo que o Yurei se torne mais agressivo e seja capaz de atacar mais cedo em uma missão.'),
        ('Oni',
            'Oni são mais ativos quando as pessoas estão por perto e foram vistos movendo objetos em grande velocidade.',
            'Ser mais ativo tornará o Oni mais fácil de encontrar e identificar.',
            'Ao contrário da maioria dos outros tipos de fantasmas, a divisão é o melhor método de defesa ao procurar um Oni, já que é muito menos ativo quando os jogadores estão sozinhos. ele lançará objetos pela sala com grande força ao interagir com eles. No entanto, esses objetos não são perigosos para os caçadores ou sua sanidade, ao contrário dos lançados por Poltergeists.');

    -- FILL EVIDENCE TABLE
   INSERT INTO phasmo.evidence(name, short_name) VALUES
        ('Orbe Fantasma', 'orb'),
        ('Spirit Box', 'box'),
        ('Impressões digital', 'digital'),
        ('EMF Level 5', 'emf'),
        ('Temperatura Baixa', 'temperatura'),
        ('Escrita fantasma', 'escrita');

    -- FILL GHOST GIVES EVIDENCE
    INSERT INTO phasmo.ghost_gives_evidence(ghost_id, evidence_id) VALUES
        ((SELECT id FROM phasmo.ghost_type WHERE name='Banshee'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Banshee'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digital')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Banshee'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Demonio'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Demonio'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Demonio'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Jinn'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Jinn'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Jinn'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Mare'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Mare'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Mare'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Oni'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Oni'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Oni'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espectro'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espectro'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espectro'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Poltergeist'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digital')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Poltergeist'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Poltergeist'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Revenant'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Revenant'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Revenant'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digital')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Assombração'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Assombração'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Assombração'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espirito'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digital')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espirito'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espirito'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Wraith'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digital')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Wraith'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Wraith'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Yurei'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Yurei'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Yurei'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma'));
