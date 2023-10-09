import { serializable, alias, primitive, list, object } from 'serializr';

export class ContainersData {
    
    @serializable(alias('uid', primitive()))
    uid?: string;

    @serializable(alias('id', primitive()))
    id?: string;

    @serializable(alias('yard', primitive()))
    yard?: string;

    @serializable(alias('owner', primitive()))
    owner?: string;

    @serializable(alias('customer_name', primitive()))
    customerName?: string;

    @serializable(alias('activity_type', primitive()))
    activityType?: string;

    @serializable(alias('activity_id', primitive()))
    activityId?: string;

    @serializable(alias('activity_uid', primitive()))
    activityUid?: string | '';

    @serializable(alias('activity_status', primitive()))
    activityStatus?: string;

    @serializable(alias('activity_date', primitive()))
    activityDate?: string;

    static docs: never[];
}

export class AllContainersData {
    @serializable(alias('docs', list(object(ContainersData))))
    docs?: ContainersData

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
  