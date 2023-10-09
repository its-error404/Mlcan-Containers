import { alias, list, object, serializable } from "serializr";

class Status {
  @serializable(alias("status"))
  status?: string;

  @serializable(alias("id"))
  id?: string;
}

class DocItem {
  @serializable(alias("container"))
  container?: string;

  @serializable(alias("items"))
  items?: string[];

  @serializable(alias("deleted"))
  deleted?: boolean;

  @serializable(alias("status", list(object(Status))))
  status?: Status[];

  @serializable(alias("uid"))
  uid?: string;

  @serializable(alias("created_at"))
  createdAt?: string;

  @serializable(alias("updated_at"))
  updatedAt?: string;

  @serializable(alias("curr_status"))
  currStatus?: string;

  @serializable(alias("nextStatus"))
  nextStatus?: string;

  @serializable(alias("active"))
  active?: boolean;

  @serializable(alias("id"))
  id?: string;
}

export class RepairResponseData {
  @serializable(alias("docs", list(object(DocItem))))
  docs?: DocItem[];

  @serializable(alias("total_docs"))
  totalDocs?: number;

  @serializable(alias("offset"))
  offset?: number;

  @serializable(alias("limit"))
  limit?: number;

  @serializable(alias("total_pages"))
  totalPages?: number;

  @serializable(alias("page"))
  page?: number;

  @serializable(alias("paging_counter"))
  pagingCounter?: number;

  @serializable(alias("has_prev_page"))
  hasPrevPage?: boolean;

  @serializable(alias("has_next_page"))
  hasNextPage?: boolean;

  @serializable(alias("prev_page"))
  prevPage?: number;

  @serializable(alias("next_page"))
  nextPage?: number;
}