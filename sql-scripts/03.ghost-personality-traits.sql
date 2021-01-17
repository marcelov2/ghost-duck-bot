  ALTER TABLE phasmo.ghost_type
      ADD COLUMN advice text;

  UPDATE phasmo.ghost_type SET
    advice = 'O mais comum dos fantasmas, mas ainda assim poderoso e perigoso. Normalmente encontrado em um de seus locais de caçada depois de uma morte não explicada.'::text
  WHERE name='espirito';

  UPDATE phasmo.ghost_type SET
    advice = 'Um dos fantasmas mais perigosos e também o único até o momento que pode voar, sendo até mesmo capaz de atravessar paredes.'::text
  WHERE name='wraith';

  UPDATE phasmo.ghost_type SET
    advice = 'Podem possuir os vivos, comumente invocado com um tabuleiro de Ouija e pode causar medo naqueles em volta.'::text
  WHERE name='espectro';

  UPDATE phasmo.ghost_type SET
    advice = 'Pode manipular objetos em volta para causar medo.'::text
  WHERE name='poltergeist';

  UPDATE phasmo.ghost_type SET
    advice = 'Banshees são os que mais reagem aos Crucifixos e tentarão perseguir os caçadores e derrubá-los um por um.'::text
  WHERE name='banshee';

  UPDATE phasmo.ghost_type SET
    advice = 'Fantasma territorial que irá atacar caso ameaçado. Pode viajar a velocidades altas, mas cortar a energia do cômodo limita sua agilidade.'::text
  WHERE name='jinn';

  UPDATE phasmo.ghost_type SET
    advice = 'O Mare é mais forte no escuro, então manter as luzes acesas e evitar cantos escuros reduz sua força, mas ele tentará apagar as luzes para poder caçar. '::text
  WHERE name='mare';

  UPDATE phasmo.ghost_type SET
    advice = 'O Revenant ataca qualquer um independentemente da situação ou nível de sanidade. Se esconder fará com que ande mais devagar, mas quando decidir caçar um alvo se tornará o fantasma mais rápido do jogo.'::text
  WHERE name='revenant';

  UPDATE phasmo.ghost_type SET
    advice = 'Não ataca quando há mais de uma pessoa perto, mas isso faz com que seja difícil o encontrar em grupo.'::text
  WHERE name='assombração';

  UPDATE phasmo.ghost_type SET
    advice = 'O Demônio é um dos piores para enfrentar, por ser extremamente agressivo e caçar com maior frequência, portanto é recomendado carregar um crucifixo. Para compensar, usar um tabuleiro de Ouija não drena sanidade.'::text
  WHERE name='demonio';

  UPDATE phasmo.ghost_type SET
    advice = 'O fantasma que mais rápido drena a sanidade dos jogadores, mas manchar a sala em que ele está o impede de sair.'::text
  WHERE name='yurei';

  UPDATE phasmo.ghost_type SET
    advice = 'O Oni é muito ativo e provavelmente dará as caras nos primeiro minutos do jogo. Possui a tendência de andar em volta da sala assombrada, é recomendado se esconder em um armário e esperar que ele saia.'::text
  WHERE name='oni';
