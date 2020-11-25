import { Pool } from 'pg';

import { GhostType } from '../interfaces/ghost-type';

export class PhasmoDataService {

  private pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  public async getPhantomType(name: string): Promise<GhostType | undefined>  {
    const queryText = "SELECT * FROM phasmo.ghost_type WHERE name=$1";
    const values = [name];

    let queryResult = await this.pool.query(queryText, values);

    if(queryResult.rowCount === 0){
      return undefined;
    };

    return queryResult.rows[0] as GhostType;
  }

  public async getEvidenceNamesOf(name: string): Promise<string[]>  {

    const queryText = `SELECT evidence.name FROM phasmo.evidence as evidence
                      JOIN phasmo.ghost_gives_evidence as gives ON gives.evidence_id = evidence.id
                      JOIN phasmo.ghost_type as ghost_type ON ghost_type.id = gives.ghost_id
                    WHERE ghost_type.name=$1`;
    const values = [name];

    let queryResult = await this.pool.query(queryText, values);
    return queryResult.rows.map( (row) => row.name );
  }
}