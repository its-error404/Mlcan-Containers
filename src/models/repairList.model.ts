import { serializable, alias, primitive, list, object } from 'serializr';

class Version {
  @serializable(alias('num', primitive()))
  num?: number;

  @serializable(alias('created_at', primitive()))
  createdAt?: string;

  @serializable(alias('updated_at', primitive()))
  updatedAt?: string;

  @serializable(alias('id', primitive()))
  id?: string;
}

class Merc {
  @serializable(alias('max_mat_cost', primitive()))
  maxMatCost?: number;

  @serializable(alias('nmaerk_hours', primitive()))
  nonMaerskHours?: number;

  @serializable(alias('unit_mat_cost', primitive()))
  unitMatCost?: number;

  @serializable(alias('unit_hours', primitive()))
  unitHours?: number;

  @serializable(alias('max_pcs', primitive()))
  maxPcs?: number;

  @serializable(alias('unit', primitive()))
  unit?: string;

  @serializable(alias('rep_mode', primitive()))
  repMode?: number;

  @serializable(alias('mode_num', primitive()))
  modeNum?: number;

  @serializable(alias('rep_code', primitive()))
  repCode?: string;

  @serializable(alias('combined', primitive()))
  combined?: string;

  @serializable(alias('desc', primitive()))
  desc?: string;

  @serializable(alias('source', primitive()))
  source?: string;

  @serializable(alias('created_at', primitive()))
  createdAt?: string;

  @serializable(alias('updated_at', primitive()))
  updatedAt?: string;

  @serializable(alias('id', primitive()))
  id?: string;
}

export class Repair {
  @serializable(alias('rep_area', primitive()))
  repArea?: string;

  @serializable(alias('dmg_area', primitive()))
  dmgArea?: string;

  @serializable(alias('type', primitive()))
  type?: string;

  @serializable(alias('nmaersk', primitive()))
  nmaersk?: string;

  @serializable(alias('merc', object(Merc)))
  merc?: Merc;

  @serializable(alias('deleted', primitive()))
  deleted?: boolean;

  @serializable(alias('uid', primitive()))
  uid?: string;

  @serializable(alias('version', object(Version)))
  version?: Version;

  @serializable(alias('created_at', primitive()))
  createdAt?: string;

  @serializable(alias('updated_at', primitive()))
  updatedAt?: string;

  @serializable(alias('category', primitive()))
  category?: string;

  @serializable(alias('id', primitive()))
  id?: string;
}

export class RepairData {
  @serializable(alias('docs', list(object(Repair))))
  docs?: Repair[];

  @serializable(alias('total_docs', primitive()))
  totalDocs?: number;

  @serializable(alias('offset', primitive()))
  offset?: number;

  @serializable(alias('limit', primitive()))
  limit?: number;

  @serializable(alias('total_pages', primitive()))
  totalPages?: number;

  @serializable(alias('page', primitive()))
  page?: number;

  @serializable(alias('paging_counter', primitive()))
  pagingCounter?: number;

  @serializable(alias('has_prev_page', primitive()))
  hasPrevPage?: boolean;
}
