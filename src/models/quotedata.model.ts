import { alias, list, object, serializable } from "serializr";





class ItemsData {
    @serializable(alias('id'))
    id?: string;

    @serializable(alias('key'))
    key?: string;
}

class StatusDocs {
    @serializable(alias('id'))
    id?: string;

    @serializable(alias('status'))
    status?: string;
}

class QuoteDocs {

    @serializable(alias('active'))
    active?: boolean;

    @serializable(alias('id'))
    id?: string;

    @serializable(alias('container'))
    container?: string;

    @serializable(alias('created_at'))
    createdAt?: string;

    @serializable(list(object(ItemsData)))
    items?: ItemsData[];

    @serializable(list(object(StatusDocs)))
    status?: StatusDocs[];

    @serializable(alias('curr_status'))
    currStatus?: string;

    @serializable(alias('next_status'))
    nextStatus?: string;

    @serializable(alias('uid'))
    uid?: string;
}

export class QuoteDetails {
    @serializable(list(object(QuoteDocs)))
    docs?: QuoteDocs[];
  
    @serializable(alias('total_docs'))
    totalDocs?: number;
  
    @serializable(alias('offset'))
    offset?: number;
  
    @serializable(alias('limit'))
    limit?: number;
  
    @serializable(alias('total_pages'))
    totalPages?: number;
  
    @serializable(alias('page'))
    page?: number;
  
    @serializable(alias('paging_counter'))
    pagingCounter?: number;
  
    @serializable(alias('has_prev_page'))
    hasPrevPage?: boolean;
  
    @serializable(alias('has_next_page'))
    hasNextPage?: boolean;
  
    @serializable(alias('prev_page'))
    prevPage?: number | null;
  
    @serializable(alias('next_page'))
    nextPage?: number | null;
  }