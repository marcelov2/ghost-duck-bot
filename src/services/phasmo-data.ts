import { Pool } from 'pg';

import { Evidence } from '../interfaces/evidence';
import { GhostType } from '../interfaces/ghost-type';

export class PhasmoDataService {

  private pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  public async getAllEvidence(): Promise<Evidence[]> {
    const queryText = `SELECT * FROM phasmo.evidence ORDER BY name ASC`;
    let queryResult = await this.pool.query(queryText);
    return queryResult.rows;
  }

  public async getAllGhostTypes(): Promise<GhostType[]>{
    const queryText = `SELECT * FROM phasmo.ghost_type ORDER BY name ASC`;
    let queryResult = await this.pool.query(queryText);
    return queryResult.rows;
  }

  public async getEvidenceNamesOf(name: string): Promise<string[]>  {
    const queryText = `SELECT e.name FROM phasmo.evidence as e
                      JOIN phasmo.ghost_gives_evidence as gge ON gge.evidence_id = e.id
                      JOIN phasmo.ghost_type as gt ON gt.id = gge.ghost_id
                      WHERE gt.name=$1`;
    const values = [name];

    let queryResult = await this.pool.query(queryText, values);
    return queryResult.rows.map( (row) => row.name );
  }

  public async getEvidenceNamesOfIdExceptFor(ghostId: number, evidenceToIgnore: string[]): Promise<string[]> {
    let queryText = `SELECT e.name FROM phasmo.evidence as e
                      JOIN phasmo.ghost_gives_evidence as gge ON gge.evidence_id = e.id
                      WHERE gge.ghost_id=$1`

    const values = [ghostId, ...evidenceToIgnore];

    evidenceToIgnore.forEach((_evidence, index) => {
      queryText += ` AND e.short_name != $${index + 2}`;
    });

    let queryResult = await this.pool.query(queryText, values);
    return queryResult.rows.map( (row) => row.name );
  }

  public async getGhostNameFromEvidenceShortName(evidence: string): Promise<GhostType[]> {
    let queryText = `SELECT gt.id, gt.name FROM phasmo.ghost_type as gt
      JOIN phasmo.ghost_gives_evidence AS gge ON gge.ghost_id = gt.id
      JOIN phasmo.evidence AS e ON e.id = gge.evidence_id
      WHERE e.short_name=$1`

      let queryResult = await this.pool.query(queryText, [evidence]);
      return queryResult.rows
  }

  public async getGhostAdviceFromEvidence(evidenceSet: string[]): Promise<GhostType[]> {
    let queryText = this.getGhostAdviceQueryTextFor(evidenceSet.length);
    let queryResult = await this.pool.query(queryText, evidenceSet);
    return queryResult.rows
  }

  private getGhostAdviceQueryTextFor(evidenceNumber: number): string {

    if(evidenceNumber === 0) return `SELECT name, advice FROM phasmo.ghost_type`;

    let select = `SELECT gt.id, gt.name, gt.advice FROM`;

    const joinWhere = `JOIN phasmo.ghost_gives_evidence AS  gge ON gge.ghost_id = gt.id
                  JOIN phasmo.evidence AS e ON e.id = gge.evidence_id
                  WHERE e.short_name =`;

    const firstTable = `phasmo.ghost_type AS gt`;
    let queryText = `${select} ${firstTable} ${joinWhere}$1`;
    for(let parameterCounter = 2; parameterCounter <= evidenceNumber; parameterCounter++){
      queryText = `${select} (${queryText}) AS gt ${joinWhere}$${parameterCounter}`;
    }
    return queryText;
  }

  public async getPhantomType(name: string): Promise<GhostType | undefined>  {
    const queryText = "SELECT * FROM phasmo.ghost_type WHERE name=$1";
    const values = [name];

    let queryResult = await this.pool.query(queryText, values);

    if(queryResult.rowCount === 0){
      return undefined;
    };

    return queryResult.rows[0];
  }

}