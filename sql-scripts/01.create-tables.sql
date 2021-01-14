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
            'Fraquezas: Queime Incensos para fazê-los pararem de atacar por um longo período.',
            'Evidências: Spirit Box, Impressões digitais e Escrita Fantasma.'),           
        ('Wraith',
            'Pontos fortes: Nunca tocam o chão, tornando impossível ser caçado por meio de pegadas.',
            'Fraquezas: Wraiths são intoxicados por sal.'
            'Evidências: Impressões digitais, temperaturas baixas e Spirit Box.'),
        ('Espectro',
            'Pontos fortes: Olhar para um Espectro diminui consideravelmente sua sanidade.',
            'Fraquezas: Tirar uma foto faz ele desparecer temporariamente.',
            'Evidências: EMF Nível 5, Orbe Fantasma, Temperatura Baixa.'),
        ('Poltergeist',
            'Pontos fortes: Pode arremessar múltiplos objetos de uma vez.',
            'Fraquezas: Salas vazias ou sem objetos que podem ser movidos.'
            'Evidências: Spirit Box, Impressões digitais e Orbe Fantasma.'),
        ('Banshee',
            'Pontos fortes: Estabelece um alvo e manterá seu foco nele até que seja abatido.',
            'Fraquezas: Crucifixo.'
            'Evidências: EMF Nível 5, Impressões digitais e temperaturas congelantes.'),
        ('Jinn',
            'Pontos fortes: O Jinn fica mais rápido ainda caso seu alvo se distancie.',
            'Fraquezas: Falta de energia elétrica.'
            'Evidências: Spirit Box, Orbe Fantasma, EMF Nível 5.'),
        ('Mare',
            'Pontos fortes: Ataca com frequência no escuro, vai apagar as luzes sozinho.',
            'Fraqueza: Luzes.'
            'Evidências: Spirit Box, Orbe Fantasma, temperatura congelante.'),
        ('Revenant',
            'Pontos fortes: Ataca qualquer um, a qualquer momento e pode trocar seu alvo deliberadamente.',
            'Fraquezas: Se move muito devagar quando os jogadores se escondem.'
            'Evidências: EMF nível 5, Impressões digitais e escritas fantasma.'),
        ('Assombração',
            'Pontos fortes: Muito difícil de encontrar.',
            'Fraquezas: Não caça se os jogadores estiverem em grupo.'
            'Evidências: EMF nível 5, Orbe Fantasma, Escrita Fantasma.'),
        ('Demonio',
            'Pontos fortes: Extremamente agressivo e caça com maior frequência, um dos fantasmas mais perigosos do jogo.',
            'Fraquezas: Usar o tabuleiro de Ouija para fazer perguntas não drena sanidade.'
            'Evidências: Spirit Box, escrita fantasma e temperaturas congelantes.'),
        ('Yurei',
            'Pontos fortes: Drena a sanidade mais rápido que qualquer outro fantasma.',
            'Fraquezas: Usar um Smudge Stick na sala em que ele está o impede de sair para qualquer lugar.'
            'Evidências: Orbe fantasma, escrita fantasma e temperaturas congelantes.'),
        ('Oni',
            'Pontos fortes: Extremamente ativo e move objetos rápido.',
            'Fraquezas: Muitos movimentos com muitos jogadores próximos o faz fácil de identificar.'
            'Evidências: EMF nível 5, Spirit Box e escrita fantasma.');

    -- FILL EVIDENCE TABLE
    INSERT INTO phasmo.evidence(name, short_name) VALUES
        ('Orbe Fantasma', 'orb'),
        ('Spirit Box', 'box'),
        ('Impressões digital', 'digital'),
        ('EMF Level 5', 'emf'),
        ('Temperatura Baixa', 'temperatura'),
        ('Escrita fantasma', 'escrito');

    -- FILL GHOST GIVES EVIDENCE
    INSERT INTO phasmo.ghost_gives_evidence(ghost_id, evidence_id) VALUES
        ((SELECT id FROM phasmo.ghost_type WHERE name='Banshee'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Banshee'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digitais')),
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
        ((SELECT id FROM phasmo.ghost_type WHERE name='Poltergeist'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digitais')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Poltergeist'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Poltergeist'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Revenant'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Revenant'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Revenant'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digitais')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Fantasma'), (SELECT id FROM phasmo.evidence WHERE name='EMF Level 5')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Fantasma'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Fantasma'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espírito'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digitais')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espírito'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Espírito'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Wraith'), (SELECT id FROM phasmo.evidence WHERE name='Impressões digitais')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Wraith'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Wraith'), (SELECT id FROM phasmo.evidence WHERE name='Spirit Box')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Yurei'), (SELECT id FROM phasmo.evidence WHERE name='Escrita fantasma')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Yurei'), (SELECT id FROM phasmo.evidence WHERE name='Temperatura Baixa')),
        ((SELECT id FROM phasmo.ghost_type WHERE name='Yurei'), (SELECT id FROM phasmo.evidence WHERE name='Orbe Fantasma'));